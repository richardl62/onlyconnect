import React, { useState } from 'react';
import LocalStorage from "./local-storage";
import { makeGridStr, shuffleStr } from './strings';

function trimmed(words: Array<string>) {
    console.log("Pre-trimmed", words);

    let result: Array<string> = [];
    for (let i in words) {
        const t = words[i].trim();
        if (t) {
            result.push(t);
        }
    }

    return result;
}

function getCluesSpaceSeperated(text: string) {
    return trimmed(text.split(/[,\s]/));
}

// Find non-empty clues separated by commas or newlines
function getCluesCommaSeperated(text: string) {
    return trimmed(text.split(/[,\n]/));
}

interface SettingAreaProps {
    recordClues: (clues: Array<string> | null) => void;
}
function SettingArea({ recordClues }: SettingAreaProps) {
    const [recordedText, setRecordedText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    function textAreaChange(event: any) {
        setRecordedText(event.target.value);
    }

    function onDone() {
        setErrorMessage("");

        const spaceSeparated = getCluesSpaceSeperated(recordedText);
        console.log("Space separated", spaceSeparated);
        if (spaceSeparated.length === 16) {
            recordClues(spaceSeparated);
            return;
        }

        const commaSeparated = getCluesCommaSeperated(recordedText);
        console.log("Comma separated", commaSeparated);

        if (commaSeparated.length === 16) {
            recordClues(commaSeparated);
            return;
        }

        setErrorMessage(`Did not find 16 clues: 
            ${spaceSeparated.length} found with space seperation.
            ${commaSeparated.length} found with comma-seperation.`
        );

        recordClues(null);


    }

    const ErrorMessage = () => {
        if (errorMessage) {
            return <div>{"Error: " + errorMessage}</div>
        }
        return null;
    }

    return (
        <div className="setting-area" >
            <div>
                <span>{`Enter clues then ${makeGridStr.toLowerCase()}`}</span>
                <span>{` and ${shuffleStr.toLowerCase()}.`}</span>
                <br/>
                <span>Clues can be single words, or words and phrases seperated by commas.</span>
            </div>
    
            <textarea
                cols={50}
                rows={4}
                onChange={textAreaChange}
            />

            <div className="setting-area-buttons">
                <button className="done-button" onClick={onDone}>{makeGridStr}</button>
                <button className="clear-stored-solutions-button" onClick={LocalStorage.clearAll}>
                    Clear stored solutions
            </button>
            </div>
            <ErrorMessage />
        </div>
    );
}

export default SettingArea;