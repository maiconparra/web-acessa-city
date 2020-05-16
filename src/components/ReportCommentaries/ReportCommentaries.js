import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    //   maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const ReportCommentaries = props => {
    const classes = useStyles();
    const { reportId, open, close } = props;

    const [show, setShow] = useState(open)
    const [report, setReport] = useState({})
    const [commentaries, setCommentaries] = useState([])

    useEffect(() => {
        api.get('/report/'+reportId).then((result) => {
            setReport(result.data)
            api.get('/report-commentary/report/' + reportId).then((comments) => {
                setCommentaries(comments.data)
            })
        })

    }, [])

    const userList = () => {
        return (
            <List className={classes.root}>            
            {commentaries.map(commentary => (
                <div key={commentary.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={commentary.user.profileUrl} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={commentary.user.firstName}
                        secondary={
                            <React.Fragment>
                            {commentary.commentary}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>         
            ))}            
          </List>            
        );
    }    

    return (
        <Dialog
        open={show}
        // onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{report.title}</DialogTitle>
        <DialogContent dividers={'paper' === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
              { userList() }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ReportCommentaries;