import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this imports Tailwind
import App from './App';
// index.js
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);