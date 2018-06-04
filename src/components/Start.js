import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setWord } from '../actions';
import Button from './button/Button';
import ValidationError from './ValidationError';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setWord(this.state.inputValue || 'WORD');
  }

  render() {
    const error = this.props.error ? (
      <ValidationError error={this.props.error} />
    ) : (
      undefined
    );
    return (
      <section className="start">
        <section className="info">
          <h1>
            GUESS A<br />WORD
          </h1>
          <h2>train your brain</h2>
        </section>
        <section className="action">
          <input
            className="wgInput"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="WORD"
          />
          {error}
          <Button
            title="start game"
            onClick={event => this.handleSubmit(event)}
          />
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.game.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setWord: word => dispatch(setWord(word))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
