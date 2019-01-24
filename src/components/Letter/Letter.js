import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Letter = ({ value, isPlaceholder = false }) => {
  let classes = 'letter';
  if (isPlaceholder) {
    classes += ' placeholder';
  }
  return <section className={classes}>{value}</section>;
};

Letter.propTypes = {
  value: PropTypes.string,
  isPlaceholder: PropTypes.bool
};

export default Letter;
