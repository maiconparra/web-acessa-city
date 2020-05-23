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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    overflow: 'scroll'

  }, paper: {
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
  Card: {
    marginTop: 50
  }

}));


const CategoryToolbar = props => {
  const { className, denunciationsSlect, categories, ...rest } = props;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [denunciationCategory, setDenunciationCategory] = useState('');
  const [denunciationStreet, setDenunciationStreet] = useState('');
  const [denunciationNeighborhood, setDenunciationNeighborhood] = useState('');
  const [denunciationData, setDenunciationData] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const classes = useStyles();


  const handleData = (sender) => {
    setDenunciationData({
      ...denunciationData,
      data: sender
    })
  }

  const handleStreet = (sender) => {
    setDenunciationStreet({
      ...denunciationStreet,
      street: sender
    })
  }
  const handleNeighborhood = (sender) => {
    setDenunciationNeighborhood({
      ...denunciationNeighborhood,
      neighborhood: sender
    })
  }


  const submit = (event) => {
    event.preventDefault();
    //Filtro geral
    const filtro = {
      category: denunciationCategory,
      street: denunciationStreet.street,
      neighborhood: denunciationNeighborhood.neighborhood,
      creationDate: denunciationData.data,
    }
    props.filter(filtro);

  }

  const [progressStatus, setProgressStatus] = React.useState(true);

  //Filtro denúncias em progresso
  const registerCategory = (event) => {
    // event.preventDefault();
    console.log("AQUI")

    //Abrir modal para cadastrar nova categoria\

  }
  const [open, setOpen] = React.useState(false);

  const [openModalDenunciations, setOpenModalDenunciations] = useState({
    denunciations: {}

  });

  const handleOpenCadastro = (denunciationsp) => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {

    setOpen(true);
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.root}>

        <Grid container spacing={1}>

          <Grid item xs={12} sm={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="age-native-simple">Tipo1</InputLabel>
              <Select
                native
                //value={denunciationCategory}

                onChange={e => setDenunciationCategory(e.target.value)}
              >


                {/* <option aria-label="None" value="" />
                {categories.map(denunciationCategory => {
                  return (
                    <option value={denunciationCategory.id}>{denunciationCategory.name}</option>
                  )
                })
                } */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div>
              <TextField
                fullWidth
                id="standard-rua"
                label="Titulo"
                value={denunciationStreet.street}
                onChange={e => handleStreet(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl margin="dense" fullWidth>
              <Button onClick={submit} variant="contained" color="secondary">Filtrar</Button>
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
                  variant="contained" color="secondary"> Cadastrar </Button>
              </FormControl>
            </div>
          </Grid>
        </Grid>

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

      {open &&

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}

        >
          {/* Modal da Dereita */}
          <Fade in={open}>
            <div className={classes.paper}>
              <Card className={classes.root}
                style={{
                  textAlign: 'center',
                  width: 500,
                  maxHeight: 500,
                }}>

                <CardContent>
                  <div>
                    <CardHeader title="Categoria" />
                    <div>

                      {/* Form de cadastro de nova categoria */}
                      {/* <TextField
                        fullWidth
                        helperText="Selecione o tipo"
                        label="Tipo"
                        margin="dense"
                        name="name"
                        select
                       // SelectProps={{ native: false }}
                        //onChange={handleChange}
                        required
                        //value={values.name}
                        value="Category"
                        variant="outlined"
                      >                         
                          <option value="categoria">Categoria</option>
                          <option value="subcategoria">Subcategoria</option>         
                      </TextField> */}
                      <FormControl className={classes.formControl}
                      fullWidth>
                        <InputLabel htmlFor="grouped-native-select">Tipo</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select">
                          <option value="categoria">Categoria</option>
                          <option value="subcategoria">Subcategoria</option>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        helperText="Selecione uma categoria para vincular a subcategoria"
                        label="Categoria"
                        margin="dense"
                        name="name"
                        select
                        //onChange={handleChange}
                        required
                        //value={values.name}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        helperText="Informe o novo titulo"
                        label="Titulo"
                        margin="dense"
                        name="name"
                        //onChange={handleChange}
                        required
                        //value={values.name}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              {
                <Box className={classes.root}>
                  <Button
                    //onClick={handleOpenAprove}
                    mx={200}
                    color="secondary"
                    align="right"
                    disabled={false}
                    width="10px"
                    size="large"
                    type="submit"
                    variant="contained"
                    className={classes.button}
                  >
                    Confirmar
              </Button>
                </Box>
              }
            </div>
          </Fade>
        </Modal>
        // {/* FIM Abri Modal envio coordenador  */}
      }
    </div >
  );
};

CategoryToolbar.propTypes = {
  className: PropTypes.string
};

export default CategoryToolbar;


