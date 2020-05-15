import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { DenunciationsToolbar, DenunciationsTable } from './components';

import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Button
}from '@material-ui/core';

import API from '../../../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const DenunciationList = () => {
  const classes = useStyles();

  const [denunciations, setDenunciations] = useState([]);
  const [denunciationsSlect, setDenunciationsSelect] = useState([]);
  const [coodenadores, setCoordenadores] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');



   //Enviar coodenador 
  const envioCoordenador = (update) => {
      
    API.post(`/report/${update.reportId}/coordinator-update`,update
    ).then(response => {
        const newCoodenador = response.data;
        console.log(newCoodenador)
       //setDenunciations(  [...denunciations, newDenunciation])
       }).catch(erro => {
        console.log(erro);
      })
  }


    //Negar denuncia
    const envioDeny = (deny) => {

       console.log("negação" + JSON.stringify(deny));
      API.post(
      ).then(response => {
          const newCoodenador = response.data;
          console.log(newCoodenador)
         //setDenunciations(  [...denunciations, newDenunciation])
         }).catch(erro => {
          console.log(erro);
        })
    }

  
    // Listar coordenadores
    const listCoodenador = () => {
      API.get('/user/96ff2b0a-9220-4200-9081-7ae172bb0bf4/coordinators'
      ).then(response => {
         const listCoodenadores = response.data;
         console.log("cooodenadorrr" +  JSON.stringify(listCoodenadores))
         setCoordenadores(listCoodenadores);
         }).catch(erro => {
          console.log(erro);
          setMensagem('Ocorreu um erro', erro);
          setOpenDialog(true);
        })
    }


  // Listar os dados  na tela
  const listDenunciations = () => {
    API.get('/report'
    ).then(response => {
       const listDenunciations2 = response.data;
       console.log(listDenunciations2);
       setDenunciations(listDenunciations2);
       setDenunciationsSelect(listDenunciations2);
       }).catch(erro => {
        console.log(erro);
        setMensagem('Ocorreu um erro', erro);
        setOpenDialog(true);
      })
  }

 //Fitrar Denuncias
  const filter = (filtro) =>{
    API.get(`/report?category=${filtro.category}&street=${filtro.street}&neighborhood=${filtro.neighborhood}&creationDate=${filtro.creationDate}`,
    ).then(response => {
      const filterDenunciation = response.data;
      setDenunciations(filterDenunciation);
      setMensagem('Filtro realizado com sucesso!');
      setOpenDialog(true);
       }).catch(erro => {
        console.log(erro);
        setMensagem('Ocorreu um erro', erro);
        setOpenDialog(true);
      })
  }


  // Atualizar os dados na tela
  useEffect(() => {
    listDenunciations();
    listCoodenador();
  },[]);


  return (
    <div className={classes.root}>
      {/* <DenunciationsToolbar save={save} /> */}
       <DenunciationsToolbar denunciationsSlect={denunciationsSlect}  filter={filter}/>
      <div className={classes.content}>
        <DenunciationsTable denunciations={denunciations} coodenadores={coodenadores} envioCoordenador={envioCoordenador}  envioDeny={envioDeny}/>
      </div>
      <Dialog open={openDialog} onClose={ e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
            <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DenunciationList;
