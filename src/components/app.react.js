import React, { Component } from 'react';
import Codemirror from 'react-codemirror';
import esprima from 'esprima';
import SelectTests from './select-tests.react';
import FeedBack from './feedback.react';
import { checkCode, checkStructure } from '../utils';

export default class App extends Component {

  /*
    This is the constructor method, and it is the first thing that gets run when the component is getting mounted onto the DOM.
    The props is what we're inheriting from the Component library in React
  */
  constructor(props) {
    super(props);

    //we're declaring and setting the default value of the state
    this.state = {
      textarea: "",
      selectedTest: "",
      whiteForStatement: false,
      whiteVariableDeclaration: false,
      blackIfStatement: true,
      blackWhileStatement: true,
      structureForStatement: false,
      structureIfStatement: false
    };
  }

  /* 
    whenever the code editor area are being written by users, we are changing the text to reflect what they typed and we're constantinly checking if their
    code matches the requirements.
  */
  _updateCode = (newCode) => {
    const {selectedTest} = this.state;
    this.setState({
      textarea: newCode
    });
    if(!selectedTest || selectedTest === "Whitelist of specific functionality") {
      this._checkWhiteListCode(newCode);
    }
    else if(selectedTest === "Blacklist of specific functionality") {
      this._checkBlackListCode(newCode);
    }
    else {
      this._checkStructureCode(newCode);
    }
  };

  /*
    if the user is currently selecting the whitelist funcationalities, then we will check the new code against the whitelist requirements.
  */
  _checkWhiteListCode = (code) => {
    const result = esprima.parse(code, { sourceType: 'script' }); 
    const arr = [...result.body];
    const checkAgainst = ["ForStatement", "VariableDeclaration"];
    const checkResult = checkCode(arr, checkAgainst);
    let obj = {};
    checkAgainst.forEach((value) => {
      if(checkResult.indexOf(value) < 0) {
        obj[`white${value}`] = true;
      }
      else {
        obj[`white${value}`] = false;
      }
    });
    this.setState(obj);
  };

  /*
    if the user is currently selecting the blacklist funcationalities, then we will check the new code against the blacklist requirements.
  */
  _checkBlackListCode = (code) => {
    const result = esprima.parse(code, { sourceType: 'script' }); 
    const arr = [...result.body];
    const checkAgainst = ["IfStatement", "WhileStatement"];
    const checkResult = checkCode(arr, checkAgainst);
    let obj = {};
    checkAgainst.forEach((value) => {
      if(checkResult.indexOf(value) < 0) {
        obj[`black${value}`] = false;
      }
      else if(checkResult.indexOf(value) > -1) {
        obj[`black${value}`] = true;
      }
    });
    this.setState(obj);
  };

  /*
    if the user is currently selecting the structure funcationalities, then we will check the new code against the structure requirements.
  */
  _checkStructureCode = (code) => {
    const result = esprima.parse(code, { sourceType: 'script' }); 
    const arr = [...result.body];

    /* 
      unlike the previous two, we use linked-list to represent the structure that we want, eg. within Forstatement, there should be a Ifstatement and 
      it is represented by the property next in the linked list
    */
    const checkAgainst = {value: "ForStatement", child: {value: "IfStatement", child: null}};
    const checkResult = checkStructure(arr, checkAgainst);
    let obj = {};
    ["ForStatement", "IfStatement"].forEach(value => {
      if(checkResult.indexOf(value) < 0) {
        obj[`structure${value}`] = true;
      }
      else if(checkResult.indexOf(value) > -1) {
        obj[`structure${value}`] = false;
      }
    });
    this.setState(obj);
  };

  // whichever tests, blacklist or whitelist, that the user selects we will update the select tag and the state to reflect that.
  _selectedTest = (test) => {
    const {textarea} = this.state;
    if(test === "Blacklist of specific functionality") {
      this.setState({
        selectedTest: test,
        whiteForStatement: false,
        whiteVariableDeclaration: false,
        structureForStatement: false,
        structureIfStatement: false
      });
      this._checkBlackListCode(textarea);
    }
    else if(test === "Determine the rough structure of the program") {
      this.setState({
        selectedTest: test,
        whiteForStatement: false,
        whiteVariableDeclaration: false,
        blackIfStatement: true,
        blackWhileStatement: true
      }); 
      this._checkStructureCode(textarea);
    }
    else {
      this.setState({
        selectedTest: test,
        blackIfStatement: true,
        blackWhileStatement: true,
        structureForStatement: false,
        structureIfStatement: false
      });  
      this._checkWhiteListCode(textarea);
    }
  };

  /*
    depending on what test the user selected, the question will change according to it
  */
  _renderQuestion = () => {
    const {selectedTest} = this.state;
    if(selectedTest === "Blacklist of specific functionality") {
      return "Without using a 'while statement' or an 'if statement' find the sum of the elements in an array: [1,2,3,4]";
    }
    else if(selectedTest === "Determine the rough structure of the program") {
      return "Using 'if statements' within a 'for-loop' write a program that consoles multiples of 5 as 'fizz', multiples of 3 as 'buzz' and multiples of 3 and 5 as 'fizzbuzz' from 1 to 100.";
    }
    else {
      return "Using a 'for loop' and 'variable declaration' print out the list of names in this array: ['Aaron', 'John', 'Harry']";
    }
  };

  /*
    This is rendering the App component
  */
  render() {
    const {whiteForStatement, whiteVariableDeclaration, blackIfStatement, blackWhileStatement, structureForStatement, structureIfStatement, selectedTest} = this.state;
    const condition = {whiteForStatement, whiteVariableDeclaration, blackIfStatement, blackWhileStatement, structureForStatement, structureIfStatement, selectedTest};
    let options = {
      lineNumbers: true,
      mode:  "xml",
      theme : 'abcdef'
    };

    return (
      <div>
        <h1 className="center-text">Challenge Framework</h1>
        <SelectTests selectedTest={this._selectedTest} />
        <h4 className="center-text">{this._renderQuestion()}</h4>
        <Codemirror value={this.state.textarea} onChange={this._updateCode} options={options} />
        <FeedBack {...condition} />
      </div>
    );
  }
}
