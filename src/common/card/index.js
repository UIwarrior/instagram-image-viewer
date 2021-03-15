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
import { Button, TextField } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    minWidth: 350,
    maxWidth: 350,
    height: 'auto',
    margin: '20px',
    padding:10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeading:{
    paddingLeft: 0
  },
  cardContent:{
    paddingLeft: 0
  },
  favSection:{
    "& button": {
      paddingLeft: 0
    }
  },
  addComment:{
    "& button": {
      marginTop: 10
    }
  }
  
});

const HomeCard = (props) => {
  //destrure all props except methods
  const { classes, userName, date, media_url, caption, tags, likedFlag, likes, id, comments, commentInputValue  } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="AS" src={profileImage} />
        }
        title={userName}
        subheader={date}
        className={classes.cardHeading}
      />
      <CardMedia
        className={classes.media}
        image={media_url}
        title={caption}
      />
      <CardContent className={classes.cardContent}>
      <Typography variant="body2" color="textPrimary" component="p">
          {caption}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {tags}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.favSection}>
        <IconButton aria-label="add to favorites" onClick={() => props.incrementLikes(likes, id)}>
          {!likedFlag && <FavoriteBorderIcon/>}
          {likedFlag && <FavoriteIcon color="secondary"/>}
      
        </IconButton>
        <span>{likes} likes</span>
      </CardActions>
      <CardActions disableSpacing className = {classes.addComment}>
        <TextField value={commentInputValue} id="addCommentInput" label="Add a comment" onChange={(e) =>props.getComments(e.target.value, id)}/>
        <Button variant="contained" color="primary" onClick ={() => props.addComment(id, userName)}>Add</Button>
      </CardActions>
      <Typography variant="body2" color="textPrimary" component="p">
          {comments && comments.map(val => (
            <Typography variant="subtitle1">{val.user}: {val.comment}</Typography>
          ))}
        </Typography>
    </Card>
  );
};

export default withStyles(styles)(HomeCard);

