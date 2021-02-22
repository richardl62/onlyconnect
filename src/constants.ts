export const groupSize = 4;
export const nGroups = 4;
export const nSquares = groupSize * nGroups;

export function validSolvedGroup(group: number) {
  return group >= 1 && group <= nGroups;
}