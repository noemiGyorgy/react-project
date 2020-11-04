import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './context/ThemeContext';
import { DataContextProvider } from "./context/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
