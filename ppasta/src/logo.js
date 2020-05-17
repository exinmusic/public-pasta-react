import React, { Component } from 'react';

class Logo extends Component {
	constructor (props) {
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		this.props.onUIChange()
	}
	render () {
		return(
			<div className="ui menu">
				<div className="ui red header item"><img src="https://image.flaticon.com/icons/svg/590/590810.svg" alt='Pasta!'/>&nbsp;&nbsp;&nbsp;Public Pasta</div>
				
				<div class="ui simple dropdown item">
					Styles
					<i class="dropdown icon"></i>
					<div class="menu">
						<div class="item">sermon</div>
						<div class="item">intelligent</div>
						<div class="item">dumb</div>
						<div class="item">funny</div>
						<div class="item">sad</div>
						<div class="item">political</div>
						<div class="item">complaint</div>
						<div class="item">emoji</div>
						<div class="item">daddy</div>
						<div class="item">sexy</div>
						<div class="item">pro</div>
						<div class="item">creepy</div>
						<div class="item">food</div>
						<div class="item">nsfw</div>
					</div>
				</div>

				<div className="right menu">
					<AuthIcon user={this.props.user} onUIChange={this.handleChange}/>
				</div>
			</div>
		);
	}
}

class AuthIcon extends Component {

	render () {
		if (this.props.user.username) {
			return <div className="header item"><i class="green large ticket icon"></i>{this.props.user.username}</div>;
		} else {
			return <div onClick={this.props.onUIChange} className="header item"><i class="red large ticket icon"></i>Guest</div>;
		}
	}
}

export default Logo;