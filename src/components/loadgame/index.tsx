import React from 'react';
import { connect } from 'react-redux';
import { setWord, load } from 'src/actions';
import LocalStorage from 'src/services/localStorage/LocalStorage';
import Button from 'src/components/button';

type Props = {
  error?: Error,
  setWord?: (word: string) => void,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  load: () => { return; }
}

class LoadGame extends React.Component<Props> {
  public hasSavedGames(): boolean {
    return !LocalStorage.isEmpty();
  }

  public loadSavedGameHandler = (): void => {
    const { load } = this.props;

    if (load) {
      load();
    }
  }

  public render(): JSX.Element {
    return (
      <Button
        title="Load Game"
        disabled={!this.hasSavedGames()}
        onClick={this.loadSavedGameHandler}
      />
    );
  }
}

const mapStateToProps = (state: GameState): Props => {
  return {
    error: state.game.error
  };
};
const mapDispatchToProps = (dispatch: Callback): Props => {
  return {
    load: () => dispatch(load()),
    setWord: (word: string) => dispatch(setWord(word))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadGame);
