import React, { Component } from 'react';

export default class SelectTests extends Component {

  /*
    This is the constructor method, and it is the first thing that gets run when the component is getting mounted onto the DOM.
    The props is what we're inheriting from the Component library in React
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ""
    };
  }

  /*
    this handles the changes of what option the user are selecting, whiteist or blacklist
  */
  _handleChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    });
    this.props.selectedTest(event.target.value);
  };

  /*
    This is rendering the SelectTests component
  */
  render() {
    return (
      <div className="parent-select">
        <select value={this.state.selectedOption} onChange={this._handleChange}>
          <option>Whitelist of specific functionality</option>
          <option>Blacklist of specific functionality</option>
          <option>Determine the rough structure of the program</option>
        </select>
      </div>
    );
  }
}
