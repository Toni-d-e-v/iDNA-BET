import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import './Menu.css';

import Page from './page.js';
function Menu() {
  let Match1 = [
    new Date("2023-01-01 00:00:00"),
    "Team 1",
    "Team 2",
    "Team 1 Address",
    "Team 2 Address",
    "INFO"
 ];
  let Match2 = [
    new Date("2023-01-01 00:00:00"),
    "Team 3",
    "Team 4",
    "Team 3 Address",
    "Team 4 Address",
    "INFO"
  ];
  const [matches] = React.useState([Match1, Match2]);
  const [page, setPage] = React.useState(0);
  const renderMatches = () => {
    return (
        <div
        className='CardGrid'
       >
       {matches.map((match, index) => (
       <div className='Card'
         key={index}
       >
         <h5>{match[5]}</h5>
         <h6>{match[1]} vs {match[2]}</h6>
         <p>{match[0].toLocaleString()}</p>
         <button key={index} onClick={() => setPage(index + 1)}>
           View Match
         </button>
       </div>
       ))}
       </div>
    )
    }

  if (page === 0) {
    return (
      <div className="AppHome">
        <h1>Matches</h1>
        {
            renderMatches()
        }
      </div>
    );      
  }
  if (page > 0) {
    return (
      <div className="App">
        <Page data={matches[page - 1]} />
      </div>
    );
  }

}



export default Menu;
