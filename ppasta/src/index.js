import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class App extends Component {

	state = {
		pasta: [{text:0}],
	}

  componentDidMount() {

	this.getData();

	this.intervalID = setInterval(this.getData.bind(this), 15000);
  }

  componentWillUnmount() {

	clearInterval(this.intervalID);
  }

  getData = () => {
	axios.get('http://127.0.0.1:8000/pastas/')
		.then(res => {
			const pasta = res.data.results;
			this.setState({ pasta });
			console.log(this.state.pasta[0].text)
		  })
  }

  render() {
	return (
	  <div>
		{this.state.pasta[0].text}
	  </div>
	);
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))