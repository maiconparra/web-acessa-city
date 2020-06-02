import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import moment from 'moment';

import { CitizensToolbar, CitizensTable } from './components';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import API from '../../../utils/API';
// import currentUser from 'utils/AppUser';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CitizensList = () => {
  const classes = useStyles();

  ////Modal de errro

  const [errors, setErrors] = useState([]);
  const [errorsStatus, setErrorsStatus] = useState('');
  const [citizens, setCitizens] = useState([]);
  const [citizensBackup, setCitizensBackup] = useState([]);
  const [openValidador, setOpenValidador] = React.useState(false);
  const handleCloseValidador = () => {
    setOpenValidador(false);
  };


  const handleSnackClick = () => {
    setErrors([]);
  }

  // CHAMAR API DE USUARIOS
  const listCitizens = () => {
      API.get('/user')
        .then(response => {
          const CitizensList = response.data;
          setCitizens(CitizensList)
          setCitizensBackup(CitizensList)
        })
        .catch((aError) => {
          if (aError.response.status == 400) {
            setOpenValidador(false)
            console.log(aError.response.data.errors)
            setErrors(aError.response.data.errors)

            setTimeout(() => {
              setErrors([]);
            }, 10000);
          }
          else if (aError.response.status == 500) {
            setErrors([
              "Erro no servidor"
            ])

            setTimeout(() => {
              setErrors([]);
            }, 10000);
          }
          setErrorsStatus(false)
          setOpenValidador(false)
        })
  }

  // FILTRAR USUÀRIOS
  const filter = (citizenFilter) =>{

    console.log("filtro",  citizenFilter.firstName)

  
      const listaFiltrada = citizensBackup.filter(function(citizen){

        let retornaCitizen = true

        if(citizenFilter.firstName){
          retornaCitizen = retornaCitizen && citizen.firstName.toUpperCase().includes(citizenFilter.firstName.toUpperCase());
        }
    
        if(citizenFilter.email){
          retornaCitizen = retornaCitizen && citizen.email.toUpperCase().includes(citizenFilter.email.toUpperCase());
        }
        return retornaCitizen ;
      })
       setCitizens(listaFiltrada);

  }


  const limpar = () =>{  
    setCitizens(citizensBackup)
  }

  const onCreateUser = (citizen) =>{
      if(citizen){
        listCitizens();
      }
  }

  // Atualizar os dados na tela
  React.useEffect(() => {
    listCitizens();
  }, []);


  const erros = () => {
    if (errorsStatus == true) {
      return (
        <div>
          {errors.map(error => (
            <SnackbarContent
              style={{
                background: 'green',
              }}
              message={<h3>{error}</h3>} />
          ))}
        </div>)
    } else {
      return (
        <div>
          {errors.map(error => (
            <SnackbarContent autoHideDuration={1}
              style={{
                background: 'red',
              }}
              message={<h3>{error}</h3>}
            />
          ))}
        </div>)
    }
  }

  return (
    <div className={classes.root}>
      {/* <DenunciationsToolbar save={save} /> */}

      <CitizensToolbar   filter={filter} onClearFilter={limpar}  onCreateUser={onCreateUser}/>   
      <div className={classes.content}>
        <CitizensTable citizens={citizens} />
      </div>

      <Snackbar open={errors.length} onClick={handleSnackClick}>
        {erros()}
      </Snackbar>
      <Backdrop className={classes.backdrop} open={openValidador} onClick={handleCloseValidador}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  );
};

export default CitizensList;