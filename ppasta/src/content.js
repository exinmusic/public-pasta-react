import React, { Component } from 'react';
import axios from 'axios';

function TagLabel(props) {
	return <div class="ui circular inverted label">{props.category}</div>
}

class ContentBox extends Component {
	constructor (props) {
		super(props);
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
	}

	handlePositive = () => {
		axios.patch(this.props.address+`/api/pastas/`+this.props.pasta.id+'/', { sentiment:"positive" },{
			headers: {
			  'Authorization': 'Token '+this.props.user.token 
			}
		})
		.then(response => {
		  console.log(response);
		  console.log(response.status);
		})
		this.props.onChange();
	}
	handleNegative = () => {
		axios.patch(this.props.address+`/api/pastas/`+this.props.pasta.id+'/', { sentiment:"negative" },{
			headers: {
			  'Authorization': 'Token '+this.props.user.token 
			}
		})
		.then(response => {
		  console.log(response);
		  console.log(response.status);
		})
		this.props.onChange();
	}
	handleSafe = () => {
		axios.patch(this.props.address+`/api/pastas/`+this.props.pasta.id+'/', { safe:true },{
			headers: {
			  'Authorization': 'Token '+this.props.user.token 
			}
		})
		.then(response => {
		  console.log(response);
		  console.log(response.status);
		})
		this.props.onChange();
	}
	handleNotSafe = () => {
		axios.patch(this.props.address+`/api/pastas/`+this.props.pasta.id+'/', { safe:false },{
			headers: {
			  'Authorization': 'Token '+this.props.user.token 
			}
		})
		.then(response => {
		  console.log(response);
		  console.log(response.status);
		})
		this.props.onChange();
	}

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
			this.semanticIcon = <div className="ui label"><i className="smile outline icon"></i>positive</div>
			this.upArrow = <div><i className="big yellow arrow up icon"></i></div>
			this.downArrow = <a onClick={this.handleNegative}><i className="disabled big arrow down icon"></i></a>
		} else if (this.props.pasta.sentiment === 'negative') {
			this.semanticIcon = <div className="ui label"><i className="frown outline icon"></i>negative</div>
			this.upArrow = <a onClick={this.handlePositive}><i className="disabled big arrow up icon"></i></a>
			this.downArrow = <div><i className="big red arrow down icon"></i></div>
		} else {
			this.semanticIcon = <i></i>
			this.upArrow = <a onClick={this.handlePositive}><i className="disabled big arrow up icon"></i></a>
			this.downArrow = <div><a onClick={this.handleNegative}><i className="disabled big arrow down icon"></i></a></div>
		}

		return(
			<div className="item">
				<div className="content">
					{this.props.user.authenticated && 
						<div className="ui right floated item">
							{this.upArrow}	
							{this.downArrow}
						</div>
					}
					{this.props.user.authenticated && 
						<div className="ui right floated item">
							{this.props.pasta.safe && <a onClick={this.handleNotSafe}><i className=" big green exclamation triangle icon"></i></a>}
							{this.props.pasta.safe !== true && <a onClick={this.handleSafe}><i className=" big red exclamation triangle icon"></i></a>}
						</div>
					}
					<h2 className="header">{this.props.pasta.name}</h2>
					{this.semanticIcon}
					
					{this.props.pasta.safe && <div className="ui label"><i className="white soap icon"></i>clean</div>}
					{this.props.pasta.safe !== true && <div className="ui label"><i className="red exclamation triangle icon"></i>raw </div>}						
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