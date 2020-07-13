import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_CURRENT_USER_TASK,
} from './taskListTypes'

const initialState = {
    loading: false,
    tasks: [],
    error: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_TASKS_SUCCESS:
            return {
                loading: false,
                tasks: action.payload,
                error: '',
            }
        case FETCH_TASKS_FAILURE:
            return {
                loading: false,
                tasks: [],
                error: action.payload,
            }
        case ADD_CURRENT_USER_TASK:
            return {
                tasks: [...state.tasks, action.payload],
                loading: false,
                error: '',
            }
        default:
            return state
    }
}

export default reducer
