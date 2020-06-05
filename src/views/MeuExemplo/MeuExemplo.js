import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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

<<<<<<< HEAD
=======
  const { history } = props;

  const { register, handleSubmit, watch, errors } = useForm();

>>>>>>> 5f7f2ea... Implementando Report
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
<<<<<<< HEAD
    )
=======
    );


  }, []);
>>>>>>> 5f7f2ea... Implementando Report


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

    history.push('/criar-denuncia');
  }

<<<<<<< HEAD
  function onCreateReport(event) {
    event.preventDefault();

    setClicked({
      check: false
    });
  }

  return (
    <Report reportId={'85615f64-3d93-4e4f-bfb5-4960ff62d22f'}></Report>   
=======
  const onCreateReport = data => console.log(data);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={'AIzaSyDBxtpy4QlnhPfGK7mF_TnbLXooEXVPy_0'}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Button
          lat={location.latitude}
          lng={location.longitude}
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
        <div style={{ alignSelf: 'left' }}>
          <Button
            style={{ position: 'absolute', backgroundColor: '#fff' }}
            onClick={loadReport}
            text="My Marker"
          >
            DENÚNCIAR
          </Button>
        </div>
      </Grid>
    </div>
>>>>>>> 5f7f2ea... Implementando Report
  )
}

MeuExemplo.propTypes = {
  history: PropTypes.object
};

export default withRouter(MeuExemplo);
