import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
 }from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
      },
      content: {
        marginTop: theme.spacing(2)
      }
}));

export default function message() {
    const [openDialog, setOpenDialog] = useState(false);
    const [mensagem, setMensagem] = useState('');


  const classes = useStyles();
  return (
    <div className={classes.root}>
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
}