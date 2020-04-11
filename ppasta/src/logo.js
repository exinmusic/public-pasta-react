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
				<div className="ui tiny header item">Who?</div>
				<div className="right menu">
					<div className="header item"><i class="red large ticket icon"></i>no ticket</div>
				</div>
			</div>
		);
	}
}

export default Logo;