import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import { Row, Col, Typography, Button } from 'antd';
import SubmitForm from './SubmitForm';
import uuid from "uuid/v4";

const { Paragraph } = Typography;

export default class ToDoDragDropDemo extends Component {
  
  state = {
    tasks: [
      
    ]
  }

  componentDidMount(){
    console.log('Mounting Component')
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks===null){
      return false
    }
    else{
      this.setState({
        tasks: tasks
      })
      console.log(this.state.tasks)
    }
  }

  onDragStart = (event, taskName) => {
      console.log('dragstart on div: ', taskName);
      event.dataTransfer.setData("taskName", taskName);
  }
  
  onDragOver = (event) => {
      event.preventDefault();
  }

  onDrop = (event, cat) => {
      let taskName = event.dataTransfer.getData("taskName");

      let tasksValue = JSON.parse(localStorage.getItem('tasks'))
      tasksValue.filter((task) => {
          if (task.taskName === taskName) {
              task.type = cat;
          }
          return task;
      });
      this.setState({
        ...this.state,
        tasks: tasksValue
      })
      localStorage.setItem('tasks', JSON.stringify(tasksValue))
  }

  addTask = task => {
    
    console.log('added todo',task)
    if(localStorage.getItem('tasks')===null){
      const tasks = []
      tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    else {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.setState({
      tasks: JSON.parse(localStorage.getItem('tasks'))
    })
}
   

  onDelete = id => {
    console.log('deleted todo')
    let json = JSON.parse(localStorage['tasks'])
    for (let i = 0; i< json.length; i++){
      if(json[i].id === id){
        json.splice(i,1)
      }
    }
    localStorage['tasks'] = JSON.stringify(json)
    this.setState({
      tasks: json
    })
  }

  render() {
    var tasks = {
        inProgress: [],
        Done: []
      }

    this.state.tasks.forEach ((task) => {
      tasks[task.type].push(
          <div style = {{
    display : "flex", justifyContent : 'center'
  }}>      
        <Paragraph 
          size = "large"
          key={task.id} 
          onDragStart = {(event) => this.onDragStart(event, task.taskName)}
          draggable
          className="draggable">
          {task.taskName}
        </Paragraph>
        <Button onClick = {()=> this.onDelete(task.id)}> x </Button>
        </div>
  
      );
    });
 
      return (
        <div className = "drag-container" >
             
          <h2 className="head">To Do List</h2>
          <br/>
          <SubmitForm onSubmit={this.addTask}/> 
        <Row>
        <Col span = {3}></Col>
  
        <Col span = {6}>
        <Paragraph className="inProgress" 
          onDragOver={(event)=>this.onDragOver(event)}
            onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
            <h3>In Progress</h3>
            {tasks.inProgress}
        </Paragraph>
        </Col>
  
        <Col span = {6}>
        </Col>
  
        <Col span = {6}>
          <Paragraph className="droppable"
            onDragOver={(event)=>this.onDragOver(event)}
              onDrop={(event)=>this.onDrop(event, "Done")}>
            <h3>Done</h3>
            {tasks.Done}
          </Paragraph>
        </Col>
  
        <Col span = {3}></Col> 
        </Row>         
        </div>
      );
    }
}