import React, { Component } from 'react';
import axios from 'axios';

class UserAuth extends Component {
	constructor (props) {
		super(props);
	}

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`http://127.0.0.1:8000/basic-auth`, { username: 'test', password: 'test' })
		.then(res => {
		  console.log(res);
		  console.log(res.data);
		})

	}

	render () {
		return(
		<form className="ui form" onSubmit={this.handleSubmit}>
			<div className="inline field">
				<label>Username: </label>
				<input type="text" />   
				<label>Password: </label>
				<input type="password" />       				      				
			</div>
			<button type="submit">Authenticate</button>
		</form>  
		);
	}
}

export default UserAuth;