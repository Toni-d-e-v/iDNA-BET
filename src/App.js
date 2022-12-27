import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Page from './components/page.js';
function App() {
  let Match1 = [
    new Date("2023-01-01 00:00:00"),
    "Team 1",
    "Team 2",
    "Team 1 Address",
    "Team 2 Address"
 ];
  let Match2 = [
    new Date("2023-01-01 00:00:00"),
    "Team 3",
    "Team 4",
    "Team 3 Address",
    "Team 4 Address"
  ];
  // state to set matches in array
  const [matches] = React.useState([Match1, Match2]);

  // page what is currently displayed
  const [page, setPage] = React.useState(0);

  if (page === 0) {
    // loop through matches and display buttons for each match with onClick to set page to match page
    return (
      <div className="App">
        <h1>Matches</h1>
        {matches.map((match, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {match[1]} vs {match[2]}

          </button>
        ))}
      </div>
    );      
  }
  if (page > 0) {
    // display match page
    return (
      <div className="App">
        <Page data={matches[page - 1]} />
      </div>
    );
  }

}



export default App;
