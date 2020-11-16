import React, { FC } from 'react';


interface ClueProps {
    clue: string;
    index: number;
    onChange: (index: number, word: string) => void;
}

const Clue : FC<ClueProps> = ({clue, index, onChange}: ClueProps) => {
  
    const onClueChange: (event: any) => void = (event) => {
        onChange(index, event.target.value)
    };

  return (<input type="text" value={clue} onChange={onClueChange}/>);
}

export { Clue };