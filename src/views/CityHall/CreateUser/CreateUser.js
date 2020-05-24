import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import api from 'utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CreateUser = () => {
  const classes = useStyles();


  const createUser = (user) => {
    api.post('/user', user)
    .then((result) => {
       console.log("sucesso")
    })
    .catch((aError) => {
      console.log("erro")
    })
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
    </div>
  );
};

export default CreateUser;
