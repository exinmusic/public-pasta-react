import React, { Component } from 'react';

class MainMenu extends Component {
	constructor (props) {
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleShowSubmit = this.handleShowSubmit.bind(this);
	}
	handleChange() {
		this.props.onUIChange()
	}
	handleCategory(event) {
		this.props.onCategoryChange(event.currentTarget.value);
	}
	handleShowSubmit() {
		this.props.onShowSubmit()
	}
	render () {
		return(
			<div className="ui menu">
				<div className="ui header stacking item"><img src="https://image.flaticon.com/icons/svg/590/590810.svg" alt='Pasta!'/>&nbsp;&nbsp;&nbsp;Public Pasta</div>
				<a className="ui header item" href='/api/docs/'>
					API 
				</a>	
				<a className="ui header item" onClick={this.handleShowSubmit}>
					Submit
				</a>
				<div className="ui header active item">
					Exploration 
				</div>										
				<div class="ui simple dropdown item">
					Pasta Filter
					<i class="dropdown icon"></i>
					<div class="menu">
						<button value="" 	         className="item"	onClick={this.handleCategory}>All</button>
						<button value="sermon" 	     className="item"	onClick={this.handleCategory}>sermon</button>
						<button value="intelligent"  className="item"	onClick={this.handleCategory}>intelligent</button>
						<button value="dumb" 		 className="item"	onClick={this.handleCategory}>dumb</button>
						<button value="funny" 		 className="item"	onClick={this.handleCategory}>funny</button>
						<button value="sad" 		 className="item"	onClick={this.handleCategory}>sad</button>
						<button value="political" 	 className="item"	onClick={this.handleCategory}>political</button>
						<button value="complaint" 	 className="item"	onClick={this.handleCategory}>complaint</button>
						<button value="emoji" 		 className="item"	onClick={this.handleCategory}>emoji</button>
						<button value="daddy" 		 className="item"	onClick={this.handleCategory}>daddy</button>
						<button value="sexy" 		 className="item"	onClick={this.handleCategory}>sexy</button>
						<button value="pro" 		 className="item"	onClick={this.handleCategory}>pro</button>
						<button value="creepy" 	 	 className="item"	onClick={this.handleCategory}>creepy</button>
						<button value="food" 		 className="item"	onClick={this.handleCategory}>food</button>
						<button value="nsfw" 		 className="item"	onClick={this.handleCategory}>nsfw</button>
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
			return <div className="header item"><i class="green large ticket icon"></i>{this.props.user.token}</div>;
		} else {
			return <div onClick={this.props.onUIChange} className="header item"><i class="red large ticket icon"></i>Guest</div>;
		}
	}
}

export default MainMenu;