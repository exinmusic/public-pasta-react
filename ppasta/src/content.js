import React, { Component } from 'react';

class ContentBox extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return(
			<div className="item">
				<div className="content">
					<div className="header">{this.props.name}</div>
					<div className="description">{this.props.text}</div>
				</div>
				<div className="ui divider"></div>
		  	</div>
		);
	}
}

export default ContentBox;