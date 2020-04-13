import React, { Component } from 'react';

class OffsetForm extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		}

		handleChange(event) {    
			this.props.onOffsetChange(event.target.value);  
		}

		render() {
		return (
			<div className="ui form">
				<div class="inline field">
					<label>Offset: </label>
					<input type="number" value={this.props.offset} onChange={this.handleChange} />        				
				</div>
			</div>  
		);
		}
}

export default OffsetForm;