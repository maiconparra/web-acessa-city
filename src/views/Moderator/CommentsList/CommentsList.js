import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import {CommentsToolbar, CommentsTable } from './components';

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

const CommentsList = () => {
  const classes = useStyles();

  const [comments, setComments] = useState([]);
  const [commentsSlect, setCommentsSelect] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');


  ///Listar os dados  na tela co comentarios
  const listComments = () => {
    API.get('/category'
    ).then(response => {
       const listComments2 = response.data;
       console.log(listComments2);
       setComments(listComments2);
      setCommentsSelect(listComments2);
       }).catch(erro => {
        console.log(erro);
        setMensagem('Ocorreu um erro', erro);
        setOpenDialog(true);
      })
  }

   //Fitrar commentarios
   const filter = (filtro) =>{
    API.get(`/category/${filtro.id}`,
    ).then(response => {
      const filterComments = response.data;
      //console.log( JSON.stringify(filterComments));
      setComments(filterComments);
      setMensagem('Filtro realizado com sucesso!');
      setOpenDialog(true);
       }).catch(erro => {
        console.log(erro);
        setMensagem('Ocorreu um erro', erro);
        setOpenDialog(true);
      })
  }

  ///salvar Comments
  const envioComentarios = (messagemComments) => {

    console.log("Comentários" + JSON.stringify(messagemComments));
   API.post(
   ).then(response => {
       const newCoodenador = response.data;
       console.log(newCoodenador)
      }).catch(erro => {
       console.log(erro);
     })
 }

  // Atualizar os dados na tela
  useEffect(() => {
    listComments();
  },[]);


  return (
    <div className={classes.root}>
      <CommentsToolbar commentsSlect={commentsSlect} filter={filter} />
      <div className={classes.content}>
        <CommentsTable comments={comments}  envioComentarios={envioComentarios}/>
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

export default CommentsList;
