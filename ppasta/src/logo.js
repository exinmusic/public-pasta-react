import React, { Component } from 'react';

class Logo extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}
	render () {
		return(
			<div className="ui menu">
				<div className="ui red header item"><img src="https://image.flaticon.com/icons/svg/590/590810.svg" alt='Pasta!'/>&nbsp;&nbsp;&nbsp;Public Pasta</div>
				<div className="ui tiny header item">What?</div>
				<div className="right menu">
					<AuthIcon user={this.props.user} />
				</div>
			</div>
		);
	}
}

class AuthIcon extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		if (this.props.user.username) {
			return <div className="header item"><i class="green large ticket icon"></i>{this.props.user.username}</div>;
		} else {
			return <div className="header item"><i class="red large ticket icon"></i>Guest</div>;
		}
	}
}

export default Logo;