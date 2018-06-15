import React, { Component } from 'react';

import './style.css';

class Button extends Component {
  render() {
    return (
      <button
        className="wgButton"
        onClick={this.props.onClick}
        disabled={this.props.disabled ? 'disabled' : ''}
      >
        {this.props.title.toUpperCase()}
      </button>
    );
  }
}

export default Button;
