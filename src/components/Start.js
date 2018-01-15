import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setWord } from '../actions';
import ValidationError from './ValidationError';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: props.word };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setWord(this.state.inputValue);
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
          <div className="wgButton" onClick={this.handleSubmit}>
            START GAME
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    word: state.game.user.word,
    error: state.game.error
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWord: word => setWord(word)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Start);
