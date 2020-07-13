import axios from 'axios'
import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
} from './addTaskTypes'
import { appConfig } from '../../Config';
import { addCurrentUserTask } from '../taskList/taskListActions';

 
export const addTask = (task) => {
    return (dispatch) => {
        dispatch(addTaskRequest())
        axios
            .post(appConfig.API_URL , task, {
               // headers: { 'Content-Type': 'multipart/form-data' },
               headers: { 'Accept': '*/*'}
            })
            .then((response) => {
               const currentTask = response.data;
                dispatch(addTaskSuccess(currentTask));
                dispatch(addCurrentUserTask(currentTask));
            })
            .catch((error) => {
                // error.message is the error message
                dispatch(addTaskFailure(error.message))
            })
    }
}

export const addTaskRequest = () => {
    return {
        type: ADD_TASK_REQUEST,
    }
}

export const addTaskSuccess = (task) => {
    return {
        type: ADD_TASK_SUCCESS,
        payload: task,
    }
}

export const addTaskFailure = (error) => {
    return {
        type: ADD_TASK_FAILURE,
        payload: error,
    }
}
