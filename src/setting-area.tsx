import React, {useState} from 'react';


function removeLastIfEmpty(words: Array<string>)
{
    if(words[words.length-1] === "") {
        words.pop();
    }
    return words;
}

function getWords(text: string) {
    const commaSep = text.split(/,\s*/);
    if(commaSep.length > 1) {
        return removeLastIfEmpty(commaSep);
    }
    return removeLastIfEmpty(text.split(/\s+/));

}

function SettingArea()
{
    const [recordedText, setRecordedText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    function textAreaChange(event: any) {
        setRecordedText(event.target.value);
    }

    function onDone() {
        const words = getWords(recordedText);
        if(words.length === 3) {
            console.log("Done:", words);
            setErrorMessage("");
        } else {
            let message = words.length + " clues found:";
            words.forEach(word => message += ` '${word}',`);
            setErrorMessage(message);
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
            <textarea  onChange={textAreaChange}/>
        </div>
        <button onClick={onDone}>Done</button>
        <ErrorMessage/>
    </>);
}

export default SettingArea;