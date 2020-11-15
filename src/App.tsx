import React, { FC, useState} from 'react';

import './App.css';

const Startingwords = [
  'a1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'longlonglong', 'd2', 'd3', 'd4',
];


interface AppProps {};

const App: FC<AppProps> = () => {

    const [words, setWords] = useState(Startingwords);

    const handleChange: (event: any) => void = (event) => {
      const {name, value} = event.target;
      const index = parseInt(name);

      let newWords = [...words];
      newWords[index] = value;
      setWords(newWords);
    }
    return (
      <div className="wall">
        {words.map((word, index) => (
          <input type="text" 
            value={word} 
            key={index.toString()}
            name={index.toString()}
            onChange={handleChange} 
          />
         ))}
      </div>
    );

}
export default App;
