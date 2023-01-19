import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Page from './page.js';
function Menu() {
  let Match1 = [
    new Date("2023-01-25 17:00:00 GMT-0500"),
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
    new Date("2023-01-28 14:30:00 GMT-0500"),
    "Palmeiras",
    "Flamengo",
    "Team 3 Address",
    "Team 4 Address",
    "Supercopa do Brasil",
    "#006434",
    "#FFFFFF",
    "#006434",
    "#FFFFFF",
    "#C6210B",
    "#000000",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '6', t1_c3_s1: '6', t2_c1_s1: '0', t2_c1_s2: '3', t2_c2_s1: '3', t2_c2_s2: '6', t2_c3_s1: '6'},
    "https://twitter.com/CBF_Futebol/status/1613692198910033922?cxt=HHwWhIDQzaqg_uQsAAAA"
  ];
  let Match3 = [
    new Date("2023-02-16 12:45:00"),
    "Fiorentina (ITA)",
    "Braga (POR)",
    "Team 3 Address",
    "Team 4 Address",
    "UEFA Europa Conference League play-off",
    "#6CACE4",
    "#FFFFFF",
    "#FFB81C",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '5', t1_c3_s1: '5', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://es.uefa.com/uefaeuropaconferenceleague/fixtures-results/#/rd/2001691-1"
  ];
  let Match4 = [
    new Date("2023-02-02 00:00:00"),
    "CFR Cluj",
    "Lazio",
    "Team 3 Address",
    "Team 4 Address",
    "UEFA Europa Conference League play-off",
    "#6CACE4",
    "#FFFFFF",
    "#FFB81C",
    "#002654",
    "#FFFFFF",
    "#ED2939",
    {t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '5', t1_c3_s1: '5', t2_c1_s1: '0', t2_c1_s2: '2', t2_c2_s1: '2', t2_c2_s2: '4', t2_c3_s1: '4'},
    "https://es.uefa.com/uefaeuropaconferenceleague/fixtures-results/#/rd/2001691-2"
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
      <div>
        <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="block md:hidden ml-auto pr-4 my-auto cursor-pointer">
          <div id="mobile-menu-button" className="group peer">
              <div className="top-0 bg-zinc-200 rounded-full w-8 h-1 group-open:rotate-45 group-open:top-2 relative transition-all"></div>
              <div className="transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0"></div>
              <div className="top-0 group-open:-rotate-45 transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 group-open:-top-2 relative"></div>
            </div>

            <div className="absolute top-[62px] left-0 hidden w-full bg-gradient-to-r from-rose-500 to-pink-500 peer-open:block">
              <div className="relative flex h-full cursor-pointer items-center justify-center p-4 font-bold text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <span>Sign in</span>
              </div>
              <div id="ticket-menu-item" className="group relative h-full cursor-pointer text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <div className="p-4 text-center font-bold">Support</div>
                <div className="hidden group-open:block">
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span><a href="https://t.me/ltrvlr" target="_blank" rel="noopener noreferrer">Telegram</a></span>
                  </div>
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span><a href="https://discordapp.com/users/749316657318723705" target="_blank" rel="noopener noreferrer">Discord</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex hidden flex-1 items-center justify-center">
            <div className="menu-item">
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 16.933 16.933"
    >
      <g transform="translate(0 -280.067)">
        <path
          d="M8.468 281.16a7.377 7.377 0 00-7.374 7.373 7.378 7.378 0 007.374 7.373 7.376 7.376 0 007.37-7.373 7.376 7.376 0 00-7.37-7.372zm0 .53c.862 0 1.686.16 2.446.45l-2.055.53-1.854-.822c.471-.103.96-.158 1.463-.158zm-2.263.384l2.34 1.035-.315 2.603-2.598 1.868c-.694-.296-1.387-.595-2.08-.893l.037-2.954a6.84 6.84 0 012.616-1.66zm5.477.417a6.861 6.861 0 012.328 2.03l-.373 2.4-2.318.701-2.557-1.879.323-2.586zm-8.628 1.856l-.032 2.423-1.397 1.699a6.813 6.813 0 011.43-4.122zm11.386.847c.553.988.87 2.126.87 3.34l-.001.023-1.158-1.504zm-5.966.997l2.481 1.823-.966 2.922c-1.026-.005-2.052-.012-3.078-.019l-.936-2.93zm-5.107.994c.694.297 1.388.595 2.081.894.327 1.02.652 2.042.977 3.064-.38.59-.762 1.18-1.144 1.77l-2.494-.56a6.805 6.805 0 01-1.125-3.095zm10.408.248l1.483 1.927a6.805 6.805 0 01-1.138 3.032l-2.213.411-1.427-1.66.996-3.012zm-6.917 4.017l3.2.016 1.428 1.67-1.106 1.969a6.85 6.85 0 01-3.435.1l-1.223-1.997 1.136-1.758zm-3.566 1.56l1.956.438.943 1.54a6.845 6.845 0 01-2.9-1.978zm10.342.01a6.85 6.85 0 01-2.497 1.818l.848-1.51z"
          vectorEffect="none"
        ></path>
      </g>
    </svg>
              <span>Soccer</span>
            </div>
            <div className="menu-item">
              <span>Hockey</span>
            </div>
            <div className="menu-item">
              <span>Boxing</span>
            </div>
          </div>  
        </nav>
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
