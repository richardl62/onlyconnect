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

let startingClues: Array<string>;
startingClues = [
  'a1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'd1 longlonglong', 'd2', 'd3', 'd4',
];

const groupSize = 4;
const nGroups = 4;

function groupFromIndex(index: number) {
  return Math.floor(index/groupSize) + 1;
}

class CoreSquare {
  readonly answerGroup: number;
  clue = "";
  selected = false; 
  solvedGroup: number | null = null;

  constructor(answerGroup: number) {
    this.answerGroup = answerGroup;
  }
};

function startingCoreSquares() {
    let squares: Array<CoreSquare> = [];
    
    for(let groupNo = 0; groupNo < nGroups; ++groupNo) {
      for(let n = 0; n < groupSize; ++n) {
        let s = new CoreSquare(groupNo);
        squares.push(s);

        // To help with testing
        if(startingClues) {
          s.clue = startingClues[n + groupNo * groupSize];
        }
      }
    }

    return squares;
}

// Check that 
// - Squares in solved groups below 'groupBeingProcessed' are correctly placed
// = No square is in a solved group greated than  'groupBeingProcessed'
// Throw an error the if check fails.
function sanityCheckSolvedGroups(squares: Array<CoreSquare>, groupBeingProcessed: number) {
  for (let index = 0; index < squares.length; ++index) {
    const positional = groupFromIndex(index);
    const current = squares[index].solvedGroup;
    if(positional < groupBeingProcessed) {
        if(positional !== current) {
          throw new Error(`square ${index} is not in solved group ${positional}`)
        }

        if (current > groupBeingProcessed) {
          throw new Error(`square ${index} is in unexpected solved fron ${current}`)
        }
    }
  }
}

function positionSquaresInSolvedGroup(squares: Array<CoreSquare>, groupNo: number) {

  sanityCheckSolvedGroups(squares, groupNo);

  // Relies on properties cheched above. 
  for (let index = 0; index < squares.length; ++index) {
    const sq = squares[index];
    if (sq.solvedGroup === groupNo && groupFromIndex(index) !== groupNo) {
      const moveTo = squares.findIndex(s => !s.solvedGroup); // Inefficient
      if (groupFromIndex(moveTo) !== groupNo) {
        throw new Error("Bah! Something has gone wrong");
      }
      [squares[index], squares[moveTo]] = [squares[moveTo], squares[index]];
    }
  }
}

const App: FC<{}> = () => {

  const [coreSquares, setCoreSquares] = useState(startingCoreSquares);
  const [wordsEntered, setWordsEntered] = useState(false);
  const [lastSolvedGroup, setLastSolvedGroup] = useState(0);

  const clueChange: (index: number, newClue: string) => void = (index, newClue) => {
    let newSquares = [...coreSquares];
    newSquares[index].clue = newClue;
    setCoreSquares(newSquares);
  }

  const finishedEnteringWords: () => void = () => {
    setCoreSquares(shuffleArray([...coreSquares]));
    setWordsEntered(true);
  }

  const clueSelected: (index: number) => void = (index) => {

    // Ignore squares that have already been solved.
    if(!coreSquares[index].solvedGroup) {
      let squares = [...coreSquares];
      squares[index].selected = !squares[index].selected;

      let selected = squares.filter(cs => cs.selected);
      if(selected.find(s => s.solvedGroup)) {
        throw new Error("Selected square is already solved");
      }

      if( selected.length === groupSize ) {
        selected.forEach(s => s.selected = false);

        if (selected.every(s => s.answerGroup === selected[0].answerGroup)) {
          const solvedGroup = lastSolvedGroup + 1;
          setLastSolvedGroup(solvedGroup);

          selected.forEach(s => s.solvedGroup = solvedGroup);
          positionSquaresInSolvedGroup(squares, solvedGroup);

           // If the last but one group has been solve, then the last group 
          // must also be solved.
          if(solvedGroup + 1 === nGroups) {
            squares.forEach(s => {
              if(!s.solvedGroup) {
                s.solvedGroup = nGroups;
              }
            })
            setLastSolvedGroup(nGroups);
          }
        }
      }

      setCoreSquares(squares);
    }
  }

  if (wordsEntered) {
    return (<Wall coreSquares={coreSquares} onSelect={clueSelected}/>);
  } else {
    return (<>
      <div>Enter clues then press 'Done'</div>
      <Wall coreSquares={coreSquares} onChange={clueChange} />
      <button type="button" onClick={finishedEnteringWords}>Done</button>
    </>
    );
  }
};

export default App;
