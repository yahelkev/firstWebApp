import React, { Component } from 'react';
import axios from 'axios';


class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  
  search(msg) {
    axios.post("/ByDescription", { "searchingFor" : msg }) .then(response =>{
			this.updateChatbotState(this.createChatBotMessage(response.data));   
		});
  }
  infoOn(attackName) {
    axios.post("/infoOnAttack", { "searchingFor" : attackName }) .then(response =>{
			this.updateChatbotState(this.createChatBotMessage(response.data));   
		});
  }
  checkWithVirusTotal(msg) {
    const greetingMessage = this.createChatBotMessage(msg + " isnt good!")
    this.updateChatbotState(greetingMessage)
  }
  updateChatbotState(message) {
 
    
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider