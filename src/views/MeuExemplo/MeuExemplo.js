import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  InputLabel,
  Typography,
  TextField,
  NativeSelect,
  Grid
} from '@material-ui/core';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';


import { useForm } from 'react-hook-form';



import API from '../../utils/API';
import { useState, useEffect } from 'react';
import { ReportCommentaries } from '../../components';
import ReportInteractionHistory from '../ReportInteractionHistory';
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
    API.get('/category')
      .then(resolve => {
        setCategory({
          category: resolve.data
        });
      });
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

    setClicked({
      check: true
    });
  }

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
        <div 
          style= { {alignSelf: 'left'} }>

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
              onChange = { handleChange }
              value = { report.values.title }
            />
            <br />
            <br />
            <TextField
              label="Descrição da Denúncia"
              name="description"
              type="text"
              variant="outlined"
              onChange = { handleChange }
              value = { report.values.description }
            />
            <InputLabel htmlFor = "select">Categorrias</InputLabel>
            <NativeSelect>
              <option 
                key = { category.category[0].id }
                value = { report.values.categoryId }
                onChange = { handleChange }
              > { category.category[0].name } </option>
              <option 
                key = { category.category[1].id } 
                value = { report.values.categoryId }
                onChange = { handleChange } 
              > { category.category[1].name } </option>
              <option 
                key = { category.category[2].id } 
                value = { report.values.categoryId }
                onChange = { handleChange }
              > { category.category[2].name } </option>
            </NativeSelect>
            <MobileView>  
              <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                idealResolution={{ width: 1920, height: 1080 }}
              />
            </MobileView>
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

export default MeuExemplo;
