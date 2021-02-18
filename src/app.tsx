// TO DO:  Tidy this code so it less of a dogs dinner.
import React, { FC, useEffect, useState } from 'react';
import { CoreSquare, makeCoreSquare, nGroups, groupSize } from './basics';
import SolvingArea from './solving-area'
import SettingArea from './setting-area'
import { shuffleArray } from './tools';

import Wall from './wall';
import {startingSetup, makeUrlParams, storeSquares } from './url-and-storage-tools';
import './App.css';


function groupFromIndex(index: number) {
  return Math.floor(index / groupSize) + 1;
}

const startingSetupData = startingSetup();
let { startingSquares, cluesSetByURL } = startingSetupData;

function lastSolvedGroup(squares: Array<CoreSquare>) {
  for(let group = nGroups; group > 0; --group) {
      if(squares.find(s => s && s.solvedGroup === group)) {
        return group;
      }
  }
  return 0;
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

  const [coreSquares, setCoreSquares] = useState(startingSquares);
  const [cluesEntered, setCluesEntered] = useState(false);

  useEffect(() => { document.title = "OnlyConnect" });

  const cluesSet = (clues: Array<string>) => {
    const coreSquares_ = clues.map((clue, index) => {
      const group = Math.floor(index / 4);
      return makeCoreSquare(group, clue);
    });
    setCoreSquares(coreSquares_);
    setCluesEntered(true);
  }


  const clueSelected: (index: number) => void = (index) => {

    // Ignore squares that have already been solved.
    if (cluesSetByURL && !coreSquares[index].solvedGroup) {
      let squares = [...coreSquares];
      squares.forEach(s => s.badGuess = false);
      squares[index].selected = !squares[index].selected;

      let selected = squares.filter(cs => cs.selected);
      if (selected.find(s => s.solvedGroup)) {
        throw new Error("Selected square is already solved");
      }

      if (selected.length === groupSize) {
        selected.forEach(s => s.selected = false);

        if (selected.every(s => s.answerGroup === selected[0].answerGroup)) {
          // The selected sqaures are in the same group, so the group has been solved.

          const solvedGroup = lastSolvedGroup(squares) + 1;


          selected.forEach(s => s.solvedGroup = solvedGroup);
          positionSquaresInSolvedGroup(squares, solvedGroup);

          // If the last but one group has been solve, then the last group 
          // must also be solved.
          if (solvedGroup + 1 === nGroups) {
            squares.forEach(s => {
              if (!s.solvedGroup) {
                s.solvedGroup = nGroups;
              }
            })


          }
        } else {
          selected.forEach(s => s.badGuess = true);
        }
      }
      storeSquares(squares);
      setCoreSquares(squares);
    }
  }

  const hasBadGuess = Boolean(coreSquares.find(s => s.badGuess));

  const doClearGuess = () => {
    let newSquares = [...coreSquares];
    newSquares.forEach(s => {
      s.badGuess = false;
      s.selected = false;
    });
    setCoreSquares(newSquares);
  }

  const doRestart = () => {
    storeSquares(null);
    window.location.reload();
  }

  if (cluesSetByURL) {
    return (<SolvingArea
      coreSquares={coreSquares}
      hasBadGuess={hasBadGuess}
      clueSelected={clueSelected}
      doClearGuess={doClearGuess}
      doRestart={doRestart}
    />);
  }

  const ResultArea = () => {
    const shuffled = shuffleArray([...coreSquares]);
    const urlParams = makeUrlParams(shuffled);
    const url = window.location.href + "?" + urlParams.toString();
    return (
      <div>
        <Wall coreSquares={coreSquares} />
        <div> <a href={url} target="blank">Randomised (Playable)</a> </div>
      </div>);
  }

  const recordClues = (clues: Array<string> | null) => {
    if (clues) {
      cluesSet(clues);
    } else {
      setCluesEntered(false);
    }
  }

  return (
    <div className="setting-area">
      <SettingArea recordClues={recordClues} />
      {cluesEntered ? <ResultArea /> : null}
    </div>
  )
};

export default App;
