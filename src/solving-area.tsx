import React from 'react';
import Wall, { GridSquare } from './wall'


interface SolvingAreaProps {
    gridSquares: Array<GridSquare>
    hasBadGuess: boolean;
    clueSelected: (index: number) => void,
    doClearGuess: ()=>void;
    doRestart: ()=>void;
}

function SolvingArea({gridSquares, hasBadGuess, clueSelected, doClearGuess, doRestart} : SolvingAreaProps) {

     const ClearGuessButton = () => (
        <button type="button" onClick={doClearGuess}>
            Clear guess
        </button>
    );
    const RestartButton = () => (
        <button className="restart-button" type="button" onClick={doRestart}>
            Restart
        </button>
    );

    return (
        <div className="solving-area">
            <Wall
                gridSquares={gridSquares}
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