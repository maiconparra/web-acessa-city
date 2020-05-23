import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CreateUser = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid>
          {/* <AccountProfile></AccountProfile> */}
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateUser;
