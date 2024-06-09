import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {thunk} from 'redux-thunk';
import Reducers from "./reducers";

const store=createStore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
      <Toaster/>
    </React.StrictMode>
  </Provider>
);