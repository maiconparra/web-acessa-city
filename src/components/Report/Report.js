import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useEffect } from 'react';
import { useState } from 'react';
import api from 'utils/API';
import Carousel from 'react-material-ui-carousel'
import ReactStars from 'react-rating-stars-component'
import ReportInteractionHistory from 'views/ReportInteractionHistory'

const useStyles = makeStyles({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 280,
    },
  });

const Report = props => {
    const { reportId } = props;
    const classes = useStyles();

    const [report, setReport] = useState({});
    const [media, setMedia] = useState({
        hasMedia: false,
        photos: [],
        videos: []
    })

    const updateMediaLinks = attachments => {
        const photos = media.photos;
        if (attachments) {
            setMedia({
                ...media,
                hasMedia: true
            });
            attachments.forEach(element => {
                photos.push(element.url)
            });
        }
    }

    useEffect(() => {
        api.get('/report/'+reportId)
            .then((result) => {
                updateMediaLinks(result.data.attachments)
                setReport(result.data);
            })
    }, [])

    return (
        <Card className={classes.root}>
            {media.hasMedia &&
                <Carousel>
                {
                    media.photos.map(item =>
                        <CardMedia
                            className={classes.media}
                            image={item}
                            title={item}
                        />
                    )
                }
                </Carousel>
            }
            <CardContent>
            <ReactStars
                count={5}
                // onChange={ratingChanged}
                half={false}
                size={24}
                color2={'#ffd700'} 
            />
                <Typography gutterBottom variant="h5" component="h2">
                    {report.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {report.description}
                </Typography>
                
                <ReportInteractionHistory reportId={reportId}></ReportInteractionHistory>
            </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
    );

}

export default Report;