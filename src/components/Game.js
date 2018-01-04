import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkLetter, checkWord, shuffle } from '../actions';
import Word from './Word';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { letter: '', word: '' };
    this.handleLetterChange = this.handleLetterChange.bind(this);
    this.onLetterSubmit = this.onLetterSubmit.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.onWordSubmit = this.onWordSubmit.bind(this);
    this.onShuffle = this.onShuffle.bind(this);
  }

  handleLetterChange(event) {
    const length = event.target.value.length;
    const letter =
      length >= 2 ? event.target.value[length - 1] : event.target.value;
    this.setState({ letter });
  }

  onLetterSubmit() {
    this.props.checkLetter(this.state.letter);
  }

  handleWordChange(event) {
    this.setState({ word: event.target.value });
  }

  onWordSubmit() {
    this.props.checkWord(this.state.word);
  }

  onShuffle() {
    this.props.shuffle();
  }

  render() {
    return (
      <div>
        <p>User Word: {this.props.user.word}</p>
        <div>
          User: <Word letters={this.props.ai.letters} length={5} />
        </div>
        <p>Opponent Word: {this.props.ai.word}</p>
        <p>Opponent: {this.props.user.letters}</p>

        <label>
          Letter:
          <input
            type="text"
            value={this.state.letter}
            onChange={this.handleLetterChange}
          />
          <input type="submit" onClick={this.onLetterSubmit} />
        </label>
        <label>
          Word:
          <input
            type="text"
            value={this.state.word}
            onChange={this.handleWordChange}
          />
          <input type="submit" onClick={this.onWordSubmit} />
        </label>
        <button onClick={this.onShuffle}>Shuffle</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.game.user,
    ai: state.game.ai
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkLetter: letter => dispatch(checkLetter(letter)),
    checkWord: word => dispatch(checkWord(word)),
    shuffle: () => dispatch(shuffle())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
