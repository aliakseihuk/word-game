import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import './App.css';

const Finish = asyncComponent({
  resolve: () => require('./components/Finish'),
});
const Game = asyncComponent({
  resolve: () => require('./components/Game'),
});
const Start = asyncComponent({
  resolve: () => require('./components/start'),
});

export class App extends Component {
  // TODO: ADD ROUTES Constants
  public render() {
    return (
      <section className="App">
        <Route exact={true} path="/" component={Start} />
        <Route path="/game" component={Game} />
        <Route path="/end" component={Finish} />
      </section>
    );
  }
}

export default App;
