import React from 'react';
import { GridSquare } from "./grid-square";
import { shuffleArray } from "./tools";
import { makeUrlParams } from "./url-tools";
import Wall from "./wall";

interface GridAndLinkProps {
  gridSquares : Array<GridSquare>;
};
function GridAndLink({gridSquares} : GridAndLinkProps ) {
  const shuffled = shuffleArray([...gridSquares]);
  const urlParams = makeUrlParams(shuffled);
  const url = window.location.href + "?" + urlParams.toString();
  return (
    <div>
      <Wall gridSquares={gridSquares} />
      <div>
        <span>Playable link: </span>
        <a href={url} target="blank">{url}</a>
      </div>
    </div>);
}

export default GridAndLink;