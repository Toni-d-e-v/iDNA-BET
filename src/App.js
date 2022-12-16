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


  const QatarWCUPfinal = new Date(`Dec 18, 2022 18:00:00`).getTime();
  function upadteCountDate() {
    const currentTime = new Date();
    const diff = QatarWCUPfinal - currentTime;

    setDa(Math.floor(diff / 1000 / 60 / 60 / 24));
    setHa(Math.floor(diff / 1000 / 60 / 60) % 24);
    setMa(Math.floor(diff / 1000 / 60) % 60);
  }
  setInterval(upadteCountDate, 1000);
  console.log(d, h, m);

    

  async function bet(team,betAmount){
    let fromAddress = user.address; // get sender address
     
    let url = "https://restricted.idena.io";
    let api_key = "idena-restricted-node-key";
    
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

    }
    catch(err){
        //do something in case of error and stop execution
        // toast notification
        console.log(err);
        toast.error("Something went wrong, please try again later");
    }

  }
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

  let team1 = "France";
  let team2 = "Morocco";
  let team1_address = "0x4bA050B3089c1f35DDD3C3eA4f36Df0E6C481820";
  let team2_address = "0x23bec00da93aD33Ed4B9eF8DcBbac6CBA562a4dA";
  
  
  // let oracleAddress = "0x0000000000000000000000000000000000000000";
  // let team1_wins = 0;
  // let team2_wins = 0;
  // make it global
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
          <div id="mobile-menu-button" className="group peer">
              <div className="top-0 bg-zinc-200 rounded-full w-8 h-1 group-open:rotate-45 group-open:top-2 relative transition-all"></div>
              <div className="transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 opacity-100 group-open:opacity-0"></div>
              <div className="top-0 group-open:-rotate-45 transition-all bg-zinc-200 rounded-full w-8 h-1 mt-1 group-open:-top-2 relative"></div>
            </div>
            <div className="absolute top-[62px] left-0 hidden w-full bg-gradient-to-r from-rose-500 to-pink-500 peer-open:block">
              <div className="relative flex h-full cursor-pointer items-center justify-center p-4 font-bold text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <span>{tokensSecured ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => idenaSignIn()}>Sign in with Idena</button>}</span>
              </div>
              <div className="relative flex h-full cursor-pointer items-center justify-center p-4 font-bold text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
              <span>{tokensSecured ? <button className="white-text2" onClick={() => signOut()}>Sign Out</button> : <button className="white-text2" onClick={() => idenaSignIn()}>Sign in with Idena</button>}</span>
              </div>
              <div id="ticket-menu-item" className="group relative h-full cursor-pointer text-pink-200 hover:text-zinc-200 transition-colors hover:bg-white/10">
                <div className="p-4 text-center font-bold">Support</div>
                <div className="hidden group-open:block">
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span><a href='https:/t.me/ltrvlr' target="_blank" rel="noopener noreferrer">Telegram</a></span>
                  </div>
                  <div className="p-4 text-center relative text-pink-200 hover:text-zinc-200 hover:bg-white/5 transtiion-colors ease-in-out">
                    <span><a href='https://discordapp.com/users/749316657318723705' target="_blank" rel="noopener noreferrer">Discord</a></span>
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
                  <span><a href='https:/t.me/ltrvlr' target="_blank" rel="noopener noreferrer">Telegram</a></span>
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
            <h3> <span className="text-[#002654]">{team1?.substring(0,2)}</span><span className="text-white">{team1?.substring(2,4)}</span><span className="text-[#ED2939]">{team1?.substring(4)}</span></h3>
            </div>
            <div className="mt-3 flex gap-2">
            <div className="bg-pink-400/70 mt-3 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <table className="mt-5 table w-full border border-zinc-500 border-collapse">
          <tbody>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">Prize fund</td>
              <td className="border border-zinc-500 p-3 text-base font-bold">5000</td>
            </tr>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">
                Single bet
              </td>
              <td className="border border-zinc-500 p-3 text-base font-bold">
                100
              </td>
            </tr>
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
            <h3> <span className="text-[#c1272d]">{team2?.substring(0,3)}</span><span className="text-white">{team2?.substring(3,4)}</span><span className="text-[#006233]">{team2?.substring(4,7)}</span></h3>
            </div>
            <div className="mt-3 flex gap-2">
            <div className="bg-pink-400/70 mt-3 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <table className="mt-5 table w-full border border-zinc-500 border-collapse">
          <tbody>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">Prize fund</td>
              <td className="border border-zinc-500 p-3 text-base font-bold">5000</td>
            </tr>
            <tr>
              <td className="border border-zinc-500 p-3 text-lg">
                Single bet
              </td>
              <td className="border border-zinc-500 p-3 text-base font-bold">
                100
              </td>
            </tr>
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
