import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import {createStore, applyMiddleware} from "redux"
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store = {store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>, 
  document.getElementById('root')
);