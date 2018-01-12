import React, { Component } from 'react';
import { connect } from 'react-redux';

import { restart } from '../actions';
import './Finish.css';

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
      <section className="Finish">
        <h1>{this.props.userWin ? 'you win' : 'you lose'}</h1>
        <div className="wgButton" onClick={this.onRestartClick}>
          Restart
        </div>
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
