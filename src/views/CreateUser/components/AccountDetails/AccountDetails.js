import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import api from 'utils/API';

const useStyles = makeStyles((theme) => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },  
}));


const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    emailVerified: true,
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };  

  const [errors, setErrors] = useState([]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const limparForm = () => {
    setValues({
      firstName: '',
      lastName: '',
      emailVerified: true,
      email: '',
      password: '',
      confirmPassword: ''      
    })
  }

  const handleSnackClick = () => {
    setErrors([]);
  }

  const handleClick = () => {
    setOpen(true)
    console.log(values);
    var newUser = values;
    newUser.displayName = values.firstName + ' ' + values.lastName;
    api.post('/user', newUser)
    .then((result) => {
      setOpen(false)
      setErrors([
        "O usuário " + values.email + " foi criado com sucesso."
      ])
      limparForm()
    })
    .catch((aError) => {
      if (aError.response.status == 400) {
        setOpen(false)        
        console.log(aError.response.data.errors)
        setErrors(aError.response.data.errors)
      }
      else if (aError.response.status == 500) {
        setErrors([
          "Erro no servidor"
        ])
      }

      setOpen(false)
    })
  }

  const teste = () => {
    return (<div>    
    {errors.map(error => (
      <SnackbarContent message={<h3>{error}</h3>} />
    ))}
    </div>)
  }

  return (
    <div>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            subheader="Criar um novo coordenador ou moderador"
            title="Criar novo usuário"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Informe o primeiro nome"
                  label="Primeiro nome"
                  margin="dense"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Informe o sobrenome"
                  label="Sobrenome"
                  margin="dense"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Informe o endereço de e-mail"
                  label="Endereço de e-mail"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Informe a senha"
                  label="Senha"
                  margin="dense"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Informe a confirmação de senha"
                  label="Confirmar senha"
                  margin="dense"
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
              </Grid>            
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Salvar
            </Button>
          </CardActions>
        </form>
      </Card>
      <Snackbar open={errors.length} autoHideDuration={20000} onClick={handleSnackClick}>
        {teste()}
      </Snackbar>      
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
