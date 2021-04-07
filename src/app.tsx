// TO DO:  Tidy this code so it less of a dogs dinner.
import React, { FC, useEffect, useState } from 'react';
import { GridSquare, makeGridSquare } from './core-square';
import { nGroups, groupSize } from './constants';
import { shuffleArray } from './tools';

import SolvingArea from './solving-area'
import SettingArea from './setting-area'
import Wall from './wall';

import {makeUrlParams } from './url-tools';
import startingSetup from './starting-setup';

import './App.css';

function groupFromIndex(index: number) {
  return Math.floor(index / groupSize) + 1;
}

function lastSolvedGroup(squares: Array<GridSquare>) {
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
function sanityCheckSolvedGroups(squares: Array<GridSquare>, groupBeingProcessed: number) {
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
function positionSquaresInSolvedGroup(squares: Array<GridSquare>, groupNo: number) {

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

const [startingSquares, cluesSetFromStart, localStorage ] = startingSetup();

const App: FC<{}> = () => {

  const [gridSquares, setGridSquares] = useState(startingSquares);
  const [cluesEntered, setCluesEntered] = useState(false);

  useEffect(() => { document.title = "OnlyConnect" });

  const cluesSet = (clues: Array<string>) => {
    const gridSquares_ = clues.map((clue, index) => {
      const group = Math.floor(index / 4);
      return makeGridSquare(group, clue);
    });
    setGridSquares(gridSquares_);
    setCluesEntered(true);
  }


  const clueSelected: (index: number) => void = (index) => {
    // Ignore squares that have already been solved.
    if (cluesSetFromStart && !gridSquares[index].solvedGroup) {

      let squares = [...gridSquares];
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


      localStorage!.set(squares);
      setGridSquares(squares);
    }
  }

  const hasBadGuess = Boolean(gridSquares.find(s => s.badGuess));

  const doClearGuess = () => {
    let newSquares = [...gridSquares];
    newSquares.forEach(s => {
      s.badGuess = false;
      s.selected = false;
    });
    setGridSquares(newSquares);
  }

  const doRestart = () => {
    localStorage!.set(null);
    window.location.reload();
  }

  if (cluesSetFromStart) {
    return (<SolvingArea
      gridSquares={gridSquares}
      hasBadGuess={hasBadGuess}
      clueSelected={clueSelected}
      doClearGuess={doClearGuess}
      doRestart={doRestart}
    />);
  }

  const ResultArea = () => {
    const shuffled = shuffleArray([...gridSquares]);
    const urlParams = makeUrlParams(shuffled);
    const url = window.location.href + "?" + urlParams.toString();
    return (
      <div>
        <Wall gridSquares={gridSquares} />
        <div>
          <a href={url} target="blank">Randomised (Playable)</a>
          {/* <span>Playable link: </span>
          <a href={url} target="blank">{url}</a> */}
        </div>
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
