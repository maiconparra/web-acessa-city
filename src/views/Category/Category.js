import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
    Card,
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
    TextField
  } from '@material-ui/core';

import API from '../../utils/API'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
  }));

class Category extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            category: {
              name: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const categories = this.state.categories;
        console.log(categories)
        return (
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {categories.map(category => (
                  <TableRow
                    hover
                    key={category.id}
                  >
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>              
            </Table>                        
            <Button
                  // className={classes.signInButton}
                  color="primary"
                  disabled={false}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={() => this.handleClick()}
            >
              Teste
              </Button>

              <TextField
                fullWidth
                helperText="Digite o nome da categoria"
                label="Nome da categoria"
                margin="dense"
                name="firstName"
                onChange={this.handleChange}
                required
                value={this.state.category.name}
                variant="outlined"
              />              
          </div>
        );
    }

    handleChange(event) {
      this.setState({
        category: {
          name: event.target.value
        }
      })
    }

    handleClick() {

    API.post('/category', this.state.category)
      .then((result) => {
        console.log(result)
        this.refreshScreen();
      })
    }

    async refreshScreen() {
      let categories = await API.get('/category');
      categories = categories.data;
      //console.log(categories);
      this.setState(function(state, props) {
          return {
              categories
          }
      })      
    }

    async componentDidMount() {
        let categories = await API.get('/category');
        categories = categories.data;
        //console.log(categories);
        this.setState(function(state, props) {
            return {
                categories
            }
        })
    }
}

export default Category;