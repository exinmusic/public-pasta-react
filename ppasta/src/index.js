import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ContentBox from './content';
import Logo from './logo';
import LimitForm from './limit';
import OffsetForm from './offset';

class App extends Component {
  constructor(props) {
	super(props);
	this.handleLimitChange = this.handleLimitChange.bind(this);
	this.handleOffsetChange = this.handleOffsetChange.bind(this);
    this.state = { 
	  pasta: [{text:null}],
	  limit: 5,
	  offset: 0
    };
  }
  getData = () => {
	axios.get('http://127.0.0.1:8000/pastas/?limit='+this.state.limit+'&offset='+this.state.offset)
		.then(res => {
			const pasta = res.data.results;
			this.setState({ pasta });
		})
  }
  componentDidMount() {
	this.getData(); // Make API request
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

  render() {
	const listItems = this.state.pasta.map((pasta) =>
  		<ContentBox text={pasta.text} name={pasta.name}/>
	);
	return (
	  <div className="ui container">
		<div className="ui hidden spacer"></div>
		<div className="ui yellow inverted segment">
			<Logo />
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