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
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={'AIzaSyDBxtpy4QlnhPfGK7mF_TnbLXooEXVPy_0'}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Button
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
          onClick={teste}
        >
          DENÚNCIA

        </Button>
      </GoogleMapReact>
      <Grid
        className={style.gridButton}
        item
        lg={7}
        xs={12}
      >
        <div style={{ textAlign: 'right' }}>
          <Button
            style={{ position: 'absolute', backgroundColor: '#fff' }}
            onClick={loadReport}
            text="My Marker"
          >
            DENÚNCIAR
        </Button>
        </div>

      </Grid>


      {clicked.check ?
        <Grid
          className={style.gridForm}
        >
          <form onSubmit={onCreateReport}>
            <Typography
              className={style.title}
              variant="h2"
            >
              INFORME O QUE ESTÁ OCORRENDO NA REGIÃO OU LOCAL!!
                </Typography>
            <TextField
              label="Titulo da Denúncia"
              name="title"
              type="text"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              label="Descrição da Denúncia"
              name="title"
              type="text"
              variant="outlined"
            />

            <Camera
              onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
              idealResolution={{ width: 1920, height: 1080 }}
            />

            <Grid
              className={{ marginTop: "10px" }}
            >
              <Button
                type="submit"
                className={{ alignSelf: "rigth", marginTop: "35px" }}
                color="primary"
              >
                ENVIAR
            </Button>
              <Button
                type="submit"
                className={{ alignSelf: "left", marginTop: "35px" }}
                color="primary"
              >
                CANCELAR
            </Button>
            </Grid>
          </form>
        </Grid>
        : null}


    </div>
  )
}

export default ReportMap;
