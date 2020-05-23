import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProfileContent } from './components';


import API from '../../../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  close: {
    padding: theme.spacing(0.5),
  },

}));

const ProfileMaster = () => {
  const classes = useStyles();

  const envioPassword = (password) => {
    console.log("senha recuperada:", JSON.stringify(password));
  }



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ProfileContent envioPassword={envioPassword} />
      </div>
    </div>
  );
};

export default ProfileMaster;


