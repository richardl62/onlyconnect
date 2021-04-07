import { GridSquare, makeGridSquare } from './grid-square';
import {  nSquares, groupSize, nGroups } from './constants';
import { DumbEncrypt } from './tools';


function makeUrlParams(squares: Array<GridSquare>) {

  let urlParams = new URLSearchParams();

  let clues = "";
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
  if (urlClues) {
    const clues = urlClues.split("~");

    if (clues.length === nSquares) {
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

function makeSquares(urlParams: URLSearchParams) : Array<GridSquare> | null {

  const urlClues = unpackURLClues(urlParams);
  const urlSolutionGroups = unpackURLSolutionGroups(urlParams);


  if (Boolean(urlClues) !== Boolean(urlSolutionGroups)) {
    console.log("window.location.search", window.location.search,
      "\nurlClue", urlClues,
      "\nurlSolutionGroups", urlSolutionGroups
    );

    throw new Error("Could not understand URL parameters");
  }

  if (urlClues && urlSolutionGroups) {
    let squares = [];
    for (let i = 0; i < nSquares; ++i) {
      squares.push(makeGridSquare(urlSolutionGroups[i], urlClues[i]));
    }
    return squares;
  } else {
    return null;
  } 

}

export { makeSquares, makeUrlParams }

