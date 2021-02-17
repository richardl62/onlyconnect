import { CoreSquare, nSquares, groupSize, nGroups } from './basics';
import { DumbEncrypt } from './tools';

const SolvedGroupKey = "solvedGroups";

let startingSquares: Array<CoreSquare> = [];
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
      startingSquares.push(
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
        startingSquares.push(s);

        // To help with testing
        if (startingClues) {
          s.clue = startingClues[n + groupNo * groupSize];
        }
      }
    }
  }
}

// function processSolveGroups(solvedGroups : Array<any>) {
//     console.log(solvedGroups);
//     if(solvedGroups[0] !== null) {
//       for(let i = 0; i < 4; ++i) {
//         const index = solvedGroups[i];
//         let sq = startingSquares[index];
//         if(sq === undefined) {
//           // The index is out of range or somehow currupt.
//           throw new Error("Unexpected value in local history");
//         }
//         sq.solvedGroup = 0;
//       }
//       positionSquaresInSolvedGroup(startingSquares, 0);
//     }
//   }


function getSolvedGroupsFromLocalStorage(): Array<number | null> | null {

  const solvedGroupsString = localStorage.getItem(SolvedGroupKey);
  if (solvedGroupsString) {
    let solvedGroups = JSON.parse(solvedGroupsString);
    if (solvedGroups.length === nSquares) { // basic sanity check
      return solvedGroups;
    }
    console.log("Problem reading solved groups from local history");
  }

  return null;
}

function startingSetup() {
  processURLParams();
  return {
    cluesSetByURL: cluesSetByURL,
    startingSquares: startingSquares,
    solvedGroups: cluesSetByURL && getSolvedGroupsFromLocalStorage(),
  }
}

function recordSolvedGroupsInLocalHistory(squares: Array<CoreSquare>) {
  const solvedGroups = squares.map((sq, index) => {
    if (typeof sq.originalIndex !== "number") {
      throw new Error("Original index is not set");
    }
    return sq.solvedGroup && sq.originalIndex;
  });
  console.log(solvedGroups);
  localStorage.setItem(SolvedGroupKey, JSON.stringify(solvedGroups));
}

function resetLocalStorage() {
  localStorage.clear();
}

export {
  startingSetup, makeUrlParams, recordSolvedGroupsInLocalHistory,
  resetLocalStorage
}

