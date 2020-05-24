import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CardHeader,
  TablePagination,
  Box,
  Paper,
  Rows,
  TableContainer
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// import { SearchInput } from 'components';  //chamar botão de pesquisa

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
   //modal
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    overflow: 'scroll'

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginRight: 10,
    marginTop: 10,
  },
  //FIM modal

}));

const ModeratorCoordinatorToolbar = props => {
  const { className, denunciationsSlect, categories, ...rest } = props;

  const [denunciationCategory, setDenunciationCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const classes = useStyles();


  //Modal Cadastrar Usuários
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };


  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.root}>

        <Grid container spacing={1}>

          <Grid item xs={12} sm={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="age-native-simple">Categorias</InputLabel>
              <Select
                native

              >
                <option aria-label="None" value="" />

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <div>
              <TextField
                fullWidth
                id="standard-rua"
                label="Rua"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={2}>
            <div>
              <TextField
                fullWidth
                id="standard-bairro"
                label="Bairro"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="date"
              label="Data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={1}>
            <FormControl margin="dense" fullWidth>
              <Button variant="contained" color="primary">Filtrar</Button>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={1}>
            <FormControl margin="dense" fullWidth>
              <Button variant="contained" >Limpar</Button>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={2}>

            <div
              style={{
                float: 'right',
              }}
            >
              <FormControl margin="dense">
                <Button
                  onClick={handleOpen}
                  style={{
                    background: 'green',
                  }}
                  variant="contained" color="secondary"> Aprovadas <CheckIcon /></Button>
              </FormControl>
            </div>
          </Grid>
        </Grid>



        {/* // Modal Aprovação */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          {/* Modal da Dereita */}
          <Fade in={openModal}>
            <div className={classes.paper}>
              <Grid container spacing={1}>

                <Grid item xs={12} sm={12}>
                  <InputLabel>Escolha a data de Finalização</InputLabel>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Descrição do motivo"
                    margin="dense"
                    name="descricao"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="date"
                    label="Finalização"
                    type="date"
                    defaultValue="24-05-2017"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl margin="dense" fullWidth>
                    <Button variant="contained" color="secondary">Enviar</Button>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>

      </div >
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

ModeratorCoordinatorToolbar.propTypes = {
  className: PropTypes.string
};

export default ModeratorCoordinatorToolbar;


