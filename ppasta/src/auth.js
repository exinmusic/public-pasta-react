import React, { Component } from 'react';
import axios from 'axios';

class UserAuth extends Component {
	constructor (props) {
		super(props);
		this.state = {username: '', password: '',}
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
	}

	handleUserChange = event => {
		this.setState({ username: event.target.value })
	}

	handlePassChange = event => {
		this.setState({ password: event.target.value })
	}

	handleSubmit = event => {
		event.preventDefault();
		axios.post(this.props.address+`/login/`, { username: this.state.username, password: this.state.password })
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
					<label>Username: </label>
					<input type="text" onChange={this.handleUserChange} />   
				</div>
				<div className="field">
					<label> Password: </label>
					<input type="password" onChange={this.handlePassChange} />       				      				
				</div>	
			</div>
			<button className="ui yellow button" type="submit">Authenticate</button>
		</form>  
		);
	}
}

export default UserAuth;