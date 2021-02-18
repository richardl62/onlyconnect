

// Remove unsuitable characeters from clue
function filterClue(clue: string) {
  // For now at least just remove '~' as that has special meaning in
  // the URLs that are generated. 
  return clue.replace(/~/g, "");
}

class CoreSquare {
  readonly answerGroup: number;
  readonly originalIndex: number | null;
  clue: string;
  selected = false;
  badGuess = false;
  solvedGroup: number | null = null;
  constructor(answerGroup: number, originalIndex: number | null = null, clue = "") {
    this.answerGroup = answerGroup;
    this.originalIndex = originalIndex;
    this.clue = filterClue(clue);
  }
}


export {CoreSquare};
export const groupSize = 4;
export const nGroups = 4;
export const nSquares = groupSize * nGroups;

export function validSolvedGroup(group: number) {
  return group >= 1 && group <= nGroups;
}