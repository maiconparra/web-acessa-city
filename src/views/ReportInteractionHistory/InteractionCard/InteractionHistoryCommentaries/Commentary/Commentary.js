import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";



import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import RateReviewIcon from '@material-ui/icons/RateReview';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';


import InteractionHistoryCommentaries from '../InteractionHistoryCommentaries'
import api from 'utils/API';


const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        // width: '25ch',
    },    
    avatar: {
      backgroundColor: red[500],
    },
  }));

const Commentary = props => {
    const { commentary, currentUserId } = props;
    const classes = useStyles();

    const [commentaries, setCommentaries] = useState(commentary.interactionHistoryCommentaries)

    useEffect(() => {
        setCommentaries(commentary.interactionHistoryCommentaries)
    }, [])

    const [userCommentary, setUserCommentary] = useState({
        commentary: ''
    })

    const enviarComentario = () => {
        const commentaryToSend = {
            userId: currentUserId,
            reportInteractionHistoryId: commentary.interactionHistoryId,
            reportInteractionHistoryCommentaryId: commentary.id,
            commentary: userCommentary.commentary            
        }
        api.post('/report-interaction-history/commentary', commentaryToSend)
            .then((result) => {
                setUserCommentary({
                    commentary: ''
                })
                api.get(`/report-interaction-history/commentary/${commentary.id}`)
                .then((result) => {
                    setCommentaries(result.data.interactionHistoryCommentaries)
                })                
            })
    }

    const handleCommentaryChange = sender => {
        setUserCommentary({
            ...userCommentary,
            commentary: sender.target.value
        })
    }

    const keyDown = sender => {
        if (sender.key === 'Enter') {
            enviarComentario()
        }
    }

    return (<div>
        <Card className={classes.root}>
            <CardHeader
            avatar={
                <Avatar src={commentary.user.profileUrl} aria-label="recipe" className={classes.avatar}>            
                </Avatar>
            }
            title={commentary.user.firstName}
            subheader={commentary.creationDate}        
            />            
            <CardContent>
                {commentary.commentary}
                <InteractionHistoryCommentaries subItem={false} currentUserId={currentUserId} commentaries={commentaries}></InteractionHistoryCommentaries>
                <FormControl fullWidth className={classes.margin} variant="outlined">                     
                    <OutlinedInput
                        onKeyDown={keyDown}
                        type="text"
                        placeholder="Responder comentário"
                        value={userCommentary.commentary}
                        onChange={handleCommentaryChange}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={enviarComentario}
                            >
                                <RateReviewIcon />
                            </IconButton>
                        </InputAdornment>
                        }

                    />
                </FormControl>                                
            </CardContent>
        </Card>      
    </div>)
}

export default Commentary;