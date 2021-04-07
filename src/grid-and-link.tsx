import React from 'react';
import { GridSquare } from "./grid-square";
import { shuffleStr } from './strings';
import { makeUrlParams } from "./url-tools";
import Wall from "./wall";

interface GridAndLinkProps {
  gridSquares : Array<GridSquare>;
  shuffle: () => void;
};
function GridAndLink({gridSquares, shuffle} : GridAndLinkProps ) {
  const urlParams = makeUrlParams(gridSquares);
  const url = window.location.href + "?" + urlParams.toString();

  return (
    <div>
      <Wall gridSquares={gridSquares} />
      <div>
        <button type='button' onClick={shuffle}>{shuffleStr}</button>
      </div>
      <div>
        <span>Playable link </span>
        <a href={url} target="blank">here</a>
      </div>
    </div>);
}

export default GridAndLink;