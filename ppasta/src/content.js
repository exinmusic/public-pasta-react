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
					<h2 className="header">{this.props.pasta.name}</h2>
					<div className="description">{this.props.pasta.category}</div>
					{this.props.user.authenticated && <h4 className="header"><i class="tag icon"></i>{this.props.pasta.id}</h4>}
					<div className="description">{this.props.pasta.text}</div>
				</div>
				<div className="ui divider"></div>
		  	</div>
		);
	}
}

export default ContentBox;