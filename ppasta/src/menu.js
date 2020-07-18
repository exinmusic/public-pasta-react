import React, { Component } from 'react';

class MainMenu extends Component {
	constructor (props) {
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
	}
	handleChange() {
		this.props.onUIChange()
	}
	handleCategory(event) {
		this.props.onCategoryChange(event.currentTarget.value);
	}
	render () {
		return(
			<div className="ui menu">
				<div className="ui red header item"><img src="https://image.flaticon.com/icons/svg/590/590810.svg" alt='Pasta!'/>&nbsp;&nbsp;&nbsp;Public Pasta</div>
				
				<div class="ui simple dropdown item">
					Styles
					<i class="dropdown icon"></i>
					<div class="menu">
						<button value="sermon" 	 class="item"	onClick={this.handleCategory}>sermon</button>
						<button value="intelligent" class="item"	onClick={this.handleCategory}>intelligent</button>
						<button value="dumb" 		 class="item"	onClick={this.handleCategory}>dumb</button>
						<button value="funny" 		 class="item"	onClick={this.handleCategory}>funny</button>
						<button value="sad" 		 class="item"	onClick={this.handleCategory}>sad</button>
						<button value="political" 	 class="item"	onClick={this.handleCategory}>political</button>
						<button value="complaint" 	 class="item"	onClick={this.handleCategory}>complaint</button>
						<button value="emoji" 		 class="item"	onClick={this.handleCategory}>emoji</button>
						<button value="daddy" 		 class="item"	onClick={this.handleCategory}>daddy</button>
						<button value="sexy" 		 class="item"	onClick={this.handleCategory}>sexy</button>
						<button value="pro" 		 class="item"	onClick={this.handleCategory}>pro</button>
						<button value="creepy" 	 	 class="item"	onClick={this.handleCategory}>creepy</button>
						<button value="food" 		 class="item"	onClick={this.handleCategory}>food</button>
						<button value="nsfw" 		 class="item"	onClick={this.handleCategory}>nsfw</button>
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