import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import s3 from 'utils/AWS-S3'
import api from 'utils/API'
import currentUser from 'utils/AppUser'

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  var fileUploadInput = React.createRef();

  const showFileUpload = (e) => {
    fileUploadInput.current.click();
  }

  const updatePhoto = photoUrl => {

    const update = {
      userId: user.id,
      photoURL: photoUrl
    }

    api.put('/user/update-photo-profile', update)
      .then(response => {
        setUser(response.data)
      })
  }

  const uploadFileImg = (e) => {
    s3(e.target.files[0])
      .then((result) => {
        const photo = result.fotoUrl
        updatePhoto(photo)

      }).catch((erro) => {

      })
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    currentUser()
      .then(user => {
        setUser(user)
      })
  }, [])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.firstName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.email}
            </Typography>
          </div>
 
            <input
              onChange={uploadFileImg}
              type="file"
              id="my_file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileUploadInput}
            />
            <Avatar
              className={classes.avatar}
              src={user.profileUrl}
              onClick={showFileUpload}
            />
        
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
        <input onChange={uploadFileImg} type="file" id="my_file" accept="image/*"
          hidden={true}
          ref={fileUploadInput}
        />
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={() => fileUploadInput.current.click()}
        >
          Atualizar foto
        </Button>
        <Button onClick={() => updatePhoto("")} variant="text">Remover foto</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
