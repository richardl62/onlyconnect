import { CoreSquare, nSquares, groupSize, nGroups } from './basics';
import { DumbEncrypt } from './tools';

const LocalStorageKey = "solvedGroups";

let squaresSetByURL: Array<CoreSquare> = [];
let cluesSetByURL = false;

let startingClues: Array<string>;

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
        new CoreSquare(urlSolutionGroups[i], i, urlClues[i])
      );
    }
  }
  else {
    if (urlParams.toString()) {
      alert("Could not understand URL parameters");
    }

    for (let groupNo = 0; groupNo < nGroups; ++groupNo) {
      for (let n = 0; n < groupSize; ++n) {
        let s = new CoreSquare(groupNo);
        squaresSetByURL.push(s);

        // To help with testing
        if (startingClues) {
          s.clue = startingClues[n + groupNo * groupSize];
        }
      }
    }
  }
}

function storeSquares(squares: Array<CoreSquare> | null) {

  if(squares === null) {
    localStorage.removeItem(LocalStorageKey);
  } {
    const stringified = JSON.stringify(squares);
    //console.log(stringified);
    localStorage.setItem(LocalStorageKey, stringified);
  }
}

function doGetStoredSquares() : Array<CoreSquare> | null {
    const rawStorage = localStorage.getItem(LocalStorageKey);
    console.log("rawStorage", rawStorage);

    if(rawStorage === null) {
      return null;
    }

    let squares: Array<any> = JSON.parse(rawStorage);
    if (!squares) {
      return null;
    }
    
    if (squares.length !== nSquares) {
      throw new Error("Stored array does not have the expected length");
    }

    // KLUDGE? 'Convert' the objects into classes
    squares.forEach(sq =>
      Object.setPrototypeOf(sq, CoreSquare.prototype)
    );

    return squares;

}

function getStoredSquares() {
  let result = null;
  try {
    result = doGetStoredSquares();
  } catch {
    alert("Error reading stored data");
  }

  return result;
}

function clearAllStorage() {
  localStorage.clear();
}

function startingSetup() {
  processURLParams();

  const storedSquares = getStoredSquares();
  return {
    cluesSetByURL: cluesSetByURL,
    startingSquares: storedSquares || squaresSetByURL,
  }
}

export { startingSetup, makeUrlParams, storeSquares, clearAllStorage }

