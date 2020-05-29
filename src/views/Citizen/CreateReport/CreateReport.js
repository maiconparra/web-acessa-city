import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Form,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  NativeSelect,
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


import currentUser from '../../../utils/AppUser';



import API from '../../../utils/API';

/* import { ReportCommentaries } from '../../../components';
import ReportInteractionHistory from '../../ReportInteractionHistory'; */
import GoogleMapReact from 'google-map-react';
import { RaceOperator } from 'rxjs/internal/observable/race';

const styles = makeStyles({
  gridButton: {
    position: "absolute",
    marginTop: "-675px",
    alignSelf: "center"
  },
  gridForm: {
    position: "absolute",
    marginTop: '10%',
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%"
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

const CreateReport = props => {

  const { history } = props;

  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const { latitude, longitude } = position.coords;
        setLongitude(longitude.toFixed(4));
        setLatitude(latitude.toFixed(4));
      },
      (error) => {
        console.log("ERRO! " + error.message);
      }
    );


  }, []);

  const teste = () => {
    console.log('State longitude: ' + longitude + 'State latidude: ' + latitude);
  };

  teste();

  const style = styles();

  const [clicked, setClicked] = useState({
    check: false
  });

  const [ category, setCategory ] = useState([]);
  const [ user, setUser ] = useState('');
  const [ status, setStatus ] = useState([]);
  const [ urgency, setUrgency ] = useState([]);
  
  let categoryId;

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  currentUser().then(result => {
    setUser(
      result.id
    );
  }).catch(err => {
    window.alert(err.message);
  });



  useEffect(() => {
    API.get('/report-status')
      .then(result => {
        setStatus(
          result.data[3].id
        );
      }).catch(err => {
        window.alert(err.message);
      });
  },[]);

  useEffect(() => {
    API.get('/urgency-level')
      .then(result => {
        setUrgency(
          result.data[0].id
        );
      }).catch(err => {
        window.alert(err.message);
      });
  },[]);

  useEffect(() => {
    API.get('/category')
      .then(result => {
        setCategory(
          result.data
        );
      })
      .catch(err => {
        window.alert(err.message);
      });
  }, []);


  const [ report, setReport ] = useState({
    values: {}
  });

  

  function handleChange(event){
    event.persist();

    setReport({
      ...report,
      values: {
        title: event.target.value,
        description: event.target.value,
        longitude: location.longitude,
        latitude: location.latitude,
        categoryId,
        userId: user,
        reportStatusId: status,
        urgencyLevelId: urgency,
        accuracy: 10
      }

    });
    console.log( ' User: ' + user + 'Urgency Level:  ' + report.values.urgencyLevelId + '  Status:  ' + report.values.reportStatusId + ' CategoryId: ' + report.values.categoryId +  ' Description ' + report.values.description + ' Title ' + report.values.title);
  }
  
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function selectCategory(category){
      return category;
  }

  function onCreateReport(event) {
    event.preventDefault();

    API.post('/report', report.values)
      .then(result => {
        console.log(JSON.stringify(result.data));
      }).catch(err => {
        window.alert(err.message);
      });
      
  }

  return (
    <div>

      <Grid
        className={style.gridForm}
      >
        <form onSubmit={onCreateReport}>
          <MobileView>
            <Camera
              onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
              idealResolution={{ width: 1920, height: 1080 }}
            />
          </MobileView>
          <TextField
            fullWidth
            label="Titulo da Denúncia"
            name="title"
            type="text"
            onChange = {handleChange}
            value = {report.title}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Descrição da Denúncia"
            name="description"
            type="text"
            onChange = {handleChange}
            value = {report.description}
            variant="outlined"
          />

          <NativeSelect>
            {
              category.map(category => (
                <option 
                  onClick = { categoryId = category.id }
                  key = {category.id} 
                >{category.name}</option>
              ))
            }
          </NativeSelect>
          <BrowserView>
            <input type="file" accept="image/*" capture="camera"/>
          </BrowserView>
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

    </div>
  )
}

CreateReport.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateReport);
