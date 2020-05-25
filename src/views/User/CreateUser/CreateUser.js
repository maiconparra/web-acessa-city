import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Backdrop,
  CircularProgress,
  Snackbar,
  SnackbarContent, } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import API from 'utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CreateUser = (props)=> {
  const {onCreateUser} = props;


  const classes = useStyles();
  ////Modal de errro

  const [errors, setErrors] = useState([]);
  const [errorsStatus, setErrorsStatus] = useState('');
  const [openValidador, setOpenValidador] = React.useState(false);
  const handleCloseValidador = () => {
    setOpenValidador(false);
  };

  const handleSnackClick = () => {
    setErrors([]);
  }

  //FIM
  const createUser = (user) => {

    console.log("Arry cadastro", JSON.stringify(user))
 
    API.post('/user', user)
      .then((result) => {
        setOpenValidador(false)
        setErrors([
          "O usuário " + user.email + " foi criado com sucesso."])

        if(onCreateUser){
          onCreateUser(result.data)
        }
        setErrorsStatus(true)
        setTimeout(() => {
          setErrors([]);
        }, 10000);

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
      <Grid
        container
        spacing={4}
      >
        <Grid>
          {/* <AccountProfile></AccountProfile> */}
          <AccountDetails createUser={createUser} />
        </Grid>
      </Grid>



      <Snackbar open={errors.length} onClick={handleSnackClick}>
        {erros()}
      </Snackbar>
      <Backdrop className={classes.backdrop} open={openValidador} onClick={handleCloseValidador}>
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  );
};

export default CreateUser;
