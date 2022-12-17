import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { sliceName as generalSliceName } from './core/reducer';
import { actionNames } from './core/constants';
import { getAuthLocalStorage, removeAuthLocalStorage, getExpiresCurrentUnixMilli } from './core/utilities';
import { appConfigurations } from './core/constants';
import MainAnimation from "./MainAnim";
import { useState } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.general.user);
  const tokensSecured = useSelector(state => state.general.tokensSecured);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idenaAuthToken = urlParams.get('token');
    const { tokens } = getAuthLocalStorage();
    if (tokens) {
      const { expiresUnixMilli, currentUnixMilli } = getExpiresCurrentUnixMilli(tokens.refresh.expires);
      if (expiresUnixMilli - 10000 > currentUnixMilli) {
        dispatch({ type: actionNames[generalSliceName].updateTokensSecured, payload: true });
        dispatch({ type: actionNames.refreshTokens });
        return;
      }
    }
    removeAuthLocalStorage();
    if (idenaAuthToken) {
      dispatch({ type: actionNames.processLogin, payload: idenaAuthToken });
    }
  }, []);

  const [d, setDa] = useState(0);
  const [h, setHa] = useState(0);
  const [m, setMa] = useState(0);

  //Dec 18, 3pm GMT 2022
  const QatarWCUPfinal = new Date(`Dec 18, 2022 15:00:00 GMT+03:00`);
  function upadteCountDate() {
    const currentTime = new Date();
    const diff = QatarWCUPfinal - currentTime;

    setDa(Math.floor(diff / 1000 / 60 / 60 / 24));
    setHa(Math.floor(diff / 1000 / 60 / 60) % 24);
    setMa(Math.floor(diff / 1000 / 60) % 60);
  }
  setInterval(upadteCountDate, 1000);
  console.log(d, h, m);

    
  // local storage bet_placed
  const [bet_placed, setBet_placed] = useState(localStorage.getItem('bet_placed') || false);

  async function bet(team,betAmount){
    let fromAddress = user.address; // get sender address
    let url = "https://restricted.idena.io";
    let api_key = "idena-restricted-node-key";
    // check if daate is over
    if (new Date() > QatarWCUPfinal) {
        toast.error("Bet is closed");
        return;
    }
    // get raw tx from node
    let data={
        "method": "bcn_getRawTx",
        "params": [{
            "type": 16,
            "from": fromAddress,
            "to": team,
            "amount": (+betAmount),
            "maxFee": 0.5,
            "payload": "0x0a076465706f736974", // deposit method
            "useProto": true
        }
        ],
        "id": 1,
        "key": api_key
    }
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try{
        let result = await response.json();
        console.log(result);
        let callbackUrl = "https://i-bet.top?txsent=true";
        let tx_url = "https://app.idena.io/dna/raw?tx=" + result.result + "&callback_format=html&callback_url=" + callbackUrl;
        window.open(tx_url,'_blank').focus();
        toast.success("Bet sent successfully");
        // set bet_placed to true
        setBet_placed(true);

    }
    catch(err){
        //do something in case of error and stop execution
        // toast notification
        console.log(err);
        toast.error("Something went wrong, please try again later");
    }

  }

  // check for bet placed

  useEffect(() => {
    if (bet_placed) {
      alert("Your bet was placed, do you want to show this popup again?")
    }
  }, [bet_placed]);

  // check for txsent in url and show toast notification 10 seconds after page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txsent = urlParams.get('txsent');
    console.log(txsent);
    if (txsent)
    {
    toast.success("Bet sent successfully", { autoClose: 10000 });
    }
  }, []);
  useEffect(() => {
    let intervalId;
    if (tokensSecured) {
      const { user } = getAuthLocalStorage();
      dispatch({ type: actionNames[generalSliceName].updateUser, payload: user });
      intervalId = setInterval(() => {
        dispatch({ type: actionNames.refreshTokens });
      }, appConfigurations.refreshTokensMinutes * 60 * 1000);

      dispatch({ type: actionNames.getData });
    } else {
      dispatch({ type: actionNames[generalSliceName].updateUser, payload: null });
      intervalId && clearInterval(intervalId);

      dispatch({ type: actionNames[generalSliceName].clearData });
    }
    return () => intervalId && clearInterval(intervalId);
  }, [tokensSecured]);

  const idenaSignIn = () => {
    const token = uuidv4();
    const params = new URLSearchParams({
      token,
      callback_url: encodeURIComponent(`${appConfigurations.localBaseUrl}?token=${token}`),
      nonce_endpoint: `${appConfigurations.apiBaseUrl}/auth/start-session`,
      authentication_endpoint: `${appConfigurations.apiBaseUrl}/auth/authenticate`,
      favicon_url: `${appConfigurations.localBaseUrl}/favicon.ico`
    });

    window.location.href = `${appConfigurations.idenaSignInUrl}?` + params.toString();
  };

  const signOut = () => {
    dispatch({ type: actionNames.processlogout });
  };

  

  // craete me and states
  // oracleAdress
  // Smart contract: team1_wins, team2_wins
  // And team1, team2

  let team1 = "Argentina";
  let team2 = "France";
  let team1_address = "0x475f171af66e95b90ce5b7d35e0c96450daf5214";
  let team2_address = "0x216a263828A20f832e9C091379Ee5474Ac3DD30F";
  let url = "https://restricted.idena.io";
