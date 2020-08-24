import React, { Component } from 'react';

class PrevPasta extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		}

		handleChange() {    
			this.props.onOffsetChange( this.props.offset - this.props.limit );  
			window.scrollTo(0, 0);
		}

		render() {
		return (
			<div className='ui button' onClick={this.handleChange}>
				Previous page
			</div>				
		);
		}
}

export default PrevPasta;