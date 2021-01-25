import React, {useState} from 'react';


function removeLastIfEmpty(clues: Array<string>)
{
    if(clues[clues.length-1] === "") {
        clues.pop();
    }
    return clues;
}

function getClues(text: string) {
    const commaSep = text.split(/,\s*/);
    if(commaSep.length > 1) {
        return removeLastIfEmpty(commaSep);
    }
    return removeLastIfEmpty(text.split(/\s+/));

}

interface SettingAreaProps {
    recordClues: (clues: Array<string> | null) => void;
}
function SettingArea({recordClues} : SettingAreaProps)
{
    const [recordedText, setRecordedText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    function textAreaChange(event: any) {
        setRecordedText(event.target.value);
    }

    function onDone() {
        const clues = getClues(recordedText);
        if(clues.length === 16) {
            console.log("Done:", clues);
            recordClues(clues);
            setErrorMessage("");
        } else {
            let message = clues.length + " clues found:";
            clues.forEach(word => message += ` '${word}',`);
            setErrorMessage(message);
            recordClues(null);
        }
    }

    const ErrorMessage = () => {
        if(errorMessage) {
            return <div>{"Error: " + errorMessage}</div>
        }
        return null;
    }
    
    return (<>
        <div>
            <p>Enter clues.  These can be single words, or words and phrases seperated by commas</p>
            <textarea  
                cols={50}
                rows={4}
                onChange={textAreaChange}
            />
        </div>
        <button onClick={onDone}>Done</button>
        <ErrorMessage/>
    </>);
}

export default SettingArea;