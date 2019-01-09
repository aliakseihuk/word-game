import React from 'react';
import { INPUT_TYPES } from 'src/constants';

import './style.css';

type Props = {
  title: string,
  type?: INPUT_TYPES,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  onClick: (...args: any[]) => { return; },
  type: INPUT_TYPES.BUTTON,
  disabled: false,
};

const Button: React.SFC<Props> = ({ onClick, title, disabled }): JSX.Element => {
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
