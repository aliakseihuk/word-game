import React from 'react';
import Letter from 'src/components/letter';
import { FILL_PATTERNS } from 'src/constants';

import './style.css';

type Props = {
  letters: string[],
  length: number,
};

const Word: React.SFC<Props> = ({ letters, length }): JSX.Element => {
  const pattern = FILL_PATTERNS.DASH;
  const tail = Array(length - letters.length).fill(pattern);
  const renderedLetters = letters.concat(tail);
  const elements = renderedLetters.map((letter, i) => (
    <Letter value={letter} isPlaceholder={i >= letters.length} key={i + letter} />
  ));
  
  return <section className="word">{elements}</section>;
};

export default Word;
