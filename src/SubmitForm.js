import React from 'react';
import shortid from 'shortid';
import { Input, Button, Row } from 'antd';

export default class SubmitForm extends React.Component {

	state = {
		text: "",
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		
		event.preventDefault()
		
		this.props.onSubmit({
			id : shortid.generate(),
			taskName : this.state.text,
			type: "inProgress",
		})
		this.setState({
			text: "",
		})
	}

  render() {
    return(
    	<div>
    	<Row type="flex" justify="center">
      <form onSubmit = {this.handleSubmit}>
					<Input name = "text" 
					value = {this.state.text}
					onChange = {this.handleChange}
					placeholder = "todos..."
					 />
				<Button onClick = {this.handleSubmit}>Submit</Button>
		  </form>  
		  </Row>
      </div>
    );
  }
}