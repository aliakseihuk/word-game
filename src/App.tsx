import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Finish from './components/Finish';
import Game from './components/Game';
import Start from './components/start';

export class App extends Component {
  public render() {
    return (
      <section className="App">
        <Route exact={true} path="/" component={Start} />
        <Route exact={true} path="/game" component={Game} />
        <Route exact={true} path="/end" component={Finish} />
      </section>
    );
  }
}

export default App;
