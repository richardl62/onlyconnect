import React, { FC, useState} from 'react';
import Wall  from './wall';
import './App.css';

// Shuffle array in place. Return the shuffled array
function shuffleArray<T>(array: Array<T>) {
  // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const startingClues = [
  'a1.1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'longlonglong', 'd2', 'd3', 'd4',
];

const startingState = startingClues.map((clue: string, index: number) => {
  return {
    clue: clue,
    index: index,
    answerGroup: index / 4,
    selected: false,
    solvedGroup: null,
  };
});

interface AppProps {};
const App: FC<AppProps> = () => {

    const [state, setState] = useState(startingState);
    const [wordsEntered, setWordsEntered] = useState(false);

  if (!wordsEntered) {
    const clueChange: (index: number, newClue: string) => void = (index, newClue) => {
      let newState = [...state];
      newState[index] = {...newState[index], clue:newClue};
      setState(newState);
    }

    const finishedEnteringWords: () => void = () => {
      setState(shuffleArray([...state]));
      setWordsEntered(true);
    }

    return (<>
      <div>Enter clues then press 'Done'</div>
      <Wall coreSquares={state} clueChange={clueChange} />
      <button type="button" onClick={finishedEnteringWords}>Done</button>
    </>
    );
  } else {

    const clueSelected: (index: number) => void = (index) => {
      console.log(`clue selected :`, index);
      let newState = [...state];
      newState[index] = {...newState[index], selected: !newState[index].selected};
      setState(newState);
    }

    return <Wall coreSquares={state} clueSelected={clueSelected}/>
  }

}
export default App;