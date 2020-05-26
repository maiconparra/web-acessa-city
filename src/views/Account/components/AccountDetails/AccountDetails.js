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
  TextField
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, openAccount, ...rest } = props;


  const classes = useStyles();


  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

 
  const handleClickAlterar = (event) => {
    event.preventDefault();

    console.log("EUUU:", values)
      
    //props.filter();
  }


  ///ABRIR MODAL RECUPERAR SENHA
  const [openRecuperarSenha, setOpenRecuperarSenha] = React.useState(false);

  const handleClickOpenRecuperar = () => {
    setOpenRecuperarSenha(true);
  };

  const handleCloseRecuperar = () => {
    setOpenRecuperarSenha(false);
  };
  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Meus dados pessoais"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Seu primeiro nome"
                label="Nome"
                margin="dense"
                name="firstName"
                required
                onChange={handleChange}
                value={openAccount.users.firstName}
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
                helperText="Seu segundo nome"
                label="Sobrenome"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                value={openAccount.users.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Seu email"
                label="Endereço de e-mail"
                margin="dense"
                name="email"
                required
                onChange={handleChange}
                value={openAccount.users.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              style={{ textAlign: 'center' }}
            >
              <Button
                variant="outlined" color="primary"
                onClick={handleClickOpenRecuperar}>
                Recuperar Senha
              </Button>
              <Dialog
                open={openRecuperarSenha}
                onClose={handleCloseRecuperar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Reuperação de senha!</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Chegará um email de recuperação de senha no seu email.
                    Se deseja realmente recuperar sua senha,clicar na opção sim!
                 </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseRecuperar} color="primary">
                    Não
                  </Button>
                  <Button onClick={handleCloseRecuperar} color="primary" autoFocus>
                    sim
                  </Button>
                </DialogActions>
              </Dialog>

            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Senha"
                label="Senha"
                margin="dense"
                name="password"
                type="password"
                required
                value={values.senha}
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
                helperText="Confirmar senha"
                label="Confirmação da senha"
                margin="dense"
                name="password"
                type="password"
                required
                value={values.confirmarSenha}
                variant="outlined"
              />

            </Grid> */}
          </Grid>
        </CardContent>
        <CardActions
          style={{ float: 'right' }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickAlterar}
          >
            Salvar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
