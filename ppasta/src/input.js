import React, { Component } from 'react';

class AmountForm extends Component {
	constructor(props) {
	  super(props);
	  this.handleChange = this.handleChange.bind(this);
	}
  
	handleChange(event) {    
		this.props.onAmountChange(event.target.value);  
	}
  
	render() {
	  return (
		<div className="ui form">
			<div class="inline field">
				<label>Results: </label>
				<input type="number" value={this.props.limit} onChange={this.handleChange} />        				
			</div>
		</div>  
	  );
	}
}

export default AmountForm;