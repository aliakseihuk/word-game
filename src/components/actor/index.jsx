import React, { Component } from 'react';
import Word from '../Word';

class Actor extends Component {
  renderName() {
    return (
      <h2 key={this.props.key + 'name'} className="alias">
        {this.props.name.toUpperCase()}
      </h2>
    );
  }

  prepareOutput() {
    const output = [
      <Word
        key={this.props.key + 'word'}
        letters={this.props.wordLetters}
        length={this.props.wordLength}
      />
    ];

    if (this.props.namePos === 'top') {
      output.unshift(this.renderName());
    } else {
      output.push(this.renderName());
    }

    return output;
  }

  render() {
    return <div className="Actor">{this.prepareOutput()}</div>;
  }
}

export default Actor;
