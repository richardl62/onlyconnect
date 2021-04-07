import { GridSquare, makeGridSquare } from './grid-square';
import { nGroups, groupSize, nSquares } from './constants';
import { makeSquares as makeSquaresFromURL } from './url-tools';
import LocalStorage from "./local-storage";

function makeEmptySquares() {
  let squares = [];
  for (let groupNo = 0; groupNo < nGroups; ++groupNo) {
    for (let n = 0; n < groupSize; ++n) {
      squares.push(makeGridSquare(groupNo));
    }
  }

  return squares;
}

function sanityCheckStoredSquares(
  squares: any
) {
  if (squares.length !== nSquares) {
    alert("Recorded data appears incorrect");
    return false;
  }

  return true;
}

type StartingSetup = [Array<GridSquare>, boolean, LocalStorage | null];

function getURLsquares() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return makeSquaresFromURL(urlParams);
  } catch (err) {
    console.log(err);
    alert("URL appears incorrect");
  }

  return null;
}

function getLocalStorage(squares: Array<GridSquare>): LocalStorage | null {
  try {
    return LocalStorage.make(squares);
  } catch (err) {
    console.log(err);
    alert("Problem getting recorded data");
  }

  return null;
}


function startingSetup(): StartingSetup {
  let squares = getURLsquares();
  const cluesSet = Boolean(squares);

  let localStorage = squares && getLocalStorage(squares);

  if (localStorage) {
    const storedSquares = localStorage.get();
    if (storedSquares && sanityCheckStoredSquares(storedSquares)) {
      squares = storedSquares;
    }
  }

  squares = squares || makeEmptySquares();

  return [squares, cluesSet, localStorage]

}

export default startingSetup;
