import React from 'react';
import Letter from '../letter/Letter';
import PropTypes from 'prop-types';

import './Word.css';

const Word = ({ letters, length }) => {
  const pattern = '_';
  const tail = Array(length - letters.length).fill(pattern);
  const renderedLetters = letters.concat(tail);
  const elements = renderedLetters.map((l, i) => (
    <Letter value={l} isPlaceholder={i >= letters.length} key={i + l} />
  ));
  return <section className="word"> {elements} </section>;
};

Word.propTypes = {
  letters: PropTypes.array.isRequired,
  length: PropTypes.number.isRequired
};

export default Word;
