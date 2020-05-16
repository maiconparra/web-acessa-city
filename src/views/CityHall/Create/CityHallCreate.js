import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useForm, ErrorMessage } from 'react-hook-form'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';

// import CityhallService from '../../../api/cityhall/cityhall-service';

import api from '../../../utils/API';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CityHallCreate = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [states, setStates] = useState({
    states: []
  })

  const [cities, setCities] = useState({
    cities: [],
  })

  const [values, setValues] = useState({
    name: '',
    cnpj: '',
    address: '',
    neighbornhood: '',
    zipCode: '',
    stateId: '',
    cityId: ''
  });

  const changeState = (stateId) => {
    setValues({
      ...values,
      stateId: stateId
    })

    api.get('/state/'+stateId+'/cities').then((result) => {
      setCities({
        cities: result.data
      });
      if (result.data.length) {
        setValues({
          ...values,
          stateId: stateId,
          cityId: result.data[0].id
        })
      }
    }) 
    
    console.log(values);
  }

  React.useEffect(() => {
    api.get('/state').then((result) => {
      console.log(result);
      setStates({
        states: result.data
      });
      if (result.data.length) {
        setValues({
          ...values,
          stateId: result.data[0].id
        })
      }      
    })
  }, [])  

  const handleStateChange = event => {
    const stateId = event.target.value;
    changeState(stateId);
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
  };

  async function onRegisterCityhall(event){
    event.preventDefault();

    return await api.post('/Cityhall', values);

  }

  // const { register, handleSubmit, watch, errors } = useForm()
  // const onSubmit = data => { console.log(data) }

  const { register, handleSubmit, watch, errors } = useForm(
    {validateCriteriaMode: "all"}
  )
  const onSubmit = data => console.log(values)

  const handleErrors = (fieldName) =>
  <ErrorMessage errors={errors} name={fieldName}>
  {({ messages }) =>
    messages &&
    Object.entries(messages).map(([type, message]) => (
      linhaErro(message)
    ))
  }
</ErrorMessage>   

  const linhaErro = (message) => 
    <p>{message}</p>


  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardHeader
          subheader="Cadastrar uma nova prefeitura"
          title="Cadastro de prefeitura"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Nome da Prefeitura"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                inputRef={register({ 
                  required: true, 
                  maxLength: {
                    value: 80,
                    message: "Tamanho máximo de 80 caracteres"
                  }
                })} 
                defaultValue={values.name}
                variant="outlined"
                error={errors.name}
              />
              {handleErrors('name')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="CNPJ"
                margin="dense"
                name="cnpj"
                onChange={handleChange}
                required
                inputRef={register({ required: true, maxLength: 20 })}                
                defaultValue={values.cnpj}
                variant="outlined"
                error={errors.cnpj}
              />
              {handleErrors('cnpj')}

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Endereço"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                inputRef={register({ 
                  required: true, 
                  maxLength: {
                    value: 80,
                    message: "Tamanho máximo de 80 caracteres"
                  }
                })}                 
                defaultValue={values.address}
                variant="outlined"
                error={errors.address}
              />
              {handleErrors('address')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="CEP"
                margin="dense"
                name="zipCode"
                onChange={handleChange}
                inputRef={register({ 
                  required: true, 
                  maxLength: {
                    value: 80,
                    message: "Tamanho máximo de 80 caracteres"
                  }
                })}                 
                defaultValue={values.zipCode}
                variant="outlined"
                error={errors.zipCode}
              />
              {handleErrors('zipCode')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                margin="dense"
                name="stateId"
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                onChange={handleStateChange}
                value={values.stateId}                
                variant="outlined"
                inputRef={register({ 
                  required: true,                 
                })}                  
                error={errors.stateId}
              >
                {states.states.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
              {handleErrors('stateId')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Escolha uma cidade"
                margin="dense"
                name="cityId"
                onChange={handleChange}
                required
                inputRef={register({ 
                  required: true,                 
                })}                
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.cityId}
                variant="outlined"
                error={errors.cityId}
              >
                {cities.cities.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
              {handleErrors('cityId')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                defaultValue={values.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

CityHallCreate.propTypes = {
  className: PropTypes.string
};

export default CityHallCreate;
