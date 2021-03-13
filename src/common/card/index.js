import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import profileImage from '../../assets/instaprofilepic.jpeg';
import { Button, Grid, TextField } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    minWidth: 350,
    maxWidth: 350,
    margin: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const HomeCard = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="AS" src={profileImage} />
        }
        title={props.userName}
        subheader={props.date}
      />
      <CardMedia
        className={classes.media}
        image={props.media_url}
        title={props.caption}
      />
      <CardContent>
      <Typography variant="body2" color="textPrimary" component="p">
          {props.caption}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.tags}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => props.incrementLikes(props.likes, props.id)}>
          <FavoriteBorderIcon/>
        </IconButton>
        <span>{props.likes} likes</span>
      </CardActions>
      <CardActions disableSpacing>
     <TextField id="standard-basic" label="Add a comment" onChange={(e) =>props.getComments(e.target.value)}/><Button variant="contained" color="primary" onClick ={() => props.addComment(props.id, props.userName)}>Add</Button>
      </CardActions>
      <Typography variant="body2" color="textPrimary" component="p">
          {props.comments && props.comments.map(val => (
            <span>{val.user}: {val.comment}</span>
          ))}
        </Typography>
    </Card>
  );
};

export default withStyles(styles)(HomeCard);

