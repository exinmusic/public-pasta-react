import React, { Component } from 'react';

function TagLabel(props) {
	return <a class="ui tag label">{props.category}</a>
}

class ContentBox extends Component {
	constructor(props) {
		super(props);
	};

	render () {
		try{
			this.listItems = this.props.pasta.categories.map((category) =>
				<TagLabel category={category}/>
			);	
		}
		catch {
			this.listItems = <TagLabel category={this.props.pasta.categories}/>
		}


		return(
			<div className="item">
				<div className="content">
					<h2 className="header">{this.props.pasta.name}</h2>
					{this.listItems}
					{this.props.user.authenticated && <h4 className="header"><i class="tag icon"></i>{this.props.pasta.id}</h4>}
					<div className="description">{this.props.pasta.text}</div>
				</div>
				<div className="ui divider"></div>
		  	</div>
		);
	}
}

export default ContentBox;