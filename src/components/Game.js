import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkLetterByUser, checkWordByUser, shuffleByUser } from '../actions';

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
    this.props.checkLetterByUser(this.state.letter);
  }

  handleWordChange(event) {
    this.setState({ word: event.target.value });
  }

  onWordSubmit() {
    this.props.checkWordByUser(this.state.word);
  }

  onShuffle() {
    this.props.shuffleByUser();
  }

  render() {
    return (
      <div>
        <p>User Word: {this.props.user.word}</p>
        <p>User: {this.props.ai.letters}</p>
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
    checkLetterByUser: letter => dispatch(checkLetterByUser(letter)),
    checkWordByUser: word => dispatch(checkWordByUser(word)),
    shuffleByUser: () => dispatch(shuffleByUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
