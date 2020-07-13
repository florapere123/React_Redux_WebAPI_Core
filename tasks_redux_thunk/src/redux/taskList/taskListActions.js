import axios from 'axios'
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_CURRENT_USER_TASK,
} from './taskListTypes'
import { appConfig } from '../../Config';
 
export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(fetchTasksRequest())
        axios
            .get(appConfig.API_URL)
            .then((response) => {
                // response.data is the tasks
                const tasks = response.data
                dispatch(fetchTasksSuccess(tasks))
            })
            .catch((error) => {
                // error.message is the error message
                dispatch(fetchTasksFailure(error.message))
            })
    }
}

export const fetchTasksRequest = () => {
    return {
        type: FETCH_TASKS_REQUEST,
    }
}

export const fetchTasksSuccess = (tasks) => {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: tasks,
    }
}

export const fetchTasksFailure = (error) => {
    return {
        type: FETCH_TASKS_FAILURE,
        payload: error,
    }
}
export const addCurrentUserTask = (newTask) => {
    return {
        type: ADD_CURRENT_USER_TASK,
        payload: newTask,
    }
}
