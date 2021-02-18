import React, { FC } from 'react';
import {validSolvedGroup} from './basics';

interface CoreSquare {
    clue: string;
    selected: boolean;
    badGuess: boolean;
    solvedGroup: number | null;
};

interface SquareProps {
    coreSquare: CoreSquare;
    index: number;
    onSelect?: (index:number) => void;
}

const Square : FC<SquareProps> = ({coreSquare, index, onSelect}: SquareProps) => {
  
    const onClick: () => void = () => {
        if(onSelect)
            onSelect(index)
    };

    let className = "square";
    if (coreSquare.selected) {
        className += " selected";
    }
    if (coreSquare.badGuess) {
        className += " bad-guess";
    }

    const solvedGroup = coreSquare.solvedGroup;
    if (solvedGroup !== null) {
        if(validSolvedGroup(solvedGroup)) {
            className += " group" + coreSquare.solvedGroup;
        } else {
            console.log("Invalid solved group for", coreSquare);
        }
    }

    return (
        <div
            onClick={onClick}
            className={className}
        >
            {coreSquare.clue}
        </div>
    );

}


interface WallProps {
    coreSquares: Array<CoreSquare>,
    onSelect?: (index: number) => void,
};

const Wall: FC<WallProps> = ({ coreSquares, onSelect }: WallProps) => {
    return (
        <div className="wall">
            {coreSquares.map((cs: CoreSquare, index: number) => (
                <Square 
                    key={index.toString()} 
                    index={index}
                    coreSquare={cs}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default Wall;
export type { CoreSquare }