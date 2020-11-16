import React, { FC } from 'react';


interface ClueProps {
    clue: string;
    index: number;
    onChange?: (index: number, word: string) => void;
    onSelect?: (index:number) => void;
}

const Clue : FC<ClueProps> = ({clue, index, onChange, onSelect}: ClueProps) => {
  
    if (onChange) {
        const onClueChange: (event: any) => void = (event) => {
            onChange(index, event.target.value)
        };

        return (<input type="text" value={clue} onChange={onClueChange} />);
    }
    else if (onSelect) {
        const onClick: () => void = () => {
            onSelect(index)
        };
        return (<div onClick={onClick}>{clue}</div>);
    }
    else {
        throw Error("Oops");
    }
}

export { Clue };