let api_key = "idena-restricted-node-key";
 
async function getBalance(address){
    // get data from node
    let data={
        "method": "dna_getBalance",
        "params": [address],
        "id": 1,
        "key": api_key
    }
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result;
    try{
        result = await response.json();
    }
    catch(err){
        console.log(err);
        //toast.error("Something went wrong!");
        return;
    }
    
    let num=result.result.balance;
    
    //round to 4 decimal points
    num=Math.floor(num*10000)/10000;
    return num;
}
 
async function getUserBet(userAddr,teamAddr){
    // get data from node
    let data={
        "method": "contract_readMap",
        "params": [
            teamAddr,
            "deposits",
            userAddr,
            ""
        ],
        "id": 1,
        "key": api_key
    }
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result;
    try{
        result = await response.json();
    }
    catch(err){
        console.log(err);
        //toast.error("Something went wrong!");
        return;
    }
    
    let amount = parseInt(result.result,16)/Math.pow(10,18);
    
    //round to 4 decimal points
    amount = Math.floor(amount*10000)/10000;
    return amount || 0;
}
 
async function getDepositsSum(address){
    let data={
        "method": "contract_readData",
        "params": [
            address,
            "sum",
            "hex"
        ],
        "id": 1,
        "key": api_key
    }
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result;
    try{
        result = await response.json();
    }
    catch(err){
        console.log(err);
        //toast.error("Something went wrong!");
        return;
    }
    
    let amount = parseInt(result.result,16)/Math.pow(10,18);
    
    //round to 4 decimal points
    amount = Math.floor(amount*10000)/10000;
    return amount;
}
 
async function calculateReward(userAddr,teamAddr){
    let betAmount = await getUserBet(userAddr,teamAddr);
    let prizePool = await getBalance(team1_address) + await getBalance(team2_address);
    let depositsSum = await getDepositsSum(teamAddr);
    let k = prizePool/depositsSum;
    let reward = betAmount * k;
    
    //round to 4 decimal points
    reward = Math.floor(reward*10000)/10000;
    return reward;
}
 
