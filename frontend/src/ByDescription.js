import React, { Component } from 'react';
import axios from 'axios';

export default class ByDescription extends Component {
	constructor() {
		super();
		this.state = {
			searchResulte: "",
			searchingFor: ""
		}
	}
	sendSearchingMasseg = (event) => {
		event.preventDefault()
		axios.post("/ByDescription", { "searchingFor" : this.state.searchingFor }) .then(response =>{
			console.log("resulte: " + response.data)
			this.setState({searchResulte:response.data});   
		});
	};

	handleInputChanges = (event) => {
		event.preventDefault()
		this.setState({
			[event.target.name]: event.target.value 
		});
	};
	render() {

		return(
			<div>
				<form onSubmit={this.sendSearchingMasseg}>
					<p><input type="text" placeholder="Seach For" name='searchingFor' onChange={this.handleInputChanges} /></p>
					<p><button>Search</button></p>
				<h1> result: {this.state.searchResulte}</h1>
				</form>
			</div>
		);
	}
}