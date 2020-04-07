import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

// import CityhallService from '../../../api/cityhall/cityhall-service';

import api from '../../../utils/API';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CityHallCreate = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    cnpj: '',
    address: '',
    neighbornhood: '',
    zipCode: '',
    state: '',
    city: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const city =[
    {
      value: 'campinas',
      label: 'Campinas'
    }
  ]

  async function onRegisterCityhall(event){
    event.preventDefault();

    return await api.post('/Cityhall', values);

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onChange={onRegisterCityhall}
      >
        <CardHeader
          subheader="The information can be edited"
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
                helperText="Insira o nome da prefeitura"
                label="Nome da Prefeitura"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
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
                value={values.cnpj}
                variant="outlined"
              />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
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
                type="number"
                value={values.zipCode}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.city}
                variant="outlined"
              >
                {city.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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
                value={values.country}
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
