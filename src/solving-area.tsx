import React from 'react';
import Wall, { CoreSquare } from './wall'


interface SolvingAreaProps {
    coreSquares: Array<CoreSquare>
    hasGuess: boolean;
    hasBadGuess: boolean;
    clueSelected: (index: number) => void,
    doClearGuess: ()=>void;
}

function SolvingArea({coreSquares, hasGuess, hasBadGuess, clueSelected, doClearGuess} : SolvingAreaProps) {

     const ClearGuessButton = () => (
        <button type="button" onClick={doClearGuess}>
            Clear guess
        </button>
    );

    return (
        <div className="solving-area">
            <Wall
                coreSquares={coreSquares}
                onSelect={clueSelected}
            />
            <div className="controls">
                <ClearGuessButton/>
                {hasBadGuess ? <div>Wrong!</div> : null}
            </div>
        </div>
    );
} 

export default SolvingArea;