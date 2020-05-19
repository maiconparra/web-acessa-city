import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProfileContent } from './components';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button
// } from '@material-ui/core';

import API from '../../../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  close: {
    padding: theme.spacing(0.5),
  },

}));

function MyApp(variant) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const handleClickError = (variant) => () => {
    enqueueSnackbar('Mensagem de Erro!', { variant },

    );
  };
  
  const handleClickSuccess = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Mensagem de Sucesso!', { variant });
  };

  const handleClickWarning = (variant) => () => {
    enqueueSnackbar('Mensagem de Alerta!', { variant });
  };

  const handleClickInfo = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Mensagem de Info!', { variant });
  };

  const handleClickDefault = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Mensagem Default!', { variant });
  };




  return (
    <React.Fragment>
      <Button onClick={handleClickError('error')}>Erro</Button>
      <Button onClick={handleClickSuccess('success')}>Sucesso</Button>
      <Button onClick={handleClickWarning('warning')}>Alerta</Button>
      <Button onClick={handleClickInfo('info')}>info</Button>
      <Button onClick={handleClickDefault('default')}>default</Button>
    </React.Fragment>
  );
}

const ProfileCoodinator = () => {
  const classes = useStyles();

  const envioPassword = (password) => {
    console.log("senha recuperada:", JSON.stringify(password));
  }



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ProfileContent envioPassword={envioPassword} />
      </div>

      <SnackbarProvider maxSnack={3}>
        <MyApp />
      </SnackbarProvider>


    </div>
  );
};

export default ProfileCoodinator;


