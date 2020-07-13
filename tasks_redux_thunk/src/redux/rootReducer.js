import { combineReducers } from 'redux'
import taskListReducer from './taskList/taskListReducer'
import addTaskReducer from './addTask/addTaskReducer'

const rootReducer = combineReducers({ 
    addTask: addTaskReducer,
    taskList: taskListReducer,
})

export default rootReducer
