import React, { Component } from 'react';
import axios from 'axios';

export default class ByDescription extends Component {
	constructor() {
		super();
		this.state = {
			searchResulte: "*PRESS ENTER/Search TO START*",
			searchingFor: ""
		}
	}

	getInfoOnAttac = (event) => {
		event.preventDefault()
		axios.post("/infoOnAttack", { "searchingFor" : this.state.searchingFor }) .then(response =>{
			this.setState({searchResulte: response.data});   
		});
	};
		sendSearchingMasseg = (event) => {
		event.preventDefault()
		axios.post("/ByDescription", { "searchingFor" : this.state.searchingFor }) .then(response =>{
			this.setState({searchResulte: response.data});   
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
				</form>
				<form onSubmit={this.getInfoOnAttac}>
					<p><input type="text" placeholder="info On" name='searchingFor' onChange={this.handleInputChanges} /></p>
					<p><button>Get Info</button></p>
				</form>
				<h5> result: {this.state.searchResulte}</h5>
			</div>
		);
	}
}