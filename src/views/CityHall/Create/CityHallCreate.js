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
    cityId: '',
    cnpj: '',
    address: '',
    neighborhood: '',
    zipCode: '',
    cityId: '',
    number: ''
  });

  const limparCampos = () => {
    setValues({
      name: '',
      cityId: '',
      cnpj: '',
      address: '',
      neighborhood: '',
      zipCode: '',
      number: '',

    })
  }

  const changeState = (stateId) => {
    setValues({
      ...values,
      stateId: stateId
    })

    api.get('/state/' + stateId + '/cities').then((result) => {
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

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    changeState(stateId);
  }

  async function onRegisterCityhall(values) {

    console.log("onRegisterCityhall ==== " + values.number)
    return await api.post('/city-hall', values).then((data)=>{
      console.log("Sucesso")
      alert("Prefeitura cadastrada com sucesso, aguarde a aprovação.") 
      limparCampos();      
    }).catch((erro)=>{
      console.log("Falhou")
      alert("Cidade já cadastrada!") 
    })
    
  }

  //Recebe os dados
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);

  };

  const { register, watch, errors } = useForm(
    { validateCriteriaMode: "all" }
  )
  const onSubmit = data => {
    console.log("onSubmit" + JSON.stringify(values))    
    onRegisterCityhall(values);
    console.log("TESTE 1")
    

  }

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
        onSubmit={onSubmit}
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
                helperText="Informe o nome da prefeitura"
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
                    message: "Excedeu o tamanho de 80 caracteres"
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
                helperText="Informe o CNPJ da prefeitura"
                fullWidth
                label="CNPJ"
                margin="dense"
                name="cnpj"
                type="number"
                onChange={handleChange}
                required
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 14,
                    message: "Excedeu o tamanho de 14 caracteres."
                  },
                  minLength: {
                    value: 14,
                    message: "Tamanho necessário é de 14 caracteres."
                  },
                })}
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
                helperText="Informe o endereço da prefeitura"
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
                    message: "Excedeu o tamanho de 80 caracteres"
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
                helperText="Informe o bairro da prefeitura"
                fullWidth
                label="Bairro"
                margin="dense"
                name="neighborhood"
                onChange={handleChange}
                required
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 80,
                    message: "Excedeu o tamanho de 80 caracteres"
                  }
                })}
                defaultValue={values.neighborhood}
                variant="outlined"
                error={errors.neighborhood}
              />
              {handleErrors('neighborhood')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                helperText="Informe o CEP da prefeitura"
                fullWidth
                label="CEP"
                margin="dense"
                name="zipCode"
                type="number"
                onChange={handleChange}
                required
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 8,
                    message: "Excedeu o tamanho de 8 caracteres"
                  },
                  minLength: {
                    value: 8,
                    message: "Tamanho necessário de 8 caracteres"
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
              {/* Numero da prefeitura*/}
              <TextField
                helperText="Informe o número da prefeitura"
                fullWidth
                label="Número"
                margin="dense"
                name="number"
                type="number"
                onChange={handleChange}
                required
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 5,
                    message: "Excedeu o tamanho de 10 caracteres."
                  },
                  minLength: {
                    value: 1,
                    message: "Tamanho necessário de ao menos 1 caracteres."
                  },
                })}
                defaultValue={values.number}
                variant="outlined"
                error={errors.number}
              />
              {handleErrors('number')}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                helperText="Informe o estado da prefeitura"
                fullWidth
                //label="Estado"
                margin="dense"
                name="stateId"
                required
                select
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
              helperText="Informe a cidade da prefeitura"
                fullWidth
                label="Cidade"
                margin="dense"
                name="cityId"
                onChange={handleChange}
                required
                inputRef={register({
                  required: true,
                })}
                select
                SelectProps={{ native: false }}
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
            Cadastrar
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
