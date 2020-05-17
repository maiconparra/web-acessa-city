import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Avatar
} from '@material-ui/core';
import firebase from 'firebase/app'

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileContent = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [newPassword, setNewPassword] = useState({
    name: '',
    password: '',
  });

  const handlePasswordChange = (sender) => {
    setNewPassword({
      ...newPassword,
      password: sender,
    });
  };

  const handleNameChange = (sender) => {
    setNewPassword({
      ...newPassword,
      name: sender,
    });
  };

  const handleEmailChange = (sender) => {
    setNewPassword({
      ...newPassword,
      email: sender,
    });
  };

  const submitPassword = (event) => {
    event.preventDefault();

    const novaSenha = {
      name: newPassword.name,
      email: newPassword.email,
      password: newPassword.password,

    }

    props.envioPassword(novaSenha);
  }


   const handleClick = (e)=>{
    this.inputElement.click();
   }

  
   var fileUpload = React.createRef();


  // const [cardFile, setCardFile] = useState();

  // const handleUploadFile = (e: any) => setCardFile(e.target.files[0]);


  const showFileUpload = (e) => {
   fileUpload.current.click();
  }

  const [user, setUser] = useState({
  })  


  function onChange(firebaseUser) {
    if (firebaseUser) {
      firebaseUser.getIdTokenResult().then((token) => {
        const claims = token.claims;
          setUser({
              ...user,
              name: claims.name,
              avatar: claims.picture,
              bio: claims.email,
              admin: claims.admin
          })
          handleNameChange(claims.name);
      })
    } else {
        // No user is signed in.
    }
}

  React.useEffect(() => {        
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    return () => unsubscribe()
  }, [])   




  return (
    <Card

      {...rest}
      className={clsx(classes.root, className)}
    >

      <form
        style={{
          margin: 'auto',
          width: '50%',

        }}

      >
        <br></br>

        <div className="AddImage">
        <input
          type="file"
          id="my_file"
          accept="image/*"
          style={{ display: "none" }}
          ref = {fileUpload}
        />
        <Avatar
              style={{
                margin: 'auto',
                width: 250,
                height: 250,

              }}
          type="image"
          src={user.avatar}
          onClick={showFileUpload}
        />
      </div>
      
        <CardHeader
          style={{
            textAlign: 'center',
          }}
          title="Alterar Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            onChange={e => handleNameChange(e.target.value)}
            fullWidth
            label="Nome"
            name="Nome"
            type="text"
            variant="outlined"
            value={newPassword.name}
          />

          <TextField
            onChange={e => handleEmailChange(e.target.value)}
            fullWidth
            label="Email"
            name="Email"
            style={{ marginTop: '1rem' }}
            type="email"
            variant="outlined"
            value={newPassword.email}
          />

          <TextField
            onChange={e => handlePasswordChange(e.target.value)}
            fullWidth
            label="Confirmar senha"
            name="confirm"
            style={{ marginTop: '1rem' }}
            type="password"
            value={newPassword.password}
            variant="outlined"
          />

          <Button
            style={{
              marginTop: 10,
            }}
            onClick={submitPassword}
            color="primary"
            variant="outlined"
            fullWidth
          >
            Confirmar
          </Button>
        </CardContent>

        <CardActions>

        </CardActions>
      </form>
    </Card>
  );
};

ProfileContent.propTypes = {
  className: PropTypes.string
};

export default ProfileContent;
