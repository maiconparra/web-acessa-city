import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Grid, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';


// import { SearchInput } from 'components';  //chamar botão de pesquisa


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },

}));


const CommentsToolbar = props => {
  const { className, commentsSlect, ...rest } = props;

  const [comments, setComments] = useState('');
  const [commentsData, setCommentsData] = useState('');

  const classes = useStyles();

  const submit = (event) => {
    event.preventDefault();

    const filtro = {
      name: comments,
      id: commentsData,
 
    }
    props.filter(filtro);
    setComments('');
    setCommentsData('');

  }


  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.root}>



        <Grid container spacing={1}>

          <Grid item xs={12} sm={2}>

            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Nome:</InputLabel>
              <Select native label="Nome" value={comments} onChange={e => setComments(e.target.value)}>
                <option aria-label="None" value="" />

                {commentsSlect.map(commentary => {
                  return (
                    <option value={commentary.name}>{commentary.name}</option>
                  )
                })
                }
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>ID:</InputLabel>
              <Select native label="ID" value={commentsData} onChange={e => setCommentsData(e.target.value)}>
                <option aria-label="None" value="" />
                {commentsSlect.map(commentaryData => {
                  return (
                    <option value={commentaryData.id}>{commentaryData.id}</option>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl margin="dense" fullWidth>
              <Button onClick={submit} variant="contained" color="secondary">Adicionar</Button>
            </FormControl>
          </Grid>

        </Grid>

        {/* <Grid container spacing={1}>

          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <TextField placeholder="Descrição da Denúncia"
                label="Digite a Denúncia:"
                variant="outlined"
                margin="dense"
                value={descricao} 
                onChange={e => setDescricao(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel>Categoria:</InputLabel>
              <Select native label="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option aria-label="None" value="" />
                <option value={"TRABALHO"}>Trabalho</option>
                <option value={"ESTUDO"}>Estudo</option>
                <option value={"OUTROS"}>Outros</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl margin="dense" fullWidth>
              <Button onClick={submit} variant="contained" color="secondary">Adicionar</Button>
            </FormControl>
          </Grid>

        </Grid> */}
      </div>
    </div>
  );
};

CommentsToolbar.propTypes = {
  className: PropTypes.string
};

export default CommentsToolbar;


