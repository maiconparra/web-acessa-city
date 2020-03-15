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
    TableSortLabel
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
            categories: []
        }
    }

    render() {
        const categories = this.state.categories;
        console.log(categories)
        return (
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
        );
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