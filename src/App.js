import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Start from './components/Start';
import Game from './components/Game';
import Finish from './components/Finish';

export class App extends Component {
  render() {
    return (
      <section className="App">
        <main>
          <Route exact path="/" component={Start} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/end" component={Finish} />
        </main>
      </section>
    );
  }
}

export default App;
