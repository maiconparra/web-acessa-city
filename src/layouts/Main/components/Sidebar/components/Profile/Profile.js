import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import firebase from 'firebase/app'
import { useState } from 'react';

class Profile extends React.Component {

  state = {
    user: {
      name: null,
      avatar: null,
      bio: null
    }
  }
  
  constructor(props) {
    super(props);
  }  

  componentWillMount() {

  }

  componentDidMount() {
    const comp = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
        comp.setState(function(state, props) {
          return {
              user: {
                name: user.displayName,
                avatar: user.photoURL
              }
          }
      })        
      } else {
        // No user is signed in.
      }
    });
    console.log('--------');
    console.log(firebase.auth());
  }

  render() {
    const classes = {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
      },
      avatar: {
        width: 60,
        height: 60
      },
      name: {
        marginTop: 1
      }   
    }

    const root = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'fit-content'
    }    
    const { className, ...rest } = this.props;
    return (
      <div
        {...rest}
        style={root}
      >
        <Avatar
          alt="Person"
          style={classes.avatar}
          component={RouterLink}
          src={this.state.user.avatar}
          to="/settings"
        />
        <Typography
          style={classes.name}
          variant="h4"
        >
          {this.state.user.name}
        </Typography>
        <Typography variant="body2">{this.state.user.bio}</Typography>
      </div>
    );    
  }
}

// const Profile = props => {
//   const { className, ...rest } = props;

//   const classes = useStyles();

//   const user = {
//     name: firebase.auth() ? '' : firebase.auth().currentUser.name,
//     avatar: '/images/avatars/avatar_11.png',
//     bio: 'Brain Director'
//   };

//   return (
//     <div
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <Avatar
//         alt="Person"
//         className={classes.avatar}
//         component={RouterLink}
//         src={user.avatar}
//         to="/settings"
//       />
//       <Typography
//         className={classes.name}
//         variant="h4"
//       >
//         {user.name}
//       </Typography>
//       <Typography variant="body2">{user.bio}</Typography>
//     </div>
//   );
// };

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
