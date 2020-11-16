import React, { FC, useState} from 'react';
import { Clue } from './clue';
import './App.css';

const startingWords = [
  'a1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'longlonglong', 'd2', 'd3', 'd4',
];



interface AppProps {};
const App: FC<AppProps> = () => {

    const [clues, setClues] = useState(startingWords);

    const clueChange: (index: number, newClue: string) => void = (index, newClue) => {
      let newClues = [...clues];
      newClues[index] = newClue;
      setClues(newClues);
    }

    return (
      <div className="wall">
        {clues.map((clue, index) => (
            <div key={index.toString()}> 
              <Clue clue={clue} index={index} onChange={clueChange} />
            </div> 
         ))}
      </div>
    );

}
export default App;
