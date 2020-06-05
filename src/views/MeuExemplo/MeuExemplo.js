import React from 'react';
import { makeStyles } from '@material-ui/styles';
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
  Grid
} from '@material-ui/core';
import Camera, { idealResolution } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";



import API from '../../utils/API';
import { useState, useEffect } from 'react';
import { ReportCommentaries } from '../../components';
import ReportInteractionHistory from '../ReportInteractionHistory';
import Report from 'components/Report';
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
  }
});


const MeuExemplo = props => {

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
        const {latitude, longitude} = position.coords;
        setLongitude(longitude);
        setLatitude(latitude);
      },
      (error) => {
        console.log("ERRO! " + error.message)
      }
    )


  }, [])

  const teste = () => {
    console.log("State longitude: " + longitude + "State latidude: "+ latitude)
  }

  const style = styles();

  const [clicked, setClicked] = useState({
    check: false
  });

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
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
    <Report reportId={'85615f64-3d93-4e4f-bfb5-4960ff62d22f'}></Report>   
  )
}

export default MeuExemplo;
