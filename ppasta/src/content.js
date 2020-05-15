import React, { Component } from 'react';

function TagLabel(props) {
	return <div class="ui tag label">{props.category}</div>
}

class ContentBox extends Component {


	render () {
		try{
			this.listItems = this.props.pasta.categories.map((category) =>
				<TagLabel category={category}/>
			);	
		}
		catch {
			this.listItems = <TagLabel category={this.props.pasta.categories}/>
		}
		if (this.props.pasta.sentiment === 'positive') {
			this.semanticIcon = <i class="smile icon"></i>
		} else if (this.props.pasta.sentiment === 'negative') {
			this.semanticIcon = <i class="frown icon"></i>
		} else {
			this.semanticIcon = <i></i>
		}

		return(
			<div className="item">
				<div className="content">
					<h2 className="header">{this.props.pasta.name}</h2>
					{this.semanticIcon}
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