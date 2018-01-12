import React from 'react';
import PropTypes from 'prop-types';

import './ValidationError.css';

const ValidationError = ({ error }) => {
  return <section className="ValidationError">*{error.message}</section>;
};

ValidationError.propTypes = {
  error: PropTypes.object.isRequired
};

export default ValidationError;
