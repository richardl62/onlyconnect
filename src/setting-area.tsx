import React from 'react';
import Wall, { CoreSquare } from './wall';

interface SettingAreaProps {
    coreSquares: Array<CoreSquare>;
    clueChange: (index: number, word: string) => void;
    doneEnteringWords: () => void;
};

function SettingArea({coreSquares, clueChange, doneEnteringWords}: SettingAreaProps)
{
    
    return (<>
        <Wall coreSquares={coreSquares}
            onChange={clueChange}
        />

        <button type="button" onClick={doneEnteringWords}>Done</button>

    </>);
}

export default SettingArea;