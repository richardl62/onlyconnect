// TO DO:  Tidy this code so it less of a dogs dinner.
import React, { FC, useEffect, useState} from 'react';
import SolvingArea from './solving-area'
import SettingArea from './setting-area'
import { shuffleArray, DumbEncrypt } from './tools';
import './App.css';
import Wall from './wall';

// Remove unsuitable characeters from clue
function filterClue(clue: string) {
  // For now at least just remove '~' as that has special meaning in
  // the URLs that are generated. 
  return clue.replace(/~/g, "");
}

let startingClues: Array<string>;
// startingClues = [
//   'a1', 'a2', 'a3', 'a4',
//   'b1', 'b2', 'b3', 'b4',
//   'c1', 'c2', 'c3', 'c4',
//   'd1 longlonglong', 'd2', 'd3', 'd4',
// ];

const groupSize = 4;
const nGroups = 4;
const nSquares = groupSize * nGroups;

function groupFromIndex(index: number) {
  return Math.floor(index/groupSize) + 1;
}

class CoreSquare {
  readonly answerGroup: number;
  clue: string;
  selected = false;
  badGuess = false; 
  solvedGroup: number | null = null;

  constructor(answerGroup: number, clue="") {
    this.answerGroup = answerGroup;
    this.clue = filterClue(clue);
  }
};


function makeUrlParams(squares: Array<CoreSquare>) {

  let urlParams = new URLSearchParams();

  let clues="";
  squares.forEach(s => clues += s.clue + "~");
  urlParams.append("clues", clues.slice(0, -1));

  let key = 0;
  squares.forEach(s => key = key * nGroups + s.answerGroup);
  const encrypted = DumbEncrypt.doInt(key);
  urlParams.append("key", encrypted.toString());
  return urlParams;
}

function unpackURLClues(urlParams: URLSearchParams) {

  const urlClues = urlParams.get("clues");
  if(urlClues) {
    const clues = urlClues.split("~");
    
    if(clues.length === nSquares) {
      return clues;
    } else {
      console.log("Did not find the expected number of clues", clues);
    }
  }
  return null;
}

function unpackURLSolutionGroups(urlParams: URLSearchParams) {
  let values: Array<number> | null = null;

  const urlKey = urlParams.get("key");
  if (urlKey) {

    let combinedValues = DumbEncrypt.undoInt(parseInt(urlKey));

    values = [];
    for (let i = 0; i < nSquares; ++i) {
      const value = combinedValues % nGroups;
      combinedValues = (combinedValues - value) / nGroups;
      values.push(value);
    }
    values.reverse();

    // Check the values.  There should be groupSize values for each group.
    for (let g = 0; values && g < nGroups; ++g) {
      const matched = values.filter(k => k === g);
      if (matched.length !== groupSize) {
        console.log("Cannot interpret urlKey", urlKey);
        values = null;
      }
    }
  }

  return values;
}

let startingSquares: Array<CoreSquare> = [];
let cluesSetByURL: boolean;

// KLUDGE - Use to set gloabls. Would be better called in the App.
function processURLParams() {

    const urlParams = new URLSearchParams(window.location.search);
    
    const urlClues = unpackURLClues(urlParams);
    const urlSolutionGroups = unpackURLSolutionGroups(urlParams);
    
    cluesSetByURL = false;
    if(urlClues && urlSolutionGroups) {
      cluesSetByURL = true;
      
      for(let i = 0; i < nSquares; ++i) {
        startingSquares.push(
          new CoreSquare(urlSolutionGroups[i], urlClues[i])
        );
      }
    }
    else {
      if(urlParams.toString()) {
        alert("Could not understand URL parameters");
      }

      for (let groupNo = 0; groupNo < nGroups; ++groupNo) {
        for (let n = 0; n < groupSize; ++n) {
          let s = new CoreSquare(groupNo);
          startingSquares.push(s);

          // To help with testing
          if (startingClues) {
            s.clue = startingClues[n + groupNo * groupSize];
          }
        }
      }
    }
}

processURLParams();


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

  const [lastSolvedGroup, setLastSolvedGroup] = useState(0);
  useEffect(()=>{document.title = "OnlyConnect"});

  
  const cluesSet = (clues: Array<string>) => {
    const coreSquares_ = clues.map((clue, index) => {
      const group = Math.floor(index/4);
      return new CoreSquare(group, clue);
    }); 
    setCoreSquares(coreSquares_);
    setCluesEntered(true);
  }


  const clueSelected: (index: number) => void = (index) => {

    // Ignore squares that have already been solved.
    if(cluesSetByURL && !coreSquares[index].solvedGroup) {
      let squares = [...coreSquares];
      squares.forEach(s => s.badGuess = false);
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
        } else {
          selected.forEach(s => s.badGuess = true);
        }
      }

      setCoreSquares(squares);
    }
  }

  const hasGuess = Boolean(coreSquares.find(s => (s.selected || s.badGuess)));
  const hasBadGuess = Boolean(coreSquares.find(s => s.badGuess));

  const doClearGuess = () => {
    let newSquares = [...coreSquares];
    newSquares.forEach(s => {
      s.badGuess = false;
      s.selected = false;
    });
    setCoreSquares(newSquares);
  }

  if(cluesSetByURL) {
    return (<SolvingArea
      coreSquares={coreSquares} 
      hasGuess={hasGuess}
      hasBadGuess={hasBadGuess}
      clueSelected={clueSelected}
      doClearGuess={doClearGuess}
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
      if(clues) {
        cluesSet(clues);
      } else {
        setCluesEntered(false);
      }
  }

  return (
    <div className="onlyconnect">
      <SettingArea recordClues={recordClues} />
      {cluesEntered ? <ResultArea/> : null}
    </div>
  )
};

export default App;
