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
  

  return (
    <div className="App" >

    <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="flex items-center p-2 gap-2">
            <img src="./images/logo_wcup-inverted.png" alt="logo" className="w-12 h-12" />
            <div className="font-bold text-2xl">
              WCUP: <span className="text-sky-900">iDNA bet</span>
            </div>
          </div>
          <div className="md:flex hidden flex-1  justify-end">
          {user && (
                  <img  src={`https://robohash.org/${user.address}?set=set1`} 
                  style={{width: '30px', height: '30px', borderRadius: '50%'}}
                  />
            )}
            <div className="menu-item">
            {tokensSecured ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => idenaSignIn()}>Sign in with Idena</button>}
            </div>
          </div>
          <div className="block md:hidden ml-auto pr-4 my-auto cursor-pointer">
            {user && (
                    <img  src={`https://robohash.org/${user.address}?set=set1`} 
                    style={{width: '30px', height: '30px', borderRadius: '50%'}}
                    />
              )}
            {tokensSecured ? <button className="white-text2" onClick={() => signOut()}>Sign Out</button> : <button className="white-text2" onClick={() => idenaSignIn()}>Sign in with Idena</button>}

          </div>
        </nav>
      <div className="Container">
 

      <div style= {{
        marginTop: '50px',
      }}
      className="bg-cover bg-center bg-fixed flex flex-col items-center justify-center h-[calc(100vh-200px)] min-h-[400px]">
              <MainAnimation />

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
          <div className="mt-3">
          <div className="white-text2  bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> { team1 } Wins</h3>
            </div>
            <div className="mt-3 flex gap-2">
              <input type="number" id="team1_bet" placeholder='iDNA' className="rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
              {
                user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg"
                  onClick={() => bet(team1_address, document.getElementById('team1_bet').value)}
                  >
                  Place Bet
                </div>
                )
              }
              {
                !user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Sign in to place bet
                  </div>
                )
              }
          </div>
          <p className="text-center mt-3 text-sm font-bold">
          </p>
          <div className="white-text2  bg-pink-400/70 py-2 px-4 rounded-xl text-center backdrop-blur-md">
            <h3> { team2 } Wins</h3>
            </div>
            <div className="mt-3 flex gap-2">
              <input type="number" id="team2_bet" placeholder='iDNA' className="rounded-sm border border-white/40 bg-white/30 backdrop-blur-md p-2 font-bold text-sky-900 placeholder-zinc-500 caret-pink-500 outline-pink-500"/>
              {
                user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg"
                  onClick={() => bet(team2_address, document.getElementById('team2_bet').value)}
                  >
                  Place Bet
                </div>
                )
              }
              {
                !user && (
                  <div className="white-text2  cursor-pointer rounded-sm bg-pink-500 py-2 px-4 font-bold transition-colors hover:bg-sky-900 hover:shadow-lg">
                  Sign in to place bet
                  </div>
                )
              }
          </div>
        </div>
      </div>
      <div 
      style={
        {
          marginTop: '40px',
        }
      }
      className="backdrop-blur-md bg-cover bg-center bg-fixed flex flex-col items-center justify-center h-[calc(100vh-200px)] min-h-[400px]">
      <div className=" max-w-screen-lg mx-auto mt-20 text-zinc-900 dark:text-zinc-200">
        <h2
        className = "text-3xl font-bold text-center text-zinc-200"
        >
          Teams
        </h2>
        <p         className = "text-3xl font-bold text-center text-zinc-200"
>
          Experience the first bet challenge in iDNA with iDNA better service. Put your bets in iDNA for the final march of soccer!
        </p> 
 
          <div className=" flex flex-wrap justify-center gap-3">

            <div className="timer-circle">
            <div>
              <span className="timer-count" id="days">{d >= 10 ? d : `0${d}`}</span>
              <span  className="timer-type" >Days</span>
            </div>
            </div>
            <div className="timer-circle">
            <div>
                <span className="timer-count" x-text="days"> {h >= 10 ? h : `0${h}`}</span>
                <span className="timer-type">Hours</span>
            </div>
            </div>
            <div className="timer-circle">
            <div>
                
                <span className="timer-count" x-text="days"> {m >= 10 ? m : `0${m}`}</span>
                <span className="timer-type">Minutes</span>
            </div>
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
