import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer, { initialState } from "./reducer"
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* Wraps the App by StateProvider which is like a data layer,
    which pushes information into the data layer and so we could pull it 
    as well from any component. Also helps to push the user into the data
    layer whenever we need it */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
