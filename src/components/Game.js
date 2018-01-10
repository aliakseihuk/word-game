import React, { Component } from 'react';
import { connect } from 'react-redux';
import { check, shuffle } from '../actions';
import Word from './Word';
import ValidationError from './ValidationError';

import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { letterOrWord: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onLetterOrWordSubmit = this.onLetterOrWordSubmit.bind(this);
    this.onShuffle = this.onShuffle.bind(this);
  }

  handleInputChange(event) {
    this.setState({ letterOrWord: event.target.value.toUpperCase() });
  }

  onLetterOrWordSubmit() {
    if (this.state.letterOrWord) {
      this.props.check(this.state.letterOrWord);
      this.setState({ letterOrWord: '' });
    }
  }

  onShuffle() {
    this.props.shuffle();
  }

  render() {
    const error = this.props.error ? (
      <ValidationError error={this.props.error} />
    ) : (
      undefined
    );
    return (
      <section className="Game">
        <h2 className="alias">OPPONENT</h2>
        <div>
          <Word
            letters={this.props.user.letters}
            length={this.props.user.word.length}
          />
        </div>
        <div>
          <Word
            letters={this.props.ai.letters}
            length={this.props.user.word.length}
          />
        </div>
        <h2 className="alias">PLAYER</h2>
        {error}
        <section>
          <section className="check">
            <input
              className="wgInput"
              type="text"
              value={this.state.letterOrWord}
              onChange={this.handleInputChange}
              placeholder="LETTER OR WORD"
            />
            <div className="wgButton" onClick={this.onLetterOrWordSubmit}>
              CHECK
            </div>
          </section>
          <div className="wgButton" onClick={this.onShuffle}>
            SHUFFLE
          </div>
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
