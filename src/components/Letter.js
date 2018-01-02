import React from 'react';
import PropTypes from 'prop-types';

import './Letter.css';

const Letter = ({ value }) => {
  return <div className="letter">{value}</div>;
};

Letter.propTypes = {
  value: PropTypes.string.isRequired
};

export default Letter;
