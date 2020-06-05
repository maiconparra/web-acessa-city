import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Container,
  Form,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TextareaAutosize,
  Typography,
  TextField,
  Grid,
  FormControl,
} from '@material-ui/core';
import Camera, { idealResolution } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import fileUpload from 'utils/AWS-S3';


import currentUser from '../../../utils/AppUser';



import API from '../../../utils/API';
import Category from 'views/Category';

/* import { ReportCommentaries } from '../../../components';
import ReportInteractionHistory from '../../ReportInteractionHistory'; */


const styles = makeStyles((theme) => ({
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
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }, 
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '300px'
  },
  textArea: {
    width: '300px',
    marginTop: theme.spacing(2)
  }
}));

const CreateReport = props => {

  const { history } = props;

 

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

  const [ category, setCategory ] = useState([{
    id: '',
    name: '',
    categories: []
  }]);
  const [ user, setUser ] = useState('');
  const [ status, setStatus ] = useState([]);
  const [ urgency, setUrgency ] = useState([]);
  const [ urlPhoto, setUrlPhoto ] = useState([]);



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

        console.log('Category:  ' + JSON.stringify(result.data));
      })
      .catch(err => {
        window.alert(err.message);
      });
  }, []);


  const [ report, setReport ] = useState({
    values: {}
  });

  function handlePhoto(event){
    event.persist();
    
    console.log('Foto: ' + event.target.files[0]);

    fileUpload(event.target.files[0]).then(result => {
      setUrlPhoto(result);

      console.log('Url Photo' + urlPhoto.fotoUrl);

    }).catch(err => {
      console.log('Erro ao fazer upload da foto: ' + err.message);
    });
   
  }

  function handleChange(event){
    event.persist();

    setReport({
      ...report,
      values: {
        title: event.target.value,
        description: event.target.value,
        longitude,
        latitude,
        categoryId: event.target.value,
        userId: user,
        reportStatusId: status,
        urgencyLevelId: urgency,
        accuracy: 10
      }

    });
    console.log( ' User: ' + user + 'Urgency Level:  ' + report.values.urgencyLevelId + '  Status:  ' + report.values.reportStatusId + ' CategoryId: ' + report.values.categoryId +' Description ' + report.values.description + ' Title ' + report.values.title + ' Url da Foto: ' + urlPhoto);
  }
  
  function handleTakePhoto(dataUri) {

    console.log('Camera Photo: ' + dataUri);

    //setUrlPhoto(dataUri);
    console.log('takePhoto');
  }

  const photo = 'https://acessacity.s3.amazonaws.com/photos/user.png';

  function onCreateReport(event) {
    event.preventDefault();

    API.post('/report', report.values)
      .then(result => {
        
        
        API.post('/report-attachment', {
          reportId: result.data.id,
          mediaType: 'png',
          url: urlPhoto.fotoUrl
        });
       
        
      }).catch(err => {
        window.alert(err.message);
      });
      
  }

  

  return (
    <Container>

      <Grid
        className={style.gridForm}
      >
        <form className = { style.root } onSubmit={onCreateReport}>
          <FormControl className={style.formControl}>
            <MobileView>
              <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                idealResolution={{ width: 1920, height: 1080 }}
              />
            </MobileView>
            <Grid item xs={12}>
              <TextField
                fullWidth
                className = { style.textField }
                label="Titulo da Denúncia"
                name="title"
                type="text"
                onChange = {handleChange}
                value = {report.title}
                variant="outlined"
              />
            </Grid>
            <Typography>
              <TextareaAutosize
                fullWidth
                className = { style.textArea }
                label="Descrição da Denúncia"
                name="description"
                type="text"
                placeholder = "Descrição da Denúncia"
                onChange = {handleChange}
                value = {report.description}
                variant="outlined"
              />
            </Typography>
            
            <Typography className = { style.root }>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange = { handleChange }
              >
                {
                  category.map(category => (
                    <MenuItem 
                      value = { category.id }
                    >{category.name }</MenuItem>
                  ))
                }
              </Select>
            </Typography>
            
            <Typography className = { style.root }>
              <input 
                accept="image/*" 
                onChange = { handlePhoto }
                className={style.input} 
                id="icon-button-file" 
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Typography>
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
          </FormControl>
        </form>
      </Grid>

    </Container>
  )
}

CreateReport.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateReport);
