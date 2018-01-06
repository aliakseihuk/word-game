import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';

class Finish extends Component {
  constructor(props) {
    super(props);

    this.onRestartClick = this.onRestartClick.bind(this);
  }

  onRestartClick() {
    this.props.restart();
  }

  render() {
    return (
      <section>
        <div>{this.props.userWin ? 'you win' : 'you lose'}</div>
        <button onClick={this.onRestartClick}>Restart</button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    userWin: state.game.user.win
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restart: () => dispatch(restart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
