import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import API from '../../../../utils/API';

import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const LatestOrders = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  const [report, setReport] = useState([]);

  useEffect(() => {
    API.get('/report')
      .then(result => {


        setReport(result.data);
        
      }).catch(err => {
        window.alert(err.message);
      });
  },[report]);


  const loadCreatRepots = event => {
    event.preventDefault();

    window.location = '/criar-denuncia';
  };



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick = { loadCreatRepots }
          >
            Nova Denúnica
          </Button>
        }
        title="Denúncias Recentes"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Data
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Estatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report.map(report => (
                  <TableRow
                    hover
                    key={report.id}
                  >
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>
                      {moment(report.creationData).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[report.reportStatus.description]}
                          size="sm"
                        />
                        {report.reportStatus.description}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default LatestOrders;
