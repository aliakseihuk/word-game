import React, { Component } from 'react';

class Finish extends Component {
  constructor(props) {

    super(props)

    this.state = {
      userWin: this.props.userWin
    };
  }

  render() {
    return (

      <div>
        you win
      </div>
    );
  }
}

export default Finish;
