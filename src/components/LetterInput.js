import React from 'react';
import PropTypes from 'prop-types';

import './Letter.css';

const LetterInput = ({ value, onChange }) => {
  value = value || '_';
  return (
    <div className="letter">
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

LetterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LetterInput;
