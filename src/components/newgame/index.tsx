import React from 'react';
import { connect } from 'react-redux';
import { setWord } from 'src/actions';
import Button from 'src/components/button';
import ValidationError from 'src/components/ValidationError';
import CONFIG from 'src/config';

type State = {
  inputValue: string,
};
type Props = {
  setWord?: (word: string) => void,
  error?: Error,
};

const defaultState: State = { inputValue: '' }; 

class NewGame extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value.toUpperCase() });
  }

  public handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    const { setWord } = this.props;

    if (setWord) {
      setWord(this.state.inputValue || CONFIG.DEFAULT_WORD);
    }
  };

  public render(): JSX.Element {
    const error = this.props.error ? (
      <ValidationError error={this.props.error} />
    ) : (
      undefined
    );

    return (
      <section>
        <input
          className="wgInput"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="WORD"
        />
        {error}
        <Button title="start game" onClick={this.handleSubmit} />
      </section>
    );
  }
}

const mapStateToProps = (state: GameState): Props => {
  return {
    error: state.game.error,
  };
};
const mapDispatchToProps = (dispatch: Callback): Props => {
  return {
    setWord: (word: string) => dispatch(setWord(word)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
