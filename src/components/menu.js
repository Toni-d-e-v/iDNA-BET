import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Page from './page.js';

export const Tooltip = function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-[70px] w-full text-center scale-0 transition-all rounded bg-gradient-to-r from-rose-500 to-pink-500 opacity-90 p-2 text-zinc-200 group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};
async function getUnixTimestamp(teamAddr) {
  // get data from node
  let data = {
    method: 'contract_readData',
    params: [teamAddr, 'depositDeadline', 'uint64'],
    id: 1,
    key: 'idena-restricted-node-key'
  };
  let response = fetch('https://restricted.idena.io', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // return unix timestamp
  return await response.then(res => res.json()).then(res => res.result);
}
async function isLocked(teamAddr) {
  let unix = await getUnixTimestamp(teamAddr);
  console.log('UNIQ', unix);
  let now = new Date().getTime();
  if (unix > now) {
    return false;
  }
  return true;
}
let url = 'https://restricted.idena.io';
let api_key = 'idena-restricted-node-key';
async function getBetsNumber(teamAddr) {
  let data = {
    method: 'contract_iterateMap',
    params: [teamAddr, 'deposits', null, 'hex', 'hex', 5000],
    id: 1,
    key: api_key
  };
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let result;
  try {
    result = await response.json();
  } catch (err) {
    console.log(err);
    //toast.error("Something went wrong!");
    return;
  }
  return result.result.items.length;
}
async function getBetsNumberTotal(array_addrs) {
  let total = 0;
  for (let i = 0; i < array_addrs.length; i++) {
    let number = await getBetsNumber(array_addrs[i]);
    total += number;
  }
  return total;
}

function Menu() {
  let Match1 = [
    new Date('2023-03-12T18:00:00Z'),
    'CryptoGeek',
    'Artvist',
    '0x6E713534Ff950662F7cDfE4a6f5a264f59bBFaaD',
    '0xd688f6d1e76996b30fa8c368e0bb650113961c94',
    'THE FLIP WARS (FINAL)',
    '#C9243F',
    '#C9243F',
    '#C9243F',
    '#C9243F',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    {
      t1_c1_s1: '0',
      t1_c1_s2: '1',
      t1_c2_s1: '1',
      t1_c2_s2: '7',
      t1_c3_s1: '7',
      t1_c3_s2: '8',
      t1_c4_s1: '8',
      t2_c1_s1: '0',
      t2_c1_s2: '5',
      t2_c2_s1: '5',
      t2_c2_s2: '8',
      t2_c3_s1: '8',
      t2_c3_s2: '9',
      t2_c4_s1: '9'
    },
    'https://medium.com/@ED_M/e1eb2f710e7d',
    'flips',
    {
      c_title: 'FLIP WARS',
      c_description:
        'Flip Wars is a competitive flip-making game created and supported by the Idena community. ✧ It is a 1v1 game where two participants create a flip using the same keywords. The community votes on a best flip of the two using Idena Oracles, and the winner gets the prize or advances into the next round of the tournament.'
    },
    {
      bet_lock: '',
      bet_lock_auto: isLocked('0x6E713534Ff950662F7cDfE4a6f5a264f59bBFaaD'),
      bet_lock_auto_message: isLocked('0x6E713534Ff950662F7cDfE4a6f5a264f59bBFaaD') ? 'iDNA' : 'Bets are closed'
    }
  ];
  let Match2 = [
    new Date('2023-03-14T20:00:00Z'),
    'Man City',
    'Leipzig',
    '0xF7374C42B7B3f3A032c52B2746fD723C9fF3F9e5',
    '0x1A3509811349A26F204D803fE8CfB9489dDC33D4',
    'UEFA Champions League',
    '#E13A3E',
    '#FFFFFF',
    '#002B5D',
    '#FFFFFF',
    '#FFFFFF',
    '#101010',
    '#FFFFFF',
    '#C81025',
    {
      t1_c1_s1: '0',
      t1_c1_s2: '1',
      t1_c2_s1: '1',
      t1_c2_s2: '11',
      t1_c3_s1: '11',
      t1_c3_s2: '12',
      t1_c4_s1: '12',
      t2_c1_s1: '0',
      t2_c1_s2: '1',
      t2_c2_s1: '1',
      t2_c2_s2: '9',
      t2_c3_s1: '9',
      t2_c3_s2: '10',
      t2_c4_s1: '10'
    },
    'https://www.uefa.com/uefachampionsleague/match/2036594--man-city-vs-leipzig/',
    'soccer',
    {
      c_title: 'UEFA Champions League',
      c_description:
        'The UEFA Champions League (abbreviated as UCL, or sometimes, UEFA CL) is an annual club football competition organised by the Union of European Football Associations (UEFA) and contested by top-division European clubs, deciding the competition winners through a round robin group stage to qualify for a double-legged knockout format, and a single leg final. It is one of the most prestigious football tournaments in the world and the most prestigious club competition in European football, played by the national league champions (and, for some nations, one or more runners-up) of their national associations.'
    },
    {
      bet_lock: '',
      bet_lock_auto: isLocked('0xF7374C42B7B3f3A032c52B2746fD723C9fF3F9e5'),
      bet_lock_auto_message: isLocked('0xF7374C42B7B3f3A032c52B2746fD723C9fF3F9e5') ? 'iDNA' : 'Bets are closed'
    }
  ];
  let Match3 = [
    new Date('2023-08-01T20:00:00Z'),
    'Below $0.5',
    'Above $0.5',
    '',
    '',
    "Will the price of BUSD be below '↘' or above '↗' on August 1st 2023?",
    '#553184',
    '#D6221B',
    '#FFFFFF',
    '#FFFFFF',
    '#C9271A',
    '#2C2079',
    '#FFFFFF',
    '#FFFFFF',
    {
      t1_c1_s1: '0',
      t1_c1_s2: '6',
      t1_c2_s1: '6',
      t1_c2_s2: '10',
      t1_c3_s1: '10',
      t1_c3_s2: '11',
      t1_c4_s1: '11',
      t2_c1_s1: '0',
      t2_c1_s2: '3',
      t2_c2_s1: '3',
      t2_c2_s2: '6',
      t2_c3_s1: '6',
      t2_c3_s2: '7',
      t2_c4_s1: '7'
    },
    'https://www.binance.com/en/price/binance-usd',
    'trade',
    {
      c_title: 'Binance USD',
      c_description:
        'BUSD, or Binance USD, is a US Dollar pegged stablecoin issued by Binance. According to Binance it is backed 1:1 by a reserve of US Dollars and was founded by them in partnership with Paxos who is the issuer of the token. Paxos holds the reserves only partially in cash deposited in their US bank accounts with the other part held in U.S. Treasuries. BUSD is natively issued on the Ethereum blockchain by Paxos. Binance creates Binance-Peg BUSD by locking the natively ERC-20 BUSD in a smart contract on the Ethereum Blockchain and issuing Binance-Peg BUSD equivalent to the amount held in reserve in the smart contract. Binance-Peg BUSD is native to BNB chain.'
    },
    {
      bet_lock: 'Betting opening soon',
      bet_lock_auto: isLocked('0xc8b03a027b1cf53fa54e670309b05a804eb7e7dd'),
      bet_lock_auto_message: isLocked('0xc8b03a027b1cf53fa54e670309b05a804eb7e7dd') ? 'iDNA' : 'Bets are closed'
    }
  ];
  let Match4 = [
    // Q: why does GMT-0500 makes the date invalid in firefox?
    //
    new Date('2023-03-18T21:00:00Z'),
    'EDWARDS',
    'USMAN 3',
    '0x1ADf3Bb68E35FfD37951CFf4c259B22C107c7c9A',
    '0x804Af2b3F1aCB6c3027b9DC69e5A6CBe2F58CA83',
    'UFC 286',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#000000',
    '#000000',
    '#000000',
    '#000000',
    {
      t1_c1_s1: '0',
      t1_c1_s2: '1',
      t1_c2_s1: '1',
      t1_c2_s2: '7',
      t1_c3_s1: '7',
      t1_c3_s2: '8',
      t1_c4_s1: '8',
      t2_c1_s1: '0',
      t2_c1_s2: '5',
      t2_c2_s1: '5',
      t2_c2_s2: '8',
      t2_c3_s1: '8',
      t2_c3_s2: '8',
      t2_c4_s1: '8'
    },
    'https://www.ufcespanol.com/event/ufc-286',
    'ufc',
    {
      c_title: 'UFC 286',
      c_description:
        'UFC 286: Edwards vs. Usman 3 is an upcoming mixed martial arts event produced by the Ultimate Fighting Championship that will take place on March 18, 2023, at The O2 Arena in London, England.'
    },
    {
      bet_lock: '',
      bet_lock_auto: isLocked('0x1ADf3Bb68E35FfD37951CFf4c259B22C107c7c9A'),
      bet_lock_auto_message: isLocked('0x1ADf3Bb68E35FfD37951CFf4c259B22C107c7c9A') ? 'iDNA' : 'Bets are closed'
    }
  ];
  const [matches] = React.useState([Match1, Match2, Match3, Match4]);
  const [page, setPage] = React.useState(0);
  const [filter, setFilter] = React.useState('all');
  const address = [
    '0x6E713534Ff950662F7cDfE4a6f5a264f59bBFaaD',
    '0xd688f6d1e76996b30fa8c368e0bb650113961c94',
    '0xF7374C42B7B3f3A032c52B2746fD723C9fF3F9e5',
    '0x1A3509811349A26F204D803fE8CfB9489dDC33D4',
    '0xF7374C42B7B3f3A032c52B2746fD723C9fF3F9e5',
    '0x1A3509811349A26F204D803fE8CfB9489dDC33D4',
    '0x1ADf3Bb68E35FfD37951CFf4c259B22C107c7c9A',
    '0x804Af2b3F1aCB6c3027b9DC69e5A6CBe2F58CA83'
  ];
  let [total, setTotal] = React.useState(0);
  getBetsNumberTotal(address).then(res => {
    console.log(res);
    setTotal(res);
  });

  console.log(total);
  // filter matches by type

  const renderMatches = () => {
    return (
      <div className="text-center lg:mx-20 md:mx-1 mt-10 grid grid-cols-2 lg:gap-6 md:gap-3 justify-items-center text-blue-500">
        {matches.map((match, index) =>
          // filter matches by type
          match[16] === filter || filter === 'all' ? (
            <div
              className="matches-list bg-pink-400/70 text-white outline-zinc-500 mt-4 rounded-xl grid items-center hover:border-purple-400 hover:scale-105 transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-200 border border-gray-300 p-4 lg:w-2/5 md:m-4"
              key={index}
            >
              <button className="divide-y divide-dashed divide-zinc-200" key={index} onClick={() => setPage(index + 1)}>
                <h5 className="">{match[5]}</h5>
                <h6 className="">
                  {match[1]} vs {match[2]}
                </h6>
                <p className="">{match[0].toLocaleString()}</p>
              </button>
            </div>
          ) : null
        )}
      </div>
    );
  };

  if (page === 0) {
    return (
      <div>
        <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="flex flex-1 items-center gap-2 justify-center">
            <Tooltip message={'🗙 Filter'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('all');
                }}
              >
                {filter === 'all' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" data-name="line Icons" viewBox="0 0 74 74">
                    <g fill="#bbf7d0">
                      <path d="M64.3 14.781H7.735a5.735 5.735 0 010-11.47H64.3a5.735 5.735 0 010 11.47zM7.735 5.311a3.735 3.735 0 000 7.47H64.3a3.735 3.735 0 000-7.47z"></path>
                      <path d="M27.939 70.689a1 1 0 01-1-1V42.856L6.2 14.37a1 1 0 01.8-1.589h58.027a1 1 0 01.809 1.589L45.093 42.856v18.829a1 1 0 01-.556.9l-16.154 8a1 1 0 01-.444.104zM8.97 14.781l19.778 27.16a1 1 0 01.191.589v25.548l14.154-7.013V42.53a1 1 0 01.191-.589l19.778-27.16z"></path>
                      <path d="M59.875 60.424A12.13 12.13 0 1172 48.288a12.149 12.149 0 01-12.125 12.136zm0-22.261A10.13 10.13 0 1070 48.288a10.142 10.142 0 00-10.125-10.125z"></path>
                      <path d="M55.251 53.912a1 1 0 01-.707-1.707l9.237-9.237a1 1 0 011.419 1.414l-9.237 9.237a1 1 0 01-.712.293z"></path>
                      <path d="M64.488 53.912a1 1 0 01-.707-.293l-9.237-9.237a1 1 0 011.414-1.414l9.242 9.237a1 1 0 01-.707 1.707z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" data-name="line Icons" viewBox="0 0 74 74">
                    <g>
                      <path d="M64.3 14.781H7.735a5.735 5.735 0 010-11.47H64.3a5.735 5.735 0 010 11.47zM7.735 5.311a3.735 3.735 0 000 7.47H64.3a3.735 3.735 0 000-7.47z"></path>
                      <path d="M27.939 70.689a1 1 0 01-1-1V42.856L6.2 14.37a1 1 0 01.8-1.589h58.027a1 1 0 01.809 1.589L45.093 42.856v18.829a1 1 0 01-.556.9l-16.154 8a1 1 0 01-.444.104zM8.97 14.781l19.778 27.16a1 1 0 01.191.589v25.548l14.154-7.013V42.53a1 1 0 01.191-.589l19.778-27.16z"></path>
                      <path d="M59.875 60.424A12.13 12.13 0 1172 48.288a12.149 12.149 0 01-12.125 12.136zm0-22.261A10.13 10.13 0 1070 48.288a10.142 10.142 0 00-10.125-10.125z"></path>
                      <path d="M55.251 53.912a1 1 0 01-.707-1.707l9.237-9.237a1 1 0 011.419 1.414l-9.237 9.237a1 1 0 01-.712.293z"></path>
                      <path d="M64.488 53.912a1 1 0 01-.707-.293l-9.237-9.237a1 1 0 011.414-1.414l9.242 9.237a1 1 0 01-.707 1.707z"></path>
                    </g>
                  </svg>
                )}
              </div>
            </Tooltip>
            <Tooltip message={'Soccer'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('soccer');
                }}
              >
                {filter === 'soccer' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16.933 16.933">
                    <g transform="translate(0 -280.067)">
                      <path
                        fill="#bbf7d0"
                        d="M8.468 281.16a7.377 7.377 0 00-7.374 7.373 7.378 7.378 0 007.374 7.373 7.376 7.376 0 007.37-7.373 7.376 7.376 0 00-7.37-7.372zm0 .53c.862 0 1.686.16 2.446.45l-2.055.53-1.854-.822c.471-.103.96-.158 1.463-.158zm-2.263.384l2.34 1.035-.315 2.603-2.598 1.868c-.694-.296-1.387-.595-2.08-.893l.037-2.954a6.84 6.84 0 012.616-1.66zm5.477.417a6.861 6.861 0 012.328 2.03l-.373 2.4-2.318.701-2.557-1.879.323-2.586zm-8.628 1.856l-.032 2.423-1.397 1.699a6.813 6.813 0 011.43-4.122zm11.386.847c.553.988.87 2.126.87 3.34l-.001.023-1.158-1.504zm-5.966.997l2.481 1.823-.966 2.922c-1.026-.005-2.052-.012-3.078-.019l-.936-2.93zm-5.107.994c.694.297 1.388.595 2.081.894.327 1.02.652 2.042.977 3.064-.38.59-.762 1.18-1.144 1.77l-2.494-.56a6.805 6.805 0 01-1.125-3.095zm10.408.248l1.483 1.927a6.805 6.805 0 01-1.138 3.032l-2.213.411-1.427-1.66.996-3.012zm-6.917 4.017l3.2.016 1.428 1.67-1.106 1.969a6.85 6.85 0 01-3.435.1l-1.223-1.997 1.136-1.758zm-3.566 1.56l1.956.438.943 1.54a6.845 6.845 0 01-2.9-1.978zm10.342.01a6.85 6.85 0 01-2.497 1.818l.848-1.51z"
                        vectorEffect="none"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16.933 16.933">
                    <g transform="translate(0 -280.067)">
                      <path
                        d="M8.468 281.16a7.377 7.377 0 00-7.374 7.373 7.378 7.378 0 007.374 7.373 7.376 7.376 0 007.37-7.373 7.376 7.376 0 00-7.37-7.372zm0 .53c.862 0 1.686.16 2.446.45l-2.055.53-1.854-.822c.471-.103.96-.158 1.463-.158zm-2.263.384l2.34 1.035-.315 2.603-2.598 1.868c-.694-.296-1.387-.595-2.08-.893l.037-2.954a6.84 6.84 0 012.616-1.66zm5.477.417a6.861 6.861 0 012.328 2.03l-.373 2.4-2.318.701-2.557-1.879.323-2.586zm-8.628 1.856l-.032 2.423-1.397 1.699a6.813 6.813 0 011.43-4.122zm11.386.847c.553.988.87 2.126.87 3.34l-.001.023-1.158-1.504zm-5.966.997l2.481 1.823-.966 2.922c-1.026-.005-2.052-.012-3.078-.019l-.936-2.93zm-5.107.994c.694.297 1.388.595 2.081.894.327 1.02.652 2.042.977 3.064-.38.59-.762 1.18-1.144 1.77l-2.494-.56a6.805 6.805 0 01-1.125-3.095zm10.408.248l1.483 1.927a6.805 6.805 0 01-1.138 3.032l-2.213.411-1.427-1.66.996-3.012zm-6.917 4.017l3.2.016 1.428 1.67-1.106 1.969a6.85 6.85 0 01-3.435.1l-1.223-1.997 1.136-1.758zm-3.566 1.56l1.956.438.943 1.54a6.845 6.845 0 01-2.9-1.978zm10.342.01a6.85 6.85 0 01-2.497 1.818l.848-1.51z"
                        vectorEffect="none"
                      ></path>
                    </g>
                  </svg>
                )}
              </div>
            </Tooltip>
            <Tooltip message={'Stock Market'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('trade');
                }}
              >
                {filter === 'trade' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                    <g fill="#bbf7d0">
                      <path d="M3 24a1.059 1.059 0 00.136-.009 77.375 77.375 0 0021.274-6.079A77.1 77.1 0 0043.248 5.884l-1.218 4.874a1 1 0 00.727 1.212A1.025 1.025 0 0043 12a1 1 0 00.969-.758l2-8A1 1 0 0045 2h-8a1 1 0 000 2h5.369A75.2 75.2 0 0123.59 16.088a75.363 75.363 0 01-20.725 5.921A1 1 0 003 24zM45 44h-1V17a1 1 0 00-1-1H33a1 1 0 00-1 1v27h-2V23a1 1 0 00-1-1H19a1 1 0 00-1 1v21h-2V29a1 1 0 00-1-1H5a1 1 0 00-1 1v15H3a1 1 0 000 2h42a1 1 0 000-2zM34 18h8v26h-8zm-14 6h8v20h-8zM6 30h8v14H6z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                    <g>
                      <path d="M3 24a1.059 1.059 0 00.136-.009 77.375 77.375 0 0021.274-6.079A77.1 77.1 0 0043.248 5.884l-1.218 4.874a1 1 0 00.727 1.212A1.025 1.025 0 0043 12a1 1 0 00.969-.758l2-8A1 1 0 0045 2h-8a1 1 0 000 2h5.369A75.2 75.2 0 0123.59 16.088a75.363 75.363 0 01-20.725 5.921A1 1 0 003 24zM45 44h-1V17a1 1 0 00-1-1H33a1 1 0 00-1 1v27h-2V23a1 1 0 00-1-1H19a1 1 0 00-1 1v21h-2V29a1 1 0 00-1-1H5a1 1 0 00-1 1v15H3a1 1 0 000 2h42a1 1 0 000-2zM34 18h8v26h-8zm-14 6h8v20h-8zM6 30h8v14H6z"></path>
                    </g>
                  </svg>
                )}
              </div>
            </Tooltip>
            <Tooltip message={'UFC'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('ufc');
                }}
              >
                {filter === 'ufc' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 479.998 479.998">
                    <g fill="#bbf7d0">
                      <path d="M385.21 50.397C369.757 22.586 330.698 4.463 278.047.675c-27.702-1.993-56.421.463-80.856 6.918-27.025 7.139-47.187 18.629-58.305 33.229-43.987 57.766-43.473 163.815-2.885 220.803a8 8 0 0013.033-9.282c-37.538-52.705-36.283-150.789 2.582-201.827 35.615-46.775 188.819-47.76 219.607 7.653 42.935 77.273 36.51 148.945 23.561 195.464-15.273 54.866-43.284 90.062-52.391 95.496a8.029 8.029 0 00-3.772 5.475c-.201 1.138-.129-4.756-.129 93.395 0 8.822-7.178 16-16 16h-73v-38.855c0-11.659 9.486-21.145 21.146-21.145h39.112a8 8 0 000-16h-39.112c-20.482 0-37.146 16.663-37.146 37.145v38.855h-74c-8.822 0-16-7.178-16-16v-84h48v54.032a8 8 0 0016 0v-54.032h91.936a8 8 0 000-16H137.572c-4.151-2.349-7.541-4.547-10.31-7.176-22.936-21.772-40.378-50.84-47.855-79.751-7.313-28.279-4.029-52.971 9.012-67.744a8 8 0 10-11.994-10.589c-16.859 19.098-21.301 48.339-12.508 82.339 8.207 31.733 27.281 63.571 52.33 87.35 3.438 3.263 7.333 5.902 11.246 8.222V448c0 17.645 14.355 32 32 32h163c17.645 0 32-14.355 32-32v-87.93c15.941-13.022 41.794-52.172 55.706-102.145 13.752-49.406 20.58-125.513-24.989-207.528z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 479.998 479.998">
                    <path d="M385.21 50.397C369.757 22.586 330.698 4.463 278.047.675c-27.702-1.993-56.421.463-80.856 6.918-27.025 7.139-47.187 18.629-58.305 33.229-43.987 57.766-43.473 163.815-2.885 220.803a8 8 0 0013.033-9.282c-37.538-52.705-36.283-150.789 2.582-201.827 35.615-46.775 188.819-47.76 219.607 7.653 42.935 77.273 36.51 148.945 23.561 195.464-15.273 54.866-43.284 90.062-52.391 95.496a8.029 8.029 0 00-3.772 5.475c-.201 1.138-.129-4.756-.129 93.395 0 8.822-7.178 16-16 16h-73v-38.855c0-11.659 9.486-21.145 21.146-21.145h39.112a8 8 0 000-16h-39.112c-20.482 0-37.146 16.663-37.146 37.145v38.855h-74c-8.822 0-16-7.178-16-16v-84h48v54.032a8 8 0 0016 0v-54.032h91.936a8 8 0 000-16H137.572c-4.151-2.349-7.541-4.547-10.31-7.176-22.936-21.772-40.378-50.84-47.855-79.751-7.313-28.279-4.029-52.971 9.012-67.744a8 8 0 10-11.994-10.589c-16.859 19.098-21.301 48.339-12.508 82.339 8.207 31.733 27.281 63.571 52.33 87.35 3.438 3.263 7.333 5.902 11.246 8.222V448c0 17.645 14.355 32 32 32h163c17.645 0 32-14.355 32-32v-87.93c15.941-13.022 41.794-52.172 55.706-102.145 13.752-49.406 20.58-125.513-24.989-207.528z"></path>
                  </svg>
                )}
              </div>
            </Tooltip>
            {/*
            <Tooltip message={'Boxing'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('cricket');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 479.998 479.998">
                  <path d="M385.21 50.397C369.757 22.586 330.698 4.463 278.047.675c-27.702-1.993-56.421.463-80.856 6.918-27.025 7.139-47.187 18.629-58.305 33.229-43.987 57.766-43.473 163.815-2.885 220.803a8 8 0 0013.033-9.282c-37.538-52.705-36.283-150.789 2.582-201.827 35.615-46.775 188.819-47.76 219.607 7.653 42.935 77.273 36.51 148.945 23.561 195.464-15.273 54.866-43.284 90.062-52.391 95.496a8.029 8.029 0 00-3.772 5.475c-.201 1.138-.129-4.756-.129 93.395 0 8.822-7.178 16-16 16h-73v-38.855c0-11.659 9.486-21.145 21.146-21.145h39.112a8 8 0 000-16h-39.112c-20.482 0-37.146 16.663-37.146 37.145v38.855h-74c-8.822 0-16-7.178-16-16v-84h48v54.032a8 8 0 0016 0v-54.032h91.936a8 8 0 000-16H137.572c-4.151-2.349-7.541-4.547-10.31-7.176-22.936-21.772-40.378-50.84-47.855-79.751-7.313-28.279-4.029-52.971 9.012-67.744a8 8 0 10-11.994-10.589c-16.859 19.098-21.301 48.339-12.508 82.339 8.207 31.733 27.281 63.571 52.33 87.35 3.438 3.263 7.333 5.902 11.246 8.222V448c0 17.645 14.355 32 32 32h163c17.645 0 32-14.355 32-32v-87.93c15.941-13.022 41.794-52.172 55.706-102.145 13.752-49.406 20.58-125.513-24.989-207.528z"></path>
                </svg>
              </div>
            </Tooltip>
            */}
            <Tooltip message={'Flip Wars'}>
              <div
                className="menu-item"
                onClick={() => {
                  setFilter('flips');
                }}
              >
                {filter === 'flips' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-5 0 489 489.163">
                    <g fill="#bbf7d0">
                      <path d="M459.203 47.594L191.363.364c-13.05-2.298-25.492 6.421-27.793 19.472l-1.863 10.559L33.187 53.02C11.41 56.875-3.133 77.633.684 99.418l61.128 346.656c3.918 21.723 24.657 36.196 46.399 32.383l107.152-18.95 166.078 29.286c1.391.246 2.797.371 4.211.371 11.63-.027 21.567-8.387 23.582-19.84l69.473-393.922c2.27-13.058-6.453-25.496-19.504-27.808zM35.945 68.777L158.746 47.18l-11.383 64.52a40.437 40.437 0 00-6.535-5.825c-14.121-9.855-32.965-9.57-46.777.71-13.817 10.286-19.5 28.255-14.11 44.606 5.391 16.356 20.641 27.426 37.86 27.485 2.36 0 4.71-.207 7.035-.617a39.796 39.796 0 0011.559-4.121l-17.192 97.28-5.242-6.527c-.055-.074-.148-.105-.215-.175a7.848 7.848 0 00-1.758-1.473c-.234-.145-.433-.328-.672-.45-.632-.292-1.3-.5-1.984-.613a9.194 9.194 0 00-1.016-.21c-.21 0-.379-.11-.586-.11a7.186 7.186 0 00-1.84.32c-.144 0-.296 0-.44.07a7.94 7.94 0 00-4.583 3.641 7.07 7.07 0 00-.39.903c-.2.37-.372.754-.508 1.152-1.598 5.602-23.2 73.39-34.399 107.586L16.441 96.645c-2.293-13.079 6.434-25.547 19.504-27.868zm101.602 83.625a24.002 24.002 0 01-43.55-15.879 23.999 23.999 0 0119.718-21.543 23.373 23.373 0 014.207-.378c11.633.023 21.578 8.382 23.594 19.84a23.876 23.876 0 01-3.97 17.96zm128.719 299.832l-149.918-26.398a8 8 0 01-6.489-9.266l13.75-77.984c3.664-4.32 66.512-84.969 72.801-93.281zM105.465 462.7c-13.047 2.266-25.48-6.406-27.863-19.433l-6.864-38.688c.801-.582 29.711-84.969 40.168-118.2l4.633 5.77-21.441 121.598c-2.274 13.063 6.449 25.504 19.504 27.817l55.77 9.832zm288.058 3.848a8.005 8.005 0 01-9.257 6.488l-100-17.601-35.336-104.559 104.05-157.137 57.598 176zm22.961-130.223l-53.441-163.289a7.998 7.998 0 00-6.531-5.437 8.008 8.008 0 00-7.742 3.507L242.465 331.723 207.098 226.98l-.055-.265a7.993 7.993 0 00-5.848-6.063 8.196 8.196 0 00-8.097 2.598c-.27.312-.512.648-.727 1-4.082 5.527-40 52.098-62.96 81.383l49.913-283.024c.766-4.343 4.906-7.246 9.254-6.488l267.879 47.203a7.995 7.995 0 016.488 9.262zm0 0"></path>
                      <path d="M260.426 69.379a40 40 0 00-44.727 53.105 40 40 0 0030.84 25.68c2.32.406 4.676.613 7.031.613 20.742-.023 38.024-15.894 39.805-36.558 1.785-20.66-12.52-39.262-32.95-42.84zm16.695 43.55c-2.203 12.512-13.781 21.137-26.398 19.673-12.621-1.465-21.914-12.508-21.196-25.196.715-12.683 11.196-22.613 23.899-22.644 1.414 0 2.824.125 4.219.367 13.054 2.297 21.777 14.746 19.476 27.8zm0 0"></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-5 0 489 489.163">
                    <path d="M459.203 47.594L191.363.364c-13.05-2.298-25.492 6.421-27.793 19.472l-1.863 10.559L33.187 53.02C11.41 56.875-3.133 77.633.684 99.418l61.128 346.656c3.918 21.723 24.657 36.196 46.399 32.383l107.152-18.95 166.078 29.286c1.391.246 2.797.371 4.211.371 11.63-.027 21.567-8.387 23.582-19.84l69.473-393.922c2.27-13.058-6.453-25.496-19.504-27.808zM35.945 68.777L158.746 47.18l-11.383 64.52a40.437 40.437 0 00-6.535-5.825c-14.121-9.855-32.965-9.57-46.777.71-13.817 10.286-19.5 28.255-14.11 44.606 5.391 16.356 20.641 27.426 37.86 27.485 2.36 0 4.71-.207 7.035-.617a39.796 39.796 0 0011.559-4.121l-17.192 97.28-5.242-6.527c-.055-.074-.148-.105-.215-.175a7.848 7.848 0 00-1.758-1.473c-.234-.145-.433-.328-.672-.45-.632-.292-1.3-.5-1.984-.613a9.194 9.194 0 00-1.016-.21c-.21 0-.379-.11-.586-.11a7.186 7.186 0 00-1.84.32c-.144 0-.296 0-.44.07a7.94 7.94 0 00-4.583 3.641 7.07 7.07 0 00-.39.903c-.2.37-.372.754-.508 1.152-1.598 5.602-23.2 73.39-34.399 107.586L16.441 96.645c-2.293-13.079 6.434-25.547 19.504-27.868zm101.602 83.625a24.002 24.002 0 01-43.55-15.879 23.999 23.999 0 0119.718-21.543 23.373 23.373 0 014.207-.378c11.633.023 21.578 8.382 23.594 19.84a23.876 23.876 0 01-3.97 17.96zm128.719 299.832l-149.918-26.398a8 8 0 01-6.489-9.266l13.75-77.984c3.664-4.32 66.512-84.969 72.801-93.281zM105.465 462.7c-13.047 2.266-25.48-6.406-27.863-19.433l-6.864-38.688c.801-.582 29.711-84.969 40.168-118.2l4.633 5.77-21.441 121.598c-2.274 13.063 6.449 25.504 19.504 27.817l55.77 9.832zm288.058 3.848a8.005 8.005 0 01-9.257 6.488l-100-17.601-35.336-104.559 104.05-157.137 57.598 176zm22.961-130.223l-53.441-163.289a7.998 7.998 0 00-6.531-5.437 8.008 8.008 0 00-7.742 3.507L242.465 331.723 207.098 226.98l-.055-.265a7.993 7.993 0 00-5.848-6.063 8.196 8.196 0 00-8.097 2.598c-.27.312-.512.648-.727 1-4.082 5.527-40 52.098-62.96 81.383l49.913-283.024c.766-4.343 4.906-7.246 9.254-6.488l267.879 47.203a7.995 7.995 0 016.488 9.262zm0 0"></path>
                    <path d="M260.426 69.379a40 40 0 00-44.727 53.105 40 40 0 0030.84 25.68c2.32.406 4.676.613 7.031.613 20.742-.023 38.024-15.894 39.805-36.558 1.785-20.66-12.52-39.262-32.95-42.84zm16.695 43.55c-2.203 12.512-13.781 21.137-26.398 19.673-12.621-1.465-21.914-12.508-21.196-25.196.715-12.683 11.196-22.613 23.899-22.644 1.414 0 2.824.125 4.219.367 13.054 2.297 21.777 14.746 19.476 27.8zm0 0"></path>
                  </svg>
                )}
              </div>
            </Tooltip>
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

            <h1 className="mt-5 text-2xl uppercase text-center">Upcoming Live Sports Fixtures</h1>
            <h2 className="mt-2 text-sm text-center">Active bets: {total}</h2>
            <div className="mt-3 text-sm font-bold text-center">Simply select the match and make your bet:</div>
          </div>
          {renderMatches()}
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
