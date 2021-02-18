

// Remove unsuitable characeters from clue
function filterClue(clue: string) {
  // For now at least just remove '~' as that has special meaning in
  // the URLs that are generated. 
  return clue.replace(/~/g, "");
}


// Warning: Change this interface is likely to break any recorded data
interface CoreSquare {
  readonly answerGroup: number;
  clue: string;
  selected: boolean;
  badGuess: boolean;
  solvedGroup: number | null;
}


function makeCoreSquare(answerGroup: number, clue: string = "") : CoreSquare {
  return {
    answerGroup: answerGroup,
    clue: filterClue(clue),
    selected: false,
    badGuess: false,
    solvedGroup: null,
  }
}


export type {CoreSquare};
export {makeCoreSquare};
export const groupSize = 4;
export const nGroups = 4;
export const nSquares = groupSize * nGroups;

export function validSolvedGroup(group: number) {
  return group >= 1 && group <= nGroups;
}