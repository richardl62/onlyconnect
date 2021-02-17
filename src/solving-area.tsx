import React from 'react';
import Wall, { CoreSquare } from './wall'


interface SolvingAreaProps {
    coreSquares: Array<CoreSquare>
    hasBadGuess: boolean;
    clueSelected: (index: number) => void,
    doClearGuess: ()=>void;
    doRestart: ()=>void;
}

function SolvingArea({coreSquares, hasBadGuess, clueSelected, doClearGuess, doRestart} : SolvingAreaProps) {

     const ClearGuessButton = () => (
        <button type="button" onClick={doClearGuess}>
            Clear guess
        </button>
    );
    const RestartButton = () => (
        <button type="button" onClick={doRestart}>
            Restart
        </button>
    );

    return (
        <div className="solving-area">
            <Wall
                coreSquares={coreSquares}
                onSelect={clueSelected}
            />
            <div className="solving-controls">
                <div>
                    <ClearGuessButton/>
                    {hasBadGuess ? <div>Wrong!</div> : null}
                </div>
                <RestartButton/>
            </div>
        </div>
    );
} 

export default SolvingArea;