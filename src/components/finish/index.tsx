import * as React from 'react';
import { connect } from 'react-redux';
import { restart } from 'actions';

import Button from 'components/button';

import './Finish.css';
import { FINISH_MESSAGES } from '../../locale';

// TODO: Define Game interface
type State = { game: any };
type Props = {} & Readonly<typeof defaultProps>;

const defaultProps = {
  restart: () => { return; },
  userWin: false,
};

class Finish extends React.Component<Props, State> {
  public static readonly defaultProps = defaultProps;

  public onRestartClick = () => {
    this.props.restart();
  };

  public render() {
    return (
      <section className="Finish">
        <h1>{this.props.userWin ? FINISH_MESSAGES.WIN : FINISH_MESSAGES.LOSE}</h1>
        <Button onClick={this.onRestartClick} title="Restart" />
      </section>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    userWin: state.game.user.win
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    restart: () => dispatch(restart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
