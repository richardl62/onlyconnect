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

     const clearGuessButton = (
        <button type="button" onClick={doClearGuess}>
            Clear guess
        </button>
    );

    return (
        <>
            <Wall
                coreSquares={coreSquares}
                onSelect={clueSelected}
            />
            <div className="controls">
                {hasGuess ? clearGuessButton : null}
                {hasBadGuess ? <div>Wrong!</div> : null}
            </div>
        </>
    );
} 

export default SolvingArea;