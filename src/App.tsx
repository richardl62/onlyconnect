import React from 'react';

import './App.css';

const Startingwords = [
  'a1', 'a2', 'a3', 'a4',
  'b1', 'b2', 'b3', 'b4',
  'c1', 'c2', 'c3', 'c4',
  'd1', 'd2', 'd3', 'd4',
];


// function XApp() {

//   const [words] = useState(Xwords);
  

//   function handleInputChange(event: any) {
//     const value = event.target.value;
//     const name = event.target.name;

//     console.log(event, value, name);
//   }

//   return (
//     <div className="wall">
//       {words.map((word, index) => (
//         <TextInput
//           style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//           onChangeText={text => onChangeText(text)}
//           value={value}
//         />
//       ))}
//     </div>
//   );
// }

  type AppState = {words: Array<string>}
class App extends React.Component<any, AppState> {
  constructor(props : any) {
    super(props);
    this.state = {words: Startingwords};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    const {name, value} = event.target;
    const index = parseInt(name);

    let newWords = [...this.state.words];
    newWords[index] = value;
    this.setState({words: newWords});
  }

  render() {
    return (
      <div className="wall">
        {this.state.words.map((word, index) => (
          <input type="text" 
            value={word} 
            key={index.toString()}
            name={index.toString()}
            onChange={this.handleChange} />
         ))}
      </div>
    );
  }
}
export default App;
