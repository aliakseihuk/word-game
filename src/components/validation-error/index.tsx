import React from 'react';

import './style.css';

type Props = {
  error: Error,
};

const ValidationError: React.SFC<Props> = ({ error }): JSX.Element => {
  return <section className="ValidationError">*{error.message}</section>;
};

export default ValidationError;
