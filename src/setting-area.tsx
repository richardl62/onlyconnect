import React, { useState } from 'react';
import { clearAllStorage } from "./storage-tools";

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


    }

    const ErrorMessage = () => {
        if (errorMessage) {
            return <div>{"Error: " + errorMessage}</div>
        }
        return null;
    }

    return (
        <div className="setting-area" >
            <p>Enter clues.  These can be single words, or words and phrases seperated by commas</p>
            <textarea
                cols={50}
                rows={4}
                onChange={textAreaChange}
            />

            <div className="setting-area-buttons">
                <button className="done-button" onClick={onDone}>Done</button>
                <button className="clear-stored-solutions-button" onClick={clearAllStorage}>
                    Clear stored solutions
            </button>
            </div>
            <ErrorMessage />
        </div>
    );
}

export default SettingArea;