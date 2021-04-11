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
    axios.get('https://www.virustotal.com/api/v3/files/'.concat(msg),
    { headers: { "x-apikey" : "cda2f8f7183e997d478c385a1e3002bce9ef1a08ed2ef497ceebec8236ff5441" ,
    "Access-Control-Allow-Origin" : "https://www.virustotal.com/api/v3/files/" }})
    .then(response =>{
	        console.log(response)		
            this.updateChatbotState(this.createChatBotMessage(response.data.data.attributes.trusted_verdict.verdict));   
	}).catch(err => {
        if(err.response)
        {
               this.updateChatbotState(this.createChatBotMessage(err.response.data.error.message));   
        }
        else
        {
             this.updateChatbotState(this.createChatBotMessage("Resource not found!"));
        }
        console.log(err.response);
    });
  }
  updateChatbotState(message) {
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}
export default ActionProvider