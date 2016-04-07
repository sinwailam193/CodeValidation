import React, { Component } from 'react';

export default class FeedBack extends Component {

  /*
    This is the constructor method, and it is the first thing that gets run when the component is getting mounted onto the DOM.
    The props is what we're inheriting from the Component library in React
  */
  constructor(props) {
    super(props);
  }

  /*
    Depending on what test the user selected, we render our feedback based on what they are testing against.
  */
  _renderList = () => {
    const {whiteForStatement, whiteIfStatement, whiteVariableDeclaration, blackForStatement, blackIfStatement, blackVariableDeclaration, blackWhileStatement, selectedTest} = this.props;
    if(selectedTest === "Blacklist of specific functionality") {
      return (
        <ul>
          <li className={"feedback-list " + (blackForStatement && blackVariableDeclaration ? "hide" : "")}>This program MUST use a 'for loop' and a 'variable declaration'.</li>
          <li className={"feedback-list " + (blackWhileStatement && blackIfStatement ? "hide" : "")}>This program MUST NOT use a 'while loop' or an 'if statement'.</li>
        </ul>
      );
    }
    return (
      <ul>
        <li className={"feedback-list " + (whiteForStatement && whiteVariableDeclaration ? "hide" : "")}>This program MUST use a 'for loop' and a 'variable declaration'.</li>
        <li className={"feedback-list " + (whiteIfStatement && whiteForStatement ? "hide" : "")}>There should be a 'for loop' and inside of it there should be an 'if statement'.</li>
      </ul>
    );
  };

  /*
    This is rendering the FeedBack component
  */
  render() {
    return (
      <div className="feedback-container">
        <h3 className="feedback-header">FeedBack</h3>
        {this._renderList()}
      </div>
    );
  }
}
