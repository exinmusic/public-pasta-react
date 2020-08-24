import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ContentBox from './content';
import MainMenu from './menu';
import PrevPasta from './prev_pasta'
import NextPasta from './next_pasta';
import UserAuth from './auth';
import PastaSubmit from './submit';

class App extends Component {
  constructor(props) {
	super(props);

	// BINDS
	this.handleLimitChange = this.handleLimitChange.bind(this);
	this.handleOffsetChange = this.handleOffsetChange.bind(this);
	this.handleUserLogin = this.handleUserLogin.bind(this);
	this.handleShowAuth = this.handleShowAuth.bind(this);
	this.handlePastaSubmit = this.handlePastaSubmit.bind(this);
	this.handleCategoryChange = this.handleCategoryChange.bind(this);
	this.handleShowSubmit = this.handleShowSubmit.bind(this);
	this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = { 
	  pasta: [{text:null}],
	  next:null,
	  prev:null,
	  limit: 10,
	  offset: 0,
	  filters: {
		  long: '',
		  sentiment: '',
		  category: '',
		  search: ''
	  },
	  user: {},
	  ui: {
		auth: false,
		submit: false
	  }
	};

	// Set ADDRESS in state based on environment
	if (process.env.REACT_APP_SERVER_ADDRESS) {
		this.state.address = process.env.REACT_APP_SERVER_ADDRESS;
	} else {
		this.state.address = 'http://127.0.0.1:8000'
	}
  }
  getData = () => {
	axios.get(
		this.state.address+
		'/api/pastas/?limit='+this.state.limit+
		'&offset='+this.state.offset+
		'&long='+this.state.filters.long+
		'&sentiment='+this.state.filters.sentiment+
		'&categories__contains='+this.state.filters.category+
		'&search='+this.state.filters.search
	)
		.then(res => {
			const pasta = res.data.results;
			const next = res.data.next;
			const prev = res.data.previous;
			this.setState({ pasta, next, prev });
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
	this.intervalID = setInterval(this.getData.bind(this), 60000); // Request every 60 seconds
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
		const ui = this.state.ui
		ui.submit = false;
		this.setState({ ui })

	}  
  }
  handleShowAuth() {
	if (this.state.ui.auth) {
		this.setState({
			ui:{ auth: false, submit: this.state.ui.submit } 
		});			
	} else {
		this.setState({
			ui:{ auth: true, submit: this.state.ui.submit } 
		});		
	}
  }
  handleShowSubmit() {
	if (this.state.ui.submit) {
		this.setState({
			ui: { auth: this.state.ui.auth, submit: false }
		});
	} else {
		this.setState({
			ui: { auth: this.state.ui.auth, submit: true }
		});
	}
  }
  handleCategoryChange(category) {
	const filters = this.state.filters
	filters.category = category
	this.setState({filters, offset:0});
	setTimeout(this.getData.bind(this), 100)
  }
  handleSearchChange(term) {
	const filters = this.state.filters
	filters.search = term.target.value
	this.setState({filters, offset:0});
	setTimeout(this.getData.bind(this), 100)
  }

  render() {
	const listItems = this.state.pasta.map((pasta) =>
  		<ContentBox pasta={pasta} user={this.state.user}/>
	);

	return (
	  <div className="ui container">
		<div className="ui hidden spacer"></div>
		<div className="ui yellow inverted segment">
			<MainMenu user={this.state.user} onShowSubmit={this.handleShowSubmit} onUIChange={this.handleShowAuth} onCategoryChange={this.handleCategoryChange}/>
			{this.state.ui.auth && <UserAuth onUserLogin={this.handleUserLogin} address={this.state.address}/>}
			{this.state.ui.submit && <PastaSubmit address={this.state.address} onSubmit={this.handlePastaSubmit}/>}

			<div class="ui fluid massive left icon input">
				<i class="search icon"></i>
				<input type="text" placeholder="Enter your pasta terms here" autocomplete="false" value={this.state.filters.search} onChange={this.handleSearchChange}/>
			</div>

			<div className="ui segment">
				{this.state.filters.category && <div><span className="ui big red header">Searching </span><span className="ui big red circular label">{this.state.filters.category.toUpperCase()}</span><span className="ui big red header"> pasta.</span></div>}
				<ul className='ui container list'>
					{listItems}
				</ul>		
			</div>
			{this.state.prev !== null && <PrevPasta onOffsetChange={this.handleOffsetChange} offset={this.state.offset} limit={this.state.limit}/>}
			{this.state.next !== null && <NextPasta onOffsetChange={this.handleOffsetChange} offset={this.state.offset} limit={this.state.limit}/>}
			
		</div>
		<div className="ui hidden spacer"></div>		  
	  </div>

	);
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))