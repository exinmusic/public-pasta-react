import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ContentBox from './content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pasta: [{text:null}]
    };
  }
  componentDidMount() {
	this.getData(); // Make API request
	this.intervalID = setInterval(this.getData.bind(this), 15000); // Request every 15 seconds
  }
  componentWillUnmount() {
	clearInterval(this.intervalID);
  }
  getData = () => {
	axios.get('http://127.0.0.1:8000/pastas/?limit=5')
		.then(res => {
			const pasta = res.data.results;
			this.setState({ pasta });
		  })
  }
  render() {
	const listItems = this.state.pasta.map((pasta) =>
  		<ContentBox text={pasta.text} name={pasta.name}/>
	);
	return (
	  <ul>
		{listItems}
	  </ul>
	);
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))