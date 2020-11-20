import React, { FC } from 'react';


interface CoreSquare {
    clue: string;
    selected: boolean;
    badGuess: boolean;
    solvedGroup: number | null;
};

interface SquareProps {
    coreSquare: CoreSquare;
    index: number;
    onChange?: (index: number, word: string) => void;
    onSelect?: (index:number) => void;
}

const Square : FC<SquareProps> = ({coreSquare, index, onChange, onSelect}: SquareProps) => {
  
    if (onChange) {
        const onClueChange: (event: any) => void = (event) => {
            onChange(index, event.target.value)
        };

        return (
            <div className="square">
                <input type="text" value={coreSquare.clue} onChange={onClueChange} />
            </div>
            );
    }
    else if (onSelect) {
        const onClick: () => void = () => {
            onSelect(index)
        };
        
        let className="square";
        if(coreSquare.selected) {
            className += " selected";
        }
        if(coreSquare.badGuess) {
            className += " bad-guess";
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
    onChange?: (index: number, clue: string) => void,
    onSelect?: (index: number) => void,
};

const Wall: FC<WallProps> = ({ coreSquares, onChange, onSelect }: WallProps) => {
    return (
        <div className="wall">
            {coreSquares.map((cs: CoreSquare, index: number) => (
                <Square 
                    key={index.toString()} 
                    index={index}
                    coreSquare={cs}
                    onChange={onChange}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default Wall;
