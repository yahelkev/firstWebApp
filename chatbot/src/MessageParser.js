class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()
    
    if (lowerCaseMessage.includes("search: ")) {
      this.actionProvider.search(lowerCaseMessage.substring(8))//passes only the searching for string
    }
    else if (lowerCaseMessage.includes("check the: ")) {
      this.actionProvider.checkWithVirusTotal(lowerCaseMessage.substring(11))//passes only the signature
    }
    else if (lowerCaseMessage.includes("infoon: ")) {
     this.actionProvider.infoOn(lowerCaseMessage.substring(8))//passes only the attack name
    }
  }
}
export default MessageParser;
