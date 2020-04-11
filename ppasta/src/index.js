import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ContentBox from './content';
import Logo from './logo';
import AmountForm from './input';

class App extends Component {
  constructor(props) {
	super(props);
	this.handleAmountChange = this.handleAmountChange.bind(this);
    this.state = { 
	  pasta: [{text:null}],
	  limit: 5,
    };
  }
  getData = () => {
	axios.get('http://127.0.0.1:8000/pastas/?limit='+this.state.limit)
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
  handleAmountChange(limit) {
	this.setState({ limit });
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
			<AmountForm limit={this.state.limit} onAmountChange={this.handleAmountChange}/>	
			<div className="ui segment">
				<ul className='ui container list'>
					{listItems}
				</ul>		
			</div>	 
		</div>		  
	  </div>

	);
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))