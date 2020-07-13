import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import TasksList from '../components/TasksList/TasksList'

import 'bootstrap/dist/css/bootstrap.css'
 
import AddTaskForm from '../components/AddTaskForm/AddTaskForm'
const TasksContainer = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={4} md={4}>
                       <AddTaskForm /> 
                   
                    </Col>
                    <Col xs={8} md={8}>
                        <TasksList /> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default TasksContainer
