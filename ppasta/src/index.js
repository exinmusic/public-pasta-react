import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ContentBox from './content';
import Logo from './logo';
import LimitForm from './limit';
import OffsetForm from './offset';
import UserAuth from './auth';
import PastaSubmit from './submit';

class App extends Component {
  constructor(props) {
	super(props);
	this.handleLimitChange = this.handleLimitChange.bind(this);
	this.handleOffsetChange = this.handleOffsetChange.bind(this);
	this.handleUserLogin = this.handleUserLogin.bind(this);
	this.handleShowAuth = this.handleShowAuth.bind(this);
	this.handlePastaSubmit = this.handlePastaSubmit.bind(this);
    this.state = { 
	  pasta: [{text:null}],
	  limit: 5,
	  offset: 0,
	  user: {},
	  ui: {
		auth: false
	  }
	};
	if (process.env.REACT_APP_SERVER_ADDRESS) {
		this.state.address = process.env.REACT_APP_SERVER_ADDRESS;
	} else {
		this.state.address = 'http://127.0.0.1:8000'
	}
  }
  getData = () => {
	axios.get(this.state.address+'/api/pastas/?limit='+this.state.limit+'&offset='+this.state.offset)
		.then(res => {
			const pasta = res.data.results;
			this.setState({ pasta });
		})
  }
  getUser = () => {
	axios.get(this.state.address+'/api/user/')
		.then(res => {
			const user = res.data;
			this.setState({ user });
		})
  }
  componentDidMount() {
	this.getData(); // Make API request
	this.getUser(); // Make API request
	this.intervalID = setInterval(this.getData.bind(this), 10000); // Request every 15 seconds
  }
  componentWillUnmount() {
	clearInterval(this.intervalID);
  }
  handleLimitChange(limit) {
	this.setState({ limit });
	setTimeout(this.getData.bind(this), 100)
  }  
  handleOffsetChange(offset) {
	this.setState({ offset });
	setTimeout(this.getData.bind(this), 100)
  } 
  handleUserLogin(response) {
	if (response.status === 200) {
		this.getUser();
		this.setState({
			ui:{ auth: false } 
		})
	}
  }
  handlePastaSubmit(response) {
	if (response.status === 200) {
		this.getData();

	}  
  }
  handleShowAuth() {
	if (this.state.ui.auth) {
		this.setState({
			ui:{ auth: false } 
		})			
	} else {
		this.setState({
			ui:{ auth: true } 
		})		
	}
  }

  render() {
	const listItems = this.state.pasta.map((pasta) =>
  		<ContentBox pasta={pasta} user={this.state.user}/>
	);

	return (
	  <div className="ui container">
		<div className="ui hidden spacer"></div>
		<div className="ui yellow inverted segment">
			<Logo user={this.state.user} onUIChange={this.handleShowAuth}/>
			{this.state.ui.auth && <UserAuth onUserLogin={this.handleUserLogin} address={this.state.address}/>}
			<PastaSubmit address={this.state.address} onSubmit={this.handlePastaSubmit}/>
			<div class="ui equal width center aligned padded grid">
				<div class="row">
					<div class="column">
					<OffsetForm offset={this.state.offset} onOffsetChange={this.handleOffsetChange}/>
					</div>
					<div class="column">
					<LimitForm limit={this.state.limit} onLimitChange={this.handleLimitChange}/>
					</div>
				</div>
			</div>
			<div className="ui segment">
				<ul className='ui container list'>
					{listItems}
				</ul>		
			</div>	 
		</div>
		<div className="ui hidden spacer"></div>		  
	  </div>

	);
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))