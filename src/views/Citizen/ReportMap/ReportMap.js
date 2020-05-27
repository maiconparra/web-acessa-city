import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles';
import RoomIcon from '@material-ui/icons/Room';

import {
  Card,
  Form,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TextField,
  Grid,
  Ic
} from '@material-ui/core';
import Camera, { idealResolution } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";



import API from '../../../utils/API';
import { useState, useEffect } from 'react';
/* import { ReportCommentaries } from '../../../components';
import ReportInteractionHistory from '../../ReportInteractionHistory'; */
import currentUser from 'utils/AppUser';
import GoogleMapReact from 'google-map-react';

const styles = makeStyles({
  gridButton: {
    position: "absolute",
    marginTop: "-675px",
    alignSelf: "center"
  },
  gridForm: {
    position: "absolute",
    marginTop: "-620px",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "900px",
    height: "900px"
  },
  title: {
    fontSize: 12,
    fontFamily: '"Times New Roman", Times, serif'
  },
  camera: {
    width: "100px",
    height: "100px"
  },
  marker: {
    color: "red",
  }
});

const ReportMap = props => {

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })

  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const { latitude, longitude } = position.coords;
        setLongitude(longitude);
        setLatitude(latitude);
      },
      (error) => {
        console.log("ERRO! " + error.message)
      }
    )


  }, [])

  const teste = () => {
    console.log("State longitude: " + longitude + "State latidude: " + latitude)
  }

  const style = styles();

  const [clicked, setClicked] = useState({
    check: false
  });

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 19
  };

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function loadReport(event) {
    event.preventDefault();

    setClicked({
      check: true
    });
  }

  function onCreateReport(event) {
    event.preventDefault();

    setClicked({
      check: false
    });
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={'AIzaSyDBxtpy4QlnhPfGK7mF_TnbLXooEXVPy_0'}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <Marker
          position={{ latitude: latitude, longitude: longitude }}
        /> */}
        {/* <Button
          text="My Marker"
          onClick={teste}
          position={{ latitude: latitude, longitude: longitude }}
          className={style.marker}
          
        > */}
         <RoomIcon className={style.marker} position={{ latitude: latitude, longitude: longitude }}/>
        {/* </Button> */}
      </GoogleMapReact>
      <Grid
        className={style.gridButton}
        item
        lg={7}
        xs={12}
      >
        <div style={{ textAlign: 'right' }}>
          <Button
            href="/criar-denuncia"
            style={{ display: 'absolute', backgroundColor: '#fff' }}
          >DENÚNCIAR
          </Button>
        </div>

      </Grid>



    </div>
  )
}

export default ReportMap;
