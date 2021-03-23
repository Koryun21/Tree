import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Components/Wrapper';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from "react-redux";
import { createStore , applyMiddleware} from 'redux';
import RootReducer from './Redux/Reducer/RootReducer';
import ReduxThunk from "redux-thunk";

const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
  <Provider store = {store}>
    <Wrapper />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
