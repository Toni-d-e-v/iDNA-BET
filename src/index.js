import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { jwtInterceptor } from './core/init';
import generalReducer from './core/reducer';
import createSagaMiddleware from 'redux-saga';
import appRootSaga from './core/sagas';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    general: generalReducer
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), sagaMiddleware]
});
sagaMiddleware.run(appRootSaga);

jwtInterceptor();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
