import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import CreateIcon from '@material-ui/icons/Create';
import Forum from '@material-ui/icons/Forum';
import Face from '@material-ui/icons/Face';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { Profile, SidebarNav } from './components';
import firebase from 'firebase/app'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();
  const [menuPages, setMenuPages] = useState({
    items: 
    [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
      },   
      {
        title: 'Usuários',
        href: '/users',
        icon: <PeopleIcon />
      },
      {
        title: 'Denúcias de usuários',
        href: '/denunciations',
        icon: <RecordVoiceOverIcon />
      },
      {
        title: 'Comentários',
        href: '/reporting-comments',
        icon: <Forum />
      },    
      {
        title: 'Alterar perfil',
        href: '/profile',
        icon: <Face />
      },
      {
        title: 'Sair',
        href: '/sign-in',
        icon: <ExitToApp />
      },
      // {
      //   title: 'Typography',
      //   href: '/typography',
      //   icon: <TextFieldsIcon />
      // },
      // {
      //   title: 'Icons',
      //   href: '/icons',
      //   icon: <ImageIcon />
      // },
      // {
      //   title: 'Account',
      //   href: '/account',
      //   icon: <AccountBoxIcon />
      // },
      // {
      //   title: 'Settings',
      //   href: '/settings',
      //   icon: <SettingsIcon />
      // }
    ]    
  });

  const [user, setUser] = useState({
  })  

  const [drawMenu, setDrawMenu] = useState(false);


  function onChange(firebaseUser) {
    if (firebaseUser) {
      firebaseUser.getIdTokenResult().then((token) => {
        const claims = token.claims;
        if (claims.admin) {
          menuPages.items.push(
            {
              title: 'Cadastrar prefeitura',
              href: '/cityhall-create',
              icon: <CreateIcon />              
            }            
          )
        }

        setUser({
          admin: claims.admin
        })        
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
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
          <SidebarNav
            className={classes.nav}
            pages={menuPages.items}
          />
      </div>
    </Drawer>
  );
  return null
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
