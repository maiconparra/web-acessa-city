import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

import { PrefecturesToolbar, PrefecturesTable } from './components';

import {
   Button
}from '@material-ui/core';

import API from '../../../utils/API';
import firebase from 'firebase/app'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PrefecturesList = () => {
  const classes = useStyles();


  // Atualizar os dados na tela
  useEffect(() => {

    },[]);


  return (
    <div className={classes.root}>
      {/* <DenunciationsToolbar save={save} /> */}
       <PrefecturesToolbar />
      <div className={classes.content}>
        <PrefecturesTable/>
      </div>

    </div>
  );
};

export default PrefecturesList;
