import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWord, load } from '../../actions/actions';
import LocalStorage from '../../localStorage/LocalStorage';

import Button from '../button/Button';

class LoadGame extends Component {
  hasSavedGames() {
    return !LocalStorage.isEmpty();
  }

  loadSavedGame() {
    this.props.load();
  }

  render() {
    return (
      <Button
        title="Load Game"
        disabled={!this.hasSavedGames()}
        onClick={() => {
          this.loadSavedGame();
        }}
      />
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
    load: () => dispatch(load()),
    setWord: word => dispatch(setWord(word))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadGame);
