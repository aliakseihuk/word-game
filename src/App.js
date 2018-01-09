import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Start from './components/Start';
import Game from './components/Game';
import Finish from './components/Finish';

import * as mods from './constants/mods.js';

export class App extends Component {
  render() {
    const frame =
      this.props.mode === mods.START ? (
        <Start />
      ) : this.props.mode === mods.GAME ? (
        <Game />
      ) : this.props.mode === mods.END ? (
        <Finish />
      ) : (
        <div />
      );
    return <section className="App">{frame}</section>;
  }
}

const mapStateToProps = state => {
  return { mode: state.game.mode };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
