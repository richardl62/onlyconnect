import { CoreSquare } from './core-square';
import { nSquares, validSolvedGroup } from './constants';


// computing every time is inefficient.
function makeStorageKey(squares: Array<CoreSquare>) {
  const key = squares.map(sq => sq.clue).join();
  return key;
}

function storeSquares(key: string, squares: Array<CoreSquare> | null) {
  if (squares === null) {
    localStorage.removeItem(key);
  } else {
    const stringified = JSON.stringify(squares);
    //console.log(stringified);
    localStorage.setItem(key, stringified);
  }
}

function checkSolvedGroup(sq: CoreSquare) {
  if (sq.solvedGroup !== null && !validSolvedGroup(sq.solvedGroup)) {
    throw new Error("Bad solved group in recorded square");
  }
}

function doGetStoredSquares(key: string): Array<CoreSquare> | null {
  const rawStorage = localStorage.getItem(key);

  if (rawStorage === null) {
    return null;
  }

  let squares: Array<any> = JSON.parse(rawStorage);
  if (!squares) {
    return null;
  }

  if (squares.length !== nSquares) {
    throw new Error("Stored array does not have the expected length");
  }

  //Basic sanity check
  squares.forEach(sq => checkSolvedGroup(sq));

  return squares;
}

function getStoredSquares(key: string) {
  let result = null;
  try {
    result = doGetStoredSquares(key);
  } catch {
    alert("Error reading stored data");
  }

  return result;
}

function clearAllStorage() {
  localStorage.clear();
}


export {storeSquares, getStoredSquares, clearAllStorage, makeStorageKey}