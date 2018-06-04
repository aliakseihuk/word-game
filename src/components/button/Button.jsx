import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="wgButton" onClick={this.props.onClick}>
        {this.props.title.toUpperCase()}
      </button>
    );
  }
}

export default Button;
