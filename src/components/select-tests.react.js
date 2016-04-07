import React, { Component } from 'react';

export default class SelectTests extends Component {

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

  render() {
    return (
      <div className="parent-select">
        <select value={this.state.selectedOption} onChange={this._handleChange}>
          <option>Whitelist of specific functionality</option>
          <option>Blacklist of specific functionality</option>
        </select>
      </div>
    );
  }
}
