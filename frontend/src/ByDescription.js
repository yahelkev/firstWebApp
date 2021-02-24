import React, { Component } from 'react';
import axios from 'axios';

export default class ByDescription extends Component {
	constructor() {
		super();
		this.state = {
			searchResulte: "Not searched yet"
		};
	}

	handleButtonClick = () => {
		axios.get("/ByDescription").then(response => {
			this.setState({
				searchResulte: response.data
			});
		});
	};

	render() {
		return(
			<div>
				<button onClick={this.handleButtonClick}>search</button>
				<h1> result: {this.state.searchResulte}</h1>
			</div>
		);
	}
}