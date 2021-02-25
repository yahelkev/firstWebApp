import React, { Component } from 'react';
import axios from 'axios';

export default class ByDescription extends Component {
	constructor() {
		super();
		this.state = {
			searchResulte: "Not searched yet",
			searchingFor: ""
		};
	}

	handleButtonClick = () => {
		axios.post("/ByDescription", {searchingFor : this.searchingFor}).then(response => {
			this.setState({
				searchResulte: response.data
			});
		});
	};

	render() {
		return(

			<div>

			<input type="text" value={this.state.searchingFor}/>
			<br/>
                
			<button onClick={this.handleButtonClick}>search</button>

				<h1> result: {this.state.searchingFor}</h1>
			</div>
		);
	}
}