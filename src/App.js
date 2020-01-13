import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './gen8ou-1825.json';

let pokemonNames = Array.from(Object.keys(data.data));
let pokemonData = [];
pokemonNames.forEach(name => {
    let item = Object.assign({}, data.data[name], { name });
    pokemonData.push(item);
});

function App() {
  let rows = pokemonData.map((p, i) => {
    return (<tr>
      <td>{i + 1}</td>
      <td>{p.name}</td>
      <td>{p.usage}</td>
    </tr>);
  });

  return (
    <div className="App">
      <table>
        <thead>
          <th>Rank</th>
          <th>Pokemon</th>
          <th>Usage</th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default App;
