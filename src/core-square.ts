

// Remove unsuitable characeters from clue
function filterClue(clue: string) {
  // For now at least just remove '~' as that has special meaning in
  // the URLs that are generated. 
  return clue.replace(/~/g, "");
}


// Warning: Change this interface is likely to break any recorded data
interface GridSquare {
  readonly answerGroup: number;
  clue: string;
  selected: boolean;
  badGuess: boolean;
  solvedGroup: number | null;
}


function makeGridSquare(answerGroup: number, clue: string = "") : GridSquare {
  return {
    answerGroup: answerGroup,
    clue: filterClue(clue),
    selected: false,
    badGuess: false,
    solvedGroup: null,
  }
}


export type {GridSquare};
export {makeGridSquare};
