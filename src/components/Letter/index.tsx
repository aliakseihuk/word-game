import React from 'react';

import './Letter.css';

type Props = {
  value: string,
  isPlaceholder: boolean,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  isPlaceholder: false,
};

const Letter: React.SFC<Props> = ({ value, isPlaceholder }) => {
  let classes = 'letter';

  if (isPlaceholder) {
    classes += ' placeholder';
  }
  
  return <section className={classes}>{value}</section>;
};

Letter.defaultProps = defaultProps;

export default Letter;
