import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import TasksContainer from './containers/TasksContainer'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <TasksContainer />
        
            </div>
        </Provider>
    )
}

export default App
