import React, { Component } from 'react';

import NewGame from '../newgame';
import LoadGame from '../loadgame';
import './style.css';

class Start extends Component {
  render() {
    return (
      <section className="start">
        <section className="info">
          <h1>
            GUESS A<br />WORD
          </h1>
          <h2>train your brain</h2>
        </section>
        <section className="info">
          <NewGame />
          <LoadGame />
        </section>
      </section>
    );
  }
}

export default Start;