async function getBetsNumber(teamAddr){
    let data={
        "method": "contract_iterateMap",
        "params": [
            teamAddr,
            "deposits",
            null,
            "hex",
            "hex",
            5000
        ],
        "id": 1,
        "key": api_key
    }
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result;
    try{
        result = await response.json();
    }
    catch(err){
        console.log(err);
        //toast.error("Something went wrong!");
        return;
    }
    return result.result.items.length;
}
 
  let handleTeam1_id = "team1_handle";
  let handleTeam2_id = "team2_handle";
  //               Amount of bettors
  let team2_bettors = "team2_bettors";
  let team1_bettors = "team1_bettors";
  
  // now add to those ids the values
  // team1


  async function update(){
    document.getElementById(team1_bettors).innerHTML = await getBetsNumber(team1_address);
    document.getElementById(team2_bettors).innerHTML = await getBetsNumber(team2_address);
    document.getElementById(handleTeam1_id).innerHTML = await getBalance(team1_address);
    document.getElementById(handleTeam2_id).innerHTML = await getBalance(team2_address);

    // check for login
    if(user && user.address){
      document.getElementById("team1_bets").innerHTML = await getUserBet(user.address,team1_address);
      document.getElementById("team2_bets").innerHTML = await getUserBet(user.address,team2_address);
      document.getElementById("team1_canwin").innerHTML = await calculateReward(user.address,team1_address);
      document.getElementById("team2_canwin").innerHTML = await calculateReward(user.address,team2_address);
    }
  }
  // on page load
  update();

  let calculateReward1 = calculateReward("",team1_address);
  console.log(calculateReward1);

  // Total bets deposited for team1: getDepositsSum(team1_address);
  
  // Total bets deposited for team2: getDepositsSum(team2_address);
  
  // Bet amount on team1 for logged in user: getUserBet(user.address,team1_address);
  
  // Bet amount on team2 for logged in user: getUserBet(user.address,team2_address);
  
  // Reward from betting on team1 for logged in user: calculateReward(user.address,team1_address);
  // Potential text display: In case team1 wins you will receive back <calculateReward(user.address,team1_address)>
  
  // Reward from betting on team2 for logged in user: calculateReward(user.address,team2_address); 
  // Potential text display: In case team2 wins you will receive back <calculateReward(user.address,team2_address)>
  
  // Number of addresses that placed bets on team 1: getBetsNumber(team1_addr);
  
  // Number of addresses that placed bets on team 2: getBetsNumber(team2_addr);

  const menuClickHandler = (e) => {
    if (e.currentTarget.classList.contains('open')) {
        e.currentTarget.classList.remove('open');
    } else {
        e.currentTarget.classList.add('open');
    }
};  

  return (
    <div className="App" >
    <header className="text-zinc-200">
    <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="flex items-center p-2 gap-2">
            <img src="./images/logo_wcup-inverted.png" alt="logo" width="50" />
            <div className="font-bold text-2xl">
              WCUP: <span className="text-sky-900">iDNA bet</span>
            </div>
          </div>
          <div className="block md:hidden ml-auto pr-4 my-auto cursor-pointer">
          <div id="mobile-menu-button" className="group peer" onClick={menuClickHandler}>
              <div className="top-0 bg-zinc-200 rounded-full w-8 h-1 group-open:rotate-45 group-open:top-2 relative transition-all"></div>
              <div className="transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0"></div>
              <div className="top-0 group-open:-rotate-45 transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 group-open:-top-2 relative"></div>
            </div>
            <div className="absolute top-[62px] left-0 hidden w-full bg-gradient-to-r from-rose-500 to-pink-500 peer-open:block">
              <div className="relative flex h-full cursor-pointer items-center justify-center p-4 font-bold text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <span>{tokensSecured ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => idenaSignIn()}>Sign in with Idena</button>}</span>
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
          <div className="md:flex hidden flex-1 items-center justify-end">
            <div className="menu-item">
              <span>{tokensSecured ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => idenaSignIn()}>Sign in with Idena</button>}</span>
            </div>
            <div className="menu-item group">
              <span><pre>Support </pre></span>
              <div className="group-hover:block hidden absolute bg-pink-500 top-full right-0 whitespace-nowrap rounded-b-md text-right">
                <div className="p-4 font-bold hover:bg-white/5 hover:text-zinc-200 transition-colors ease-in-out cursor-pointer text-pink-200">
                  <span><a href="https://t.me/ltrvlr" target="_blank" rel="noopener noreferrer">Telegram</a></span>
                </div>
                <div className="p-4 font-bold hover:bg-white/5 hover:text-zinc-200 transition-colors ease-in-out cursor-pointer text-pink-200">
                  <span><a href='https://discordapp.com/users/749316657318723705' target="_blank" rel="noopener noreferrer">Discord</a></span>
                </div>
              </div>
            </div>
          </div>  
        </nav>
        <MainAnimation />
      <div className="bg-cover bg-center bg-fixed flex flex-col items-center justify-center h-[calc(100vh)] min-h-[400px]">
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
          <div className="text-5xl font-bold">
          <span className="text-zinc-200">i</span>
          <span className="text-sky-900">DNA</span>
          <span className="text-zinc-200">bet</span>
          </div>
          <div className="font-bold mt-3 text-base backdrop-blur-md
            white-text
          ">
      Bets for the FINAL will be available after December 14th 9pm GMT.
          </div>
          <div className="lg:grid grid-cols-2 grid-rows-1 gap-6">
          <div className="mt-3">
          <div className="white-text2  bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> <span className="text-[#6CACE4]">{team1?.substring(0,3)}</span><span className="text-white">{team1?.substring(3,5)}</span><span className="text-[#FFB81C]">{team1?.substring(5)}</span></h3>
            </div>
            <div className="mt-3 flex gap-2">
            <div className="bg-pink-400/70 mt-3 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <table className="mt-5 table w-full border border-zinc-500 border-collapse">
          <tbody>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">Handle</td>
              <td className="border border-zinc-500 p-3 text-base font-bold"
               id = "team1_handle"
              ></td>
            </tr>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">
              Number of bettors
              </td>
              <td className="border border-zinc-500 p-3 text-base font-bold"
              id="team1_bettors"
              >
            </td>
          </tr>
          {
              user && (
              <tr>
                <td className="border border-zinc-500 p-3 text-lg">Your bet</td>
                <td className="border border-zinc-500 p-3 text-base font-bold"
                id="team1_bets">
              </td>    
            </tr>
              )
          }
          {
              user && (
              <tr>
                <td className="border border-zinc-500 p-3 text-lg">Can win</td>
                <td className="border border-zinc-500 p-3 text-base font-bold"
                id="team1_canwin">
              </td>    
            </tr>
              )
          }          
          

          </tbody>
          
          <caption className="caption-bottom p-2">
            <div className="text-white flex items-center justify-center gap-2">
            <input type="number" id="team1_bet" placeholder='iDNA' className="rounded-lg border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
              {
                user && (
                  <div className="truncate cursor-pointer rounded-lg bg-pink-500 py-2.5 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg"
                  onClick={() => bet(team1_address, document.getElementById('team1_bet').value)}
                  >
                  Place Bet
                </div>
                )
              }
              {
                !user && (
                  <div className="truncate cursor-pointer rounded-lg bg-pink-500 py-2.5 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Sign in to place bet
                  </div>
                )
              }
            </div>
          </caption>
        </table>
              
              </div>
            </div>
          </div>
          <div className="mt-3">
          <div className="white-text2 bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> <span className="text-[#002654]">{team2?.substring(0,2)}</span><span className="text-white">{team2?.substring(2,4)}</span><span className="text-[#ED2939]">{team2?.substring(4)}</span></h3>
            </div>
            <div className="mt-3 flex gap-2">
            <div className="bg-pink-400/70 mt-3 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <table className="mt-5 table w-full border border-zinc-500 border-collapse">
          <tbody>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">Handle</td>
              <td className="border border-zinc-500 p-3 text-base font-bold"
                id = "team2_handle"
              ></td>
            </tr>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">
              Number of bettors
              </td>
              <td className="border border-zinc-500 p-3 text-base font-bold"
              id="team2_bettors"
              >

              </td>
              
            </tr>
            {
              user && (
              <tr>
                <td className="border border-zinc-500 p-3 text-lg">Your bet</td>
                <td className="border border-zinc-500 p-3 text-base font-bold"
                id="team2_bets">
              </td>    
            </tr>
              )
          }
          {
              user && (
              <tr>
                <td className="border border-zinc-500 p-3 text-lg">Can win</td>
                <td className="border border-zinc-500 p-3 text-base font-bold"
                id="team2_canwin">
              </td>    
            </tr>
              )
          }   
          </tbody>
                <caption className="caption-bottom p-2">
                  <div className="text-white flex items-center justify-center gap-2">
                  <input type="number" id="team2_bet" placeholder='iDNA' className="rounded-lg border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
                    {
                      user && (
                        <div className="truncate cursor-pointer rounded-lg bg-pink-500 py-2.5 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg"
                        onClick={() => bet(team2_address, document.getElementById('team2_bet').value)}
                        >
                        Place Bet
                      </div>
                      )
                    }
                    {
                      !user && (
                        <div className="truncate cursor-pointer rounded-lg bg-pink-500 py-2.5 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                        Sign in to place bet
                        </div>
                      )
                    }
                  </div>
                </caption>
              </table>
              
              </div>
            </div>
        </div>
        </div>
      </div>
      </header>
      <div className="mt-16 backdrop-blur-md bg-cover bg-center bg-fixed">
      <div className=" max-w-screen-lg mx-auto text-zinc-900 dark:text-zinc-200">
        <h2
        className = "text-3xl font-bold text-center text-zinc-200"
        >
          Teams
        </h2>
        <p         className = "text-3xl font-bold text-center text-zinc-200"
>
          Experience the first bet challenge in iDNA with iDNA better service. Put your bets in iDNA for the final march of soccer!
        </p> 
 
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="timer-circle">
            <div>
              <span className="timer-count" id="days">{d >= 10 ? d : `0${d}`}</span>
              <span  className="timer-type" >Days</span>
            </div>
            </div>
            <div className="timer-circle">
            <div>
                <span className="timer-count" id="hours">{h >= 10 ? h : `0${h}`}</span>
                <span className="timer-type">Hours</span>
            </div>
            </div>
            <div className="timer-circle">
            <div>
                
                <span className="timer-count" id="minutes"> {m >= 10 ? m : `0${m}`}</span>
                <span className="timer-type">Minutes</span>
            </div>
            </div>
  
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
