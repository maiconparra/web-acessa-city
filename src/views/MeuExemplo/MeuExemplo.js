import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  InputLabel,
  Typography,
  TextField,
  NativeSelect,
  Grid
} from '@material-ui/core';


import { useForm } from 'react-hook-form';



import API from '../../utils/API';
import { useState, useEffect } from 'react';
import { ReportCommentaries } from '../../components';
import ReportInteractionHistory from '../ReportInteractionHistory';
import Report from 'components/Report';
import currentUser from 'utils/AppUser';
import GoogleMapReact from 'google-map-react';

const styles = makeStyles({
  gridButton: {
    position: 'absolute',
    marginTop: '-675px',
    alignSelf: 'center'
  },
  gridForm: {
    position: 'absolute',
    marginTop: '-620px',
    alignSelf: 'center',
    backgroundColor: "#fff",
    width: '900px',
    height: '900px'
  },
  title: {
    fontSize: 12,
    fontFamily: '"Times New Roman", Times, serif'
  },
  camera: {
    width: '100px',
    height: '100px'
  }
});


const MeuExemplo = props => {

  const { history } = props;

  const { register, handleSubmit, watch, errors } = useForm();

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });

  const [ category, setCategory ] = useState({
    category: []
  });

  const [ report, setReport ] =  useState({
    values: {
      userId: currentUser.id,
      urgencyLevelId: '',
      categoryId: '',
      reportStatus: '',
      title: '',
      description: ''
    }
  });

  console.log("User" + currentUser);

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
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
    );


  }, []);


  useEffect(() => {
    setLocation({
      latitude: latitude,
      longitude: longitude
    });
  }, []);

  console.log(JSON.stringify(category));

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

  function handleChange(event) {
    event.preventDefault();

    setReport({
      ...report.values,
      [event.target.name]: event.target.value,
      
    });
  }

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function loadReport(event) {
    event.preventDefault();

    history.push('/criar-denuncia');
  }


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
      <Report reportId={'85615f64-3d93-4e4f-bfb5-4960ff62d22f'}/>
    </div>

  )
}

MeuExemplo.propTypes = {
  history: PropTypes.object
};

export default withRouter(MeuExemplo);
