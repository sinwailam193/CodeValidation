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
    const {whiteForStatement, whiteVariableDeclaration, blackIfStatement, blackWhileStatement, structureForStatement, structureIfStatement, selectedTest} = this.props;
    if(selectedTest === "Blacklist of specific functionality") {
      return (
        <p className={"feedback-list " + (blackWhileStatement && blackIfStatement ? "hide" : "")}>This program MUST NOT use a 'while loop' or an 'if statement'.</p>
      );
    }
    else if(selectedTest === "Whitelist of specific functionality" || selectedTest === "") {
      return (
        <p className={"feedback-list " + (whiteForStatement && whiteVariableDeclaration ? "hide" : "")}>This program MUST use a 'for loop' and a 'variable declaration'.</p>
      );
    }
    else {
      return (
        <p className={"feedback-list " + (structureForStatement && structureIfStatement ? "hide" : "")}>There should be a 'for loop' and inside of it there should be an 'if statement'.</p>
      );
    }
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
