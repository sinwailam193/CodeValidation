import React, { Component } from 'react';
import Codemirror from 'react-codemirror';
import esprima from 'esprima';
import SelectTests from './select-tests.react';
import FeedBack from './feedback.react';
import { checkBlackCode, checkWhiteCode } from '../utils';

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
      whiteIfStatement: false,
      whiteVariableDeclaration: false,
      blackForStatement: false,
      blackIfStatement: true,
      blackVariableDeclaration: false,
      blackWhileStatement: true
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
  };

  /*
    if the user is currently selecting the whitelist funcationalities, then we will check the new code against the whitelist requirements.
  */
  _checkWhiteListCode = (code) => {
    const result = esprima.parse(code, { sourceType: 'script' }); 
    const arr = [...result.body];
    const checkAgainst = ["ForStatement", "IfStatement", "VariableDeclaration"];
    const checkResult = checkWhiteCode(arr, checkAgainst);
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
    const checkAgainst = ["ForStatement", "IfStatement", "VariableDeclaration", "WhileStatement"];
    const checkResult = checkBlackCode(arr, checkAgainst);
    let obj = {};
    checkAgainst.forEach((value) => {
      if(value === "WhileStatement" || value === "IfStatement") {
        if(checkResult.indexOf(value) < 0) {
          obj[`black${value}`] = false;
        }
        else if(checkResult.indexOf(value) > -1) {
          obj[`black${value}`] = true;
        }
      }
      else {
        if(checkResult.indexOf(value) < 0) {
          obj[`black${value}`] = true;
        }
        else {
          obj[`black${value}`] = false;
        }
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
        whiteIfStatement: false,
        whiteVariableDeclaration: false
      });
      this._checkBlackListCode(textarea);
    }
    else {
      this.setState({
        selectedTest: test,
        blackForStatement: false,
        blackIfStatement: true,
        blackVariableDeclaration: false,
        blackWhileStatement: true
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
    return "Using 'for loops' and 'if statements' write a program that consoles multiples of 5 as 'fizz', multiples of 3 as 'buzz' and multiples of 3 and 5 as 'fizzbuzz' from 1 to 100."
  };

  /*
    This is rendering the App component
  */
  render() {
    const {whiteForStatement, whiteIfStatement, whiteVariableDeclaration, blackForStatement, blackIfStatement, blackVariableDeclaration, blackWhileStatement, selectedTest} = this.state;
    const condition = {whiteForStatement, whiteIfStatement, whiteVariableDeclaration, blackForStatement, blackIfStatement, blackVariableDeclaration, blackWhileStatement, selectedTest};
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
