import { CoreSquare, makeCoreSquare } from './core-square';
import {  nSquares, groupSize, nGroups } from './constants';

import { DumbEncrypt } from './tools';
import { makeStorageKey, getStoredSquares } from './storage-tools';

export let squaresSetByURL: Array<CoreSquare> = [];
let cluesSetByURL = false;



function makeUrlParams(squares: Array<CoreSquare>) {

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

// KLUDGE - Use to set gloabls. Would be better called in the App.
function processURLParams() {

  const urlParams = new URLSearchParams(window.location.search);

  const urlClues = unpackURLClues(urlParams);
  const urlSolutionGroups = unpackURLSolutionGroups(urlParams);

  cluesSetByURL = false;
  if (urlClues && urlSolutionGroups) {
    cluesSetByURL = true;

    for (let i = 0; i < nSquares; ++i) {
      squaresSetByURL.push(
        makeCoreSquare(urlSolutionGroups[i], urlClues[i])
      );
    }
  } else if (!urlClues && !urlSolutionGroups) {
    for (let groupNo = 0; groupNo < nGroups; ++groupNo) {
      for (let n = 0; n < groupSize; ++n) {
        let s = makeCoreSquare(groupNo);
        squaresSetByURL.push(s);
      }
    }
  } else {
    console.log("window.location.search", window.location.search,
      "\nurlClue", urlClues,
      "\nurlSolutionGroups", urlSolutionGroups
    );

    alert("Could not understand URL parameters");
  }

}

function startingSetup() {
  processURLParams();

  let startingSquares = squaresSetByURL;
  if(cluesSetByURL) {
    const storedSquares = getStoredSquares(makeStorageKey(startingSquares));
    if(storedSquares) {
      startingSquares = storedSquares;
    }
  }

  return {
    cluesSetByURL: cluesSetByURL,
    startingSquares: startingSquares,
  }
}

export { startingSetup, makeUrlParams }

