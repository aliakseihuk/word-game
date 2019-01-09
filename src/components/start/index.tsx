import React from 'react';

import NewGame from 'src/components/newgame';
import LoadGame from 'src/components/loadgame';

import './style.css';

const Start: React.SFC = (): JSX.Element => {
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

export default Start;
