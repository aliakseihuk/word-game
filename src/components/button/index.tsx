import React from 'react';

import './style.css';

type Props = {
  title: string,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  onClick: (...args: any[]) => { return; },
  disabled: false,
};

const Button: React.SFC<Props> = ({ onClick, title, disabled }) => {
  return (
    <button
      className="wgButton"
      onClick={onClick}
      disabled={disabled}
    >
      {title.toUpperCase()}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
