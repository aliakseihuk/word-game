import * as React from 'react';
import { connect } from 'react-redux';
import { restart } from 'src/actions';
import { FINISH_MESSAGES } from 'src/locale';
import Button from 'src/components/button';

import './style.css';

type Props = {} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  userWin: false,
  restart: (...args: any[]): any => { return; },
};

class Finish extends React.Component<Props> {
  public static readonly defaultProps = defaultProps;

  public onRestartClick = (): void => {
    const { restart } = this.props;

    if (restart) {
      restart();
    }
  };

  public render(): JSX.Element {
    return (
      <section className="Finish">
        <h1>{this.props.userWin ? FINISH_MESSAGES.WIN : FINISH_MESSAGES.LOSE}</h1>
        <Button onClick={this.onRestartClick} title="Restart" />
      </section>
    );
  }
}

const mapStateToProps = (state: GameState): Props => {
  return {
    userWin: state.game.user.win,
  };
};

const mapDispatchToProps = (dispatch: Callback): Props => {
  return {
    restart: () => dispatch(restart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
