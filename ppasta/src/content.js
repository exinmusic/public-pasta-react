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
					<h3 className="header">{this.props.name}</h3>
					<div className="description">{this.props.text}</div>
				</div>
				<div className="ui divider"></div>
		  	</div>
		);
	}
}

export default ContentBox;