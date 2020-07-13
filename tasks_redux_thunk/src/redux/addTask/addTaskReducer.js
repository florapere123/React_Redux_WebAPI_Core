import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
} from './addTaskTypes'

const initialState = {
    loading: false,
    taskData: {
        Id:0,
        Description: '',
        File: null,
        ImageUrl: '',
    },
    error: '',
    successMsg:''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_TASK_SUCCESS:
            return {
                loading: false,
                taskData:{
                    Id:0,
                    Description: '',
                    File: null,
                    ImageUrl: '',
                },
                error: '' ,
                successMsg:'Updated successfuly ID' +action.payload.Id
            }
        case ADD_TASK_FAILURE:
            {
                
                return {
                loading: false,
                taskData: null,
                error: action.payload ,
                successMsg:''
            }
        }
        default:
            return state
    }
}

export default reducer
