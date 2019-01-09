import React from 'react';
import Word from 'src/components/Word';

export const enum ACTOR_NAME_POSITIONS {
  TOP = 'top',
  BOTTOM = 'bottom', 
}

type Props = {
  name: string,
  key: string,
  wordLetters: string[],
  wordLength: number,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
  namePos: ACTOR_NAME_POSITIONS.BOTTOM,
}

class Actor extends React.Component<Props> {
  public static readonly defaultProps = defaultProps;

  public render(): JSX.Element {
    return <div className="Actor">{this._prepareOutput()}</div>;
  }

  private _renderName(): JSX.Element {
    const { key, name } = this.props;

    return (
      <h2 key={key + 'name'} className="alias">
        {name.toUpperCase()}
      </h2>
    );
  }

  private _prepareOutput(): React.ReactNode {
    const { key, wordLetters, wordLength, namePos } = this.props;
    const output = [
      <Word
        key={key + 'word'}
        letters={wordLetters}
        length={wordLength}
      />
    ];

    if (namePos === ACTOR_NAME_POSITIONS.TOP) {
      output.unshift(this._renderName());
    } else {
      output.push(this._renderName());
    }

    return output;
  }
}

export default Actor;
