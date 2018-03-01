import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'




ReactDOM.render((
  <MuiThemeProvider>
  <Router>
    <App/>
  </Router>
  </MuiThemeProvider>
),document.getElementById('root'));
