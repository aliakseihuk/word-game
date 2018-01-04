import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Start from './components/Start';
import Game from './components/Game';
import Finish from './components/Finish';

import * as constants from './constants';

export class App extends Component {
  render() {
    const frame =
      this.props.mode === constants.START ? (
        <Start />
      ) : this.props.mode === constants.GAME ? (
        <Game />
      ) : (
        <Finish />
      );
    return frame;
  }
}

const mapStateToProps = state => {
  return { mode: state.game.mode };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
