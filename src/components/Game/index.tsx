import React from 'react';
import { connect } from 'react-redux';
import { check, shuffle } from 'src/actions';
import Actor, { ACTOR_NAME_POSITIONS } from 'src/components/actor';
import Button from 'src/components/button';
import ValidationError from 'src/components/validation-error';
import { IUser, IAi } from 'src/interfaces';
import { INPUT_TYPES, ACTOR_KEYS } from 'src/constants';

import './style.css';

type DefaultProps = typeof defaultProps;

type State = {
  letterOrWord: string,
};

type Props = {
  user: IUser,
  ai: IAi,
  error: Error,
} & Partial<Readonly<DefaultProps>>;


const defaultProps = {
  check: (...args: any[]) => { return; },
  shuffle: (...args: any[]) => { return; },
};

class Game extends React.Component<Props, State> {
  public static readonly defaultProps = defaultProps;
  public state = { letterOrWord: '' };

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const { word } = this.props.user;
    const val = (value.length <= word.length) ? value : value.substr(0, word.length);

    this.setState({ letterOrWord: val.toUpperCase() });
  };

  public onLetterOrWordSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const { check } = this.props;

    if (check) {
      check(this.state.letterOrWord);
    }

    this.setState({ letterOrWord: '' });
  };

  public onShuffle = (): void => {
    const { shuffle } = this.props;

    if (shuffle) {
      shuffle();
    }
  };

  public render(): JSX.Element {
    const { user, ai } = this.props;

    return (
      <section className="Game">
        <Actor
          name="opponent"
          namePos={ACTOR_NAME_POSITIONS.TOP}
          wordLetters={user.letters}
          wordLength={user.word.length}
          key={ACTOR_KEYS.AI}
        />
        <hr />
        <Actor
          name="player"
          wordLetters={ai.letters}
          wordLength={user.word.length}
          key={ACTOR_KEYS.PLAYER}
        />
        {this._renderErrorSection()}
        <section>
          <section className="check">
            <form className="form" onSubmit={this.onLetterOrWordSubmit}>
              <input
                className="wgInput check-input"
                type="text"
                value={this.state.letterOrWord}
                onChange={this.handleInputChange}
                placeholder="LETTER OR WORD"
              />
              <Button title="check" type={INPUT_TYPES.SUBMIT} />
            </form>
          </section>
          <Button title="shuffle" onClick={this.onShuffle} />
        </section>
      </section>
    );
  }

  private _renderErrorSection(): React.ReactNode{
    const { error } = this.props;

    return (error) ? <ValidationError error={error} /> : null;
  }
}

const mapStateToProps = (state: GameState): Props => {
  return {
    user: state.game.user,
    ai: state.game.ai,
    error: state.game.error
  };
};

const mapDispatchToProps = (dispatch: Callback): DefaultProps => {
  return {
    // TODO: add CheckValue Type
    check: (value: any) => dispatch(check(value)),
    shuffle: () => dispatch(shuffle())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
