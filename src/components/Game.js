import React, { Component } from 'react';
import { connect } from 'react-redux';
import { check, shuffle } from '../actions';
import Actor from './actor/index';
import Button from './button/index';
import ValidationError from './ValidationError';

import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { letterOrWord: '' };
  }

  handleInputChange = event => {
    const { value } = event.target;
    const val =
      value.length <= this.props.user.word.length
        ? value
        : value.substr(0, this.props.user.word.length);
    this.setState({ letterOrWord: val.toUpperCase() });
  };

  onLetterOrWordSubmit = event => {
    event.preventDefault();
    this.props.check(this.state.letterOrWord);
    this.setState({ letterOrWord: '' });
  };

  onShuffle = () => {
    this.props.shuffle();
  };

  render() {
    const error = this.props.error ? (
      <ValidationError error={this.props.error} />
    ) : (
      undefined
    );
    return (
      <section className="Game">
        <Actor
          name="opponent"
          namePos="top"
          wordLetters={this.props.user.letters}
          wordLength={this.props.user.word.length}
        />
        <hr />
        <Actor
          name="player"
          wordLetters={this.props.ai.letters}
          wordLength={this.props.user.word.length}
        />
        {error}
        <section>
          <section className="check">
            <form className="form" onSubmit={this.onLetterOrWordSubmit}>
              <input
                className="wgInput check-input"
                type="text"
                value={this.state.letterOrWord}
                onChange={this.handleInputChange}
                placeholder="LETTER OR WORD"
              />
              <Button title="check" type="submit" />
            </form>
          </section>
          <Button title="shuffle" onClick={this.onShuffle} />
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.game.user,
    ai: state.game.ai,
    error: state.game.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    check: value => dispatch(check(value)),
    shuffle: () => dispatch(shuffle())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
