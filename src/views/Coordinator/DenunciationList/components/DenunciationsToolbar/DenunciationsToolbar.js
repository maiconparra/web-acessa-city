import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    overflow: 'scroll'

  },

}));


const DenunciationsToolbar = props => {
  const { className, denunciations, denunciationsSlect, ...rest } = props;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [denunciationCategory, setDenunciationCategory] = useState('');
  const [denunciationStreet, setDenunciationStreet] = useState('');
  const [denunciationNeighborhood, setDenunciationNeighborhood] = useState('');
  const [denunciationData, setDenunciationData] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const classes = useStyles();

  const submit = (event) => {
    event.preventDefault();
    //Filtro geral
    const filtro = {
      category: denunciationCategory,
      street: denunciationStreet,
      neighborhood: denunciationNeighborhood,
      creationDate: setDenunciationData,
    }
    props.filter(filtro);
    setDenunciationStreet('');
    setDenunciationNeighborhood('');
    setDenunciationCategory('');
    setDenunciationData('');
  }




  const [progressStatus, setProgressStatus] = React.useState(true);


  //Filtro denúncias em progresso
  const submitEmProgresso = (event) => {
    event.preventDefault();

    const filtroAprove = {
      id: 'c37d9588-1875-44dd-8cf1-6781de7533c3',
    }
    props.filterAprove(filtroAprove);
    setProgressStatus(false)
    setMensagem('Denúncias em progresso!');
    setOpenDialog(true);

  }

  const submitEmProgresso2 = (event) => {
    event.preventDefault();

    const filtroAprove = {
      id: '96afa0df-8ad9-4a44-a726-70582b7bd010',
    }
    props.filterAprove(filtroAprove);
    setProgressStatus(true)
    setMensagem('Denúncias não aprovadas!');
    setOpenDialog(true);
  }



  //Modal de Aprovação
  // const [openAprove, setOpenAprove] = React.useState(false);

  // const handleOpenAprove = () => {
  //   setOpenAprove(true);
  // };

  // const handleCloseAprove = () => {
  //   setOpenAprove(false);
  // };



  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.root}>



        <Grid container spacing={1}>

          <Grid item xs={12} sm={2}>

            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Categoria:</InputLabel>
              <Select native label="Categoria" value={denunciationCategory} onChange={e => setDenunciationCategory(e.target.value)}>
                <option aria-label="None" value="" />

                {denunciationsSlect.map(denunciationCategory => {
                  return (
                    <option value={denunciationCategory.category.id}>{denunciationCategory.category.name}</option>
                  )
                })
                }
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Rua:</InputLabel>
              <Select native label="Endereço" value={denunciationStreet} onChange={e => setDenunciationStreet(e.target.value)}>
                <option aria-label="None" value="" />
                {denunciationsSlect.map(denunciationStreet => {
                  return (
                    <option value={denunciationStreet.street}>{denunciationStreet.street}</option>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Bairro:</InputLabel>
              <Select native label="Bairro" value={denunciationNeighborhood} onChange={e => setDenunciationNeighborhood(e.target.value)}>
                <option aria-label="None" value="" />
                {denunciationsSlect.map(denunciationNeighborhood => {
                  return (
                    <option value={denunciationNeighborhood.neighborhood}>{denunciationNeighborhood.neighborhood}</option>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Data:</InputLabel>
              <Select native label="Data" value={denunciationData} onChange={e => setDenunciationData(e.target.value)}>
                <option aria-label="None" value="" />
                {denunciationsSlect.map(denunciationData => {
                  return (
                    <option value={denunciationData.creationDate}>{denunciationData.creationDate}</option>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl margin="dense" fullWidth>
              <Button onClick={submit} variant="contained" color="secondary">Filtrar</Button>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            {progressStatus &&
              <div
                style={{
                  float: 'right',
                }}
              >
                <FormControl margin="dense">
                  <Button
                    onClick={submitEmProgresso}
                    style={{
                      background: 'green',
                    }}
                    variant="contained" color="secondary"> Aprovadas <CheckIcon /></Button>
                </FormControl>
              </div>
            }


            {progressStatus == false &&

              <div
                style={{
                  float: 'right',
                }}
              >
                <FormControl margin="dense">
                  <Button
                    onClick={submitEmProgresso2}
                    style={{
                      background: 'green',
                    }}
                    variant="contained" color="secondary"> Denúncias <CheckIcon /></Button>
                </FormControl>
              </div>

            }
          </Grid>
        </Grid>


        {/* // Modal Aprovação */}
        {/* <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openAprove}
          onClose={handleCloseAprove}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openAprove}>
            <div className={classes.paper}>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Denúncia</TableCell>
                      <TableCell align="right">Endereço</TableCell>
                      <TableCell align="right">Bairro</TableCell>
                      <TableCell align="right">Categoria</TableCell>
                      <TableCell align="right">Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Fade>
        </Modal> */}

      </div>

      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
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

DenunciationsToolbar.propTypes = {
  className: PropTypes.string
};

export default DenunciationsToolbar;


