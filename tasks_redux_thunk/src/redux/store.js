import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import { getState, saveState } from  './localStorage'
// import {fetchTasks} from '../redux/taskList/taskListActions'

import rootReducer from './rootReducer'
//const initialState = getState()
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
)
// store.dispatch(fetchTasks())
// store.subscribe(() => {
//   saveState({
//       tasks: store.getState().tasks,
//   })
// })
export default store
