import React, { FC } from 'react';


interface CoreSquare {
    clue: string;
    index: number;
    selected: boolean;
    solvedGroup: number | null;
};

interface SquareProps {
    readonly coreSquare: CoreSquare;
    onChange?: (index: number, word: string) => void;
    onSelect?: (index:number) => void;
}

const Square : FC<SquareProps> = ({coreSquare, onChange, onSelect}: SquareProps) => {
  
    if (onChange) {
        const onClueChange: (event: any) => void = (event) => {
            onChange(coreSquare.index, event.target.value)
        };

        return (<input type="text" value={coreSquare.clue} onChange={onClueChange} />);
    }
    else if (onSelect) {
        const onClick: () => void = () => {
            onSelect(coreSquare.index)
        };
        
        let className="square";
        if(coreSquare.selected) {
            className += " selected";
        }
        if(coreSquare.solvedGroup) {
            className += " group" + coreSquare.solvedGroup;
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
    else {
        throw Error("Oops");
    }
}


interface WallProps {
    coreSquares: Array<CoreSquare>,
    clueChange?: (index: number, clue: string) => void,
    clueSelected?: (index: number) => void,
};

const Wall: FC<WallProps> = ({ coreSquares, clueChange, clueSelected }: WallProps) => {
    return (
        <div className="wall">
            {coreSquares.map((cs: CoreSquare, index: number) => (
                <Square key={index.toString()} coreSquare={cs}
                    onChange={clueChange}
                    onSelect={clueSelected}
                />
            ))}
        </div>
    );
};

export default Wall;