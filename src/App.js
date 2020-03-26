import React, { Component } from 'react';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import firebase from "firebase/app";
import "firebase/auth";
import { login, logout } from 'utils/auth';
import API from 'utils/API';

var firebaseConfig = {
  apiKey: "AIzaSyDBxtpy4QlnhPfGK7mF_TnbLXooEXVPy_0",
  authDomain: "acessa-city.firebaseapp.com",
  databaseURL: "https://acessa-city.firebaseio.com",
  projectId: "acessa-city",
  storageBucket: "acessa-city.appspot.com",
  messagingSenderId: "810134304715",
  appId: "1:810134304715:web:040e88d44425f0e9f5684e",
  measurementId: "G-VFS8ZJ3ECW"
};

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

firebase.initializeApp(firebaseConfig);
firebase.auth().onIdTokenChanged(function(user) {
  if (user) {
    API.post('/auth')
  }
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.getIdToken()
      .then((token) => {
        login(token)
      })    
    // ...
  } else {
    logout()
  }
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
