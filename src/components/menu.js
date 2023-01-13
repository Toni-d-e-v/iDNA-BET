import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Page from './page.js';
function Menu() {
  let Match1 = [
    new Date("2023-01-21 00:00:00"),
    "Peru",
    "Argentina",
    "Team 1 Address",
    "Team 2 Address",
    "CONMEBOL SUB20",
    "#D91023",
    "#FFFFFF",
    "#D91023",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '1', t1_c2_s1: '1', t1_c2_s2: '3', t1_c3_s1: '3', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://www.conmebol.com/noticias/la-conmebol-sub20-va-tomando-forma-y-confirmo-sus-grupos"
 ];
  let Match2 = [
    new Date("2023-02-02 00:00:00"),
    "Team 3",
    "Team 4",
    "Team 3 Address",
    "Team 4 Address",
    "INFO",
    "#6CACE4",
    "#FFFFFF",
    "#FFB81C",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '5', t1_c3_s1: '5', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://www.conmebol.com/noticias/la-conmebol-sub20-va-tomando-forma-y-confirmo-sus-grupos"
  ];
  let Match3 = [
    new Date("2023-02-02 00:00:00"),
    "Team 3",
    "Team 4",
    "Team 3 Address",
    "Team 4 Address",
    "INFO",
    "#6CACE4",
    "#FFFFFF",
    "#FFB81C",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '5', t1_c3_s1: '5', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://www.conmebol.com/noticias/la-conmebol-sub20-va-tomando-forma-y-confirmo-sus-grupos/"
  ];
  let Match4 = [
    new Date("2023-02-02 00:00:00"),
    "Team 3",
    "Team 4",
    "Team 3 Address",
    "Team 4 Address",
    "INFO",
    "#6CACE4",
    "#FFFFFF",
    "#FFB81C",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '5', t1_c3_s1: '5', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://www.conmebol.com/noticias/la-conmebol-sub20-va-tomando-forma-y-confirmo-sus-grupos"
  ];
  const [matches] = React.useState([Match1, Match2, Match3, Match4]);
  const [page, setPage] = React.useState(0);
  const renderMatches = () => {
    return (
        <div
        className='text-center lg:mx-20 md:mx-1 mt-10 grid grid-cols-2 lg:gap-6 md:gap-3 justify-items-center text-blue-500'
       >
       {matches.map((match, index) => (
       <div className="bg-pink-400/70 text-white outline-zinc-500 mt-4 rounded-xl hover:border-purple-400 hover:scale-105 transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-200 border border-gray-300 p-4 lg:w-2/5 md:m-4"
         key={index}
       >
         <button className="divide-y divide-dashed divide-zinc-200" key={index} onClick={() => setPage(index + 1)}>
         <h5 className="">{match[5]}</h5>
         <h6 className="">{match[1]} vs {match[2]}</h6>
         <p className="">{match[0].toLocaleString()}</p>
         </button>
       </div>
       ))}
       </div>
    )
    }

  if (page === 0) {
    return (
      <div className="AppHome bg-gradient-to-r from-[#ff7a90] via-[#de5e78] to-[#cc3354] animate-bias min-h-screen h-full">
        <div className="flex flex-col items-center justify-center">
        <div className="bg-white/30 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <div className="relative">
              <img src="./images/logo.png" width="175" />
              <div className="flex item-center justify-center mt-[-70px] mb-5">
                <div className="bg-pink-500 w-14 h-14 rounded-full flex items-center justify-center gap-1">
                  <div className="h-2 w-1 bg-pink-300 rounded-full animate-wavey"></div>
                  <div className="h-3 w-1 bg-pink-200 rounded-full animate-wavey animation-delay-200"></div>
                  <div className="h-4 w-1 bg-pink-100 rounded-full animate-wavey animation-delay-[150ms]"></div>
                  <div className="h-3 w-1 bg-pink-200 rounded-full animate-wavey animation-delay-300"></div>
                  <div className="h-2 w-1 bg-pink-300 rounded-full animate-wavey animation-delay-[75ms]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-5xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <span className="text-orange-300">i</span>
          <span className="text-sky-900">DNA</span>
          <span className="text-orange-300">bet</span>
          </div>
        <h1 className="mt-5 text-2xl uppercase text-center">Upcoming Live Football Fixtures</h1>
        <div className="mt-3 text-sm font-bold text-center">Please choose the match to put your bet</div>
        </div>
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
