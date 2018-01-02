import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setWord } from '../actions';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setWord(this.state.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Word:
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </label>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    setWord: word => dispatch(setWord(word))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
