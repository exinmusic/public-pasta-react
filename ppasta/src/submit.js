import React, { Component } from 'react';
import axios from 'axios';

class PastaSubmit extends Component {
	constructor (props) {
		super(props);
		this.state = {name: '', text: '',}
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
	}

	handleNameChange = event => {
		this.setState({ name: event.target.value })
	}

	handleTextChange = event => {
		this.setState({ text: event.target.value })
	}

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`http://127.0.0.1:8000/api/submit/`, { name: this.state.name, text: this.state.text })
		.then(response => {
		  console.log(response);
		  console.log(response.status);
		  this.props.onUserLogin(response)
		})

	}

	render () {
		return(
		<form className="ui form segment" onSubmit={this.handleSubmit}>
			<div className="two fields">
				<div className="field">
					<label>Name: </label>
					<input type="text" onChange={this.handleNameChange} />   
				</div>
				<div className="field">
					<label> Text: </label>
					<textarea onChange={this.handleTextChange} rows="4" cols="50"></textarea>       				      				
				</div>	
			</div>
			<button className="ui yellow button" type="submit">Submit</button>
		</form>  
		);
	}
}

export default PastaSubmit;