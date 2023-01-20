import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

import Page from './page.js';
function Menu() {
  let Match1 = [
    new Date('2023-01-28 14:30:00 GMT-0500'),
    'Palmeiras',
    'Flamengo',
    '0x8e897f34a3072f7d56af67b10364e4eaf9d4b777',
    '0x48CCa2E6A69e11e7FD577c0EF6cCA8937f1E10A9',
    'Supercopa do Brasil',
    '#006434',
    '#FFFFFF',
    '#006434',
    '#FFFFFF',
    '#C6210B',
    '#000000',
    { t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '6', t1_c3_s1: '6', t2_c1_s1: '0', t2_c1_s2: '3', t2_c2_s1: '3', t2_c2_s2: '6', t2_c3_s1: '6' },
    'https://twitter.com/CBF_Futebol/status/1613692198910033922?cxt=HHwWhIDQzaqg_uQsAAAA'
  ];
  let Match2 = [
    new Date('2023-01-28 14:30:00 GMT-0500'),
    'Palmeiras',
    'Flamengo',
    '0x8e897f34a3072f7d56af67b10364e4eaf9d4b777',
    '0x48CCa2E6A69e11e7FD577c0EF6cCA8937f1E10A9',
    'Supercopa do Brasil',
    '#006434',
    '#FFFFFF',
    '#006434',
    '#FFFFFF',
    '#C6210B',
    '#000000',
    { t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '6', t1_c3_s1: '6', t2_c1_s1: '0', t2_c1_s2: '3', t2_c2_s1: '3', t2_c2_s2: '6', t2_c3_s1: '6' },
    'https://twitter.com/CBF_Futebol/status/1613692198910033922?cxt=HHwWhIDQzaqg_uQsAAAA'
  ];
  let Match3 = [
    new Date('2023-01-28 14:30:00 GMT-0500'),
    'Palmeiras',
    'Flamengo',
    '0x8e897f34a3072f7d56af67b10364e4eaf9d4b777',
    '0x48CCa2E6A69e11e7FD577c0EF6cCA8937f1E10A9',
    'Supercopa do Brasil',
    '#006434',
    '#FFFFFF',
    '#006434',
    '#FFFFFF',
    '#C6210B',
    '#000000',
    { t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '6', t1_c3_s1: '6', t2_c1_s1: '0', t2_c1_s2: '3', t2_c2_s1: '3', t2_c2_s2: '6', t2_c3_s1: '6' },
    'https://twitter.com/CBF_Futebol/status/1613692198910033922?cxt=HHwWhIDQzaqg_uQsAAAA'
  ];
  let Match4 = [
    new Date('2023-01-28 14:30:00 GMT-0500'),
    'Palmeiras',
    'Flamengo',
    '0x8e897f34a3072f7d56af67b10364e4eaf9d4b777',
    '0x48CCa2E6A69e11e7FD577c0EF6cCA8937f1E10A9',
    'Supercopa do Brasil',
    '#006434',
    '#FFFFFF',
    '#006434',
    '#FFFFFF',
    '#C6210B',
    '#000000',
    { t1_c1_s1: '0', t1_c1_s2: '3', t1_c2_s1: '3', t1_c2_s2: '6', t1_c3_s1: '6', t2_c1_s1: '0', t2_c1_s2: '3', t2_c2_s1: '3', t2_c2_s2: '6', t2_c3_s1: '6' },
    'https://twitter.com/CBF_Futebol/status/1613692198910033922?cxt=HHwWhIDQzaqg_uQsAAAA'
  ];
  const [matches] = React.useState([Match1, Match2, Match3, Match4]);
  const [page, setPage] = React.useState(0);
  const renderMatches = () => {
    return (
      <div className="text-center lg:mx-20 md:mx-1 mt-10 grid grid-cols-2 lg:gap-6 md:gap-3 justify-items-center text-blue-500">
        {matches.map((match, index) => (
          <div
            className="bg-pink-400/70 text-white outline-zinc-500 mt-4 rounded-xl hover:border-purple-400 hover:scale-105 transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-fuchsia-200 border border-gray-300 p-4 lg:w-2/5 md:m-4"
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
        ))}
      </div>
    );
  };

  if (page === 0) {
    return (
      <div>
        <nav className="sticky z-10 flex top-0 bg-gradient-to-r from-rose-500 to-pink-500">
          <div className="flex flex-1 items-center justify-center">
            <div className="menu-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16.933 16.933">
                <g transform="translate(0 -280.067)">
                  <path
                    d="M8.468 281.16a7.377 7.377 0 00-7.374 7.373 7.378 7.378 0 007.374 7.373 7.376 7.376 0 007.37-7.373 7.376 7.376 0 00-7.37-7.372zm0 .53c.862 0 1.686.16 2.446.45l-2.055.53-1.854-.822c.471-.103.96-.158 1.463-.158zm-2.263.384l2.34 1.035-.315 2.603-2.598 1.868c-.694-.296-1.387-.595-2.08-.893l.037-2.954a6.84 6.84 0 012.616-1.66zm5.477.417a6.861 6.861 0 012.328 2.03l-.373 2.4-2.318.701-2.557-1.879.323-2.586zm-8.628 1.856l-.032 2.423-1.397 1.699a6.813 6.813 0 011.43-4.122zm11.386.847c.553.988.87 2.126.87 3.34l-.001.023-1.158-1.504zm-5.966.997l2.481 1.823-.966 2.922c-1.026-.005-2.052-.012-3.078-.019l-.936-2.93zm-5.107.994c.694.297 1.388.595 2.081.894.327 1.02.652 2.042.977 3.064-.38.59-.762 1.18-1.144 1.77l-2.494-.56a6.805 6.805 0 01-1.125-3.095zm10.408.248l1.483 1.927a6.805 6.805 0 01-1.138 3.032l-2.213.411-1.427-1.66.996-3.012zm-6.917 4.017l3.2.016 1.428 1.67-1.106 1.969a6.85 6.85 0 01-3.435.1l-1.223-1.997 1.136-1.758zm-3.566 1.56l1.956.438.943 1.54a6.845 6.845 0 01-2.9-1.978zm10.342.01a6.85 6.85 0 01-2.497 1.818l.848-1.51z"
                    vectorEffect="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="menu-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" data-name="Layer 1 copy 2" viewBox="0 0 64 64">
                <path d="M57.871.237a1 1 0 00-1.356.4l-8.636 15.885a1 1 0 101.757.955l8.636-15.884a1 1 0 00-.401-1.356z"></path>
                <path d="M63.435 3.3a1 1 0 00-1.354.408L48.437 29.129l-3.872-2.323 2.353-4.328a1 1 0 10-1.757-.955L32.813 44.236A4.971 4.971 0 0128.341 47H10.575a7.03 7.03 0 00-6.73 5.077l-.572 2A7 7 0 0010 63h18.341a6.949 6.949 0 006.247-3.844l7.722-14.385.008-.01v-.014l7.344-13.681c.005-.008.013-.014.018-.023s.006-.022.012-.033l14.15-26.352a1 1 0 00-.407-1.358zM47.49 30.893l-6.417 11.955-3.943-2.366 6.479-11.917zM6.012 59.011a4.958 4.958 0 01-.812-4.385l.572-2A5.021 5.021 0 0110.575 49h4.148L11.3 61H10a4.96 4.96 0 01-3.988-1.989zM13.375 61L16.8 49h4.92l-3.425 12zm19.438-2.764A4.971 4.971 0 0128.341 61h-7.966L23.8 49h4.538a6.946 6.946 0 006.245-3.839l1.587-2.92 3.953 2.371zM55 48c-4.561 0-8 1.935-8 4.5v6c0 2.565 3.439 4.5 8 4.5s8-1.935 8-4.5V53a.941.941 0 00-.03-.147A2.814 2.814 0 0063 52.5c0-2.565-3.439-4.5-8-4.5zm0 2c3.717 0 6 1.456 6 2.5S58.717 55 55 55s-6-1.456-6-2.5 2.283-2.5 6-2.5zm0 11c-3.717 0-6-1.456-6-2.5v-2.968A11.463 11.463 0 0055 57a11.463 11.463 0 006-1.468V58.5c0 1.044-2.283 2.5-6 2.5zM39.416 11.573a1 1 0 001.641-1.145 22.007 22.007 0 00-30.629-5.484 1 1 0 101.145 1.641 20.006 20.006 0 0127.844 4.988z"></path>
                <path d="M8.015 8.255a1 1 0 00-1.415.078 21.94 21.94 0 00-4.3 7.237.972.972 0 00-.05.151A21.983 21.983 0 001 23v13a1 1 0 00.143.515l3 5A1 1 0 005 42h20a1 1 0 00.857-.485l3-5c.012-.02.012-.044.023-.065a1.408 1.408 0 00.106-.383c0-.023.013-.043.013-.067V16a1 1 0 00-1-1H10a1 1 0 100 2h.613l-1.562 4.684A1 1 0 009 22v3H3v-2a19.989 19.989 0 01.938-6H6a1 1 0 100-2H4.689a19.94 19.94 0 013.4-5.333 1 1 0 00-.074-1.412zM3 35.723V35h6v1a1.008 1.008 0 00.071.372L10.523 40H5.566zm24-5.444l-7 2.333v-5.891l7-2.333zM18 33h-7v-6h7zm0 2v1a1.008 1.008 0 00.071.372L19.523 40h-6.846L11 35.808V35zm6.434 5h-2.757L20 35.808v-1.087l7-2.333v3.335zM27 22.279l-7 2.333v-2.45L21.721 17H27zm-16-.117L12.721 17h6.892l-1.561 4.684A1 1 0 0018 22v3h-7zM9 27v6H3v-6zM36 15h-2a1 1 0 000 2h2a1 1 0 000-2zM36 21h-2a1 1 0 000 2h2a1 1 0 000-2zM28.156 9a1 1 0 000 2h.969a1 1 0 000-2zM34 10a1 1 0 00-1-1h-.969a1 1 0 000 2H33a1 1 0 001-1z"></path>
              </svg>
            </div>
            <div className="menu-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 479.998 479.998">
                <path d="M385.21 50.397C369.757 22.586 330.698 4.463 278.047.675c-27.702-1.993-56.421.463-80.856 6.918-27.025 7.139-47.187 18.629-58.305 33.229-43.987 57.766-43.473 163.815-2.885 220.803a8 8 0 0013.033-9.282c-37.538-52.705-36.283-150.789 2.582-201.827 35.615-46.775 188.819-47.76 219.607 7.653 42.935 77.273 36.51 148.945 23.561 195.464-15.273 54.866-43.284 90.062-52.391 95.496a8.029 8.029 0 00-3.772 5.475c-.201 1.138-.129-4.756-.129 93.395 0 8.822-7.178 16-16 16h-73v-38.855c0-11.659 9.486-21.145 21.146-21.145h39.112a8 8 0 000-16h-39.112c-20.482 0-37.146 16.663-37.146 37.145v38.855h-74c-8.822 0-16-7.178-16-16v-84h48v54.032a8 8 0 0016 0v-54.032h91.936a8 8 0 000-16H137.572c-4.151-2.349-7.541-4.547-10.31-7.176-22.936-21.772-40.378-50.84-47.855-79.751-7.313-28.279-4.029-52.971 9.012-67.744a8 8 0 10-11.994-10.589c-16.859 19.098-21.301 48.339-12.508 82.339 8.207 31.733 27.281 63.571 52.33 87.35 3.438 3.263 7.333 5.902 11.246 8.222V448c0 17.645 14.355 32 32 32h163c17.645 0 32-14.355 32-32v-87.93c15.941-13.022 41.794-52.172 55.706-102.145 13.752-49.406 20.58-125.513-24.989-207.528z"></path>
              </svg>
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
