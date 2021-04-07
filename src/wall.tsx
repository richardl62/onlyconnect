import React, { FC } from 'react';
import {validSolvedGroup} from './constants';

interface GridSquare {
    clue: string;
    selected: boolean;
    badGuess: boolean;
    solvedGroup: number | null;
};

interface SquareProps {
    gridSquare: GridSquare;
    index: number;
    onSelect?: (index:number) => void;
}

const Square : FC<SquareProps> = ({gridSquare, index, onSelect}: SquareProps) => {
  
    const onClick: () => void = () => {
        if(onSelect)
            onSelect(index)
    };

    let className = "square";
    if (gridSquare.selected) {
        className += " selected";
    }
    if (gridSquare.badGuess) {
        className += " bad-guess";
    }

    const solvedGroup = gridSquare.solvedGroup;
    if (solvedGroup !== null) {
        if(validSolvedGroup(solvedGroup)) {
            className += " group" + gridSquare.solvedGroup;
        } else {
            console.log("Invalid solved group for", gridSquare);
        }
    }

    return (
        <div
            onClick={onClick}
            className={className}
        >
            {gridSquare.clue}
        </div>
    );

}


interface WallProps {
    gridSquares: Array<GridSquare>,
    onSelect?: (index: number) => void,
};

const Wall: FC<WallProps> = ({ gridSquares, onSelect }: WallProps) => {
    return (
        <div className="wall">
            {gridSquares.map((cs: GridSquare, index: number) => (
                <Square 
                    key={index.toString()} 
                    index={index}
                    gridSquare={cs}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default Wall;
export type { GridSquare }