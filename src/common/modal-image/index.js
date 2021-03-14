import React from 'react';
import { Avatar, Button, Divider, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import profileImage from '../../assets/instaprofilepic.jpeg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
    root: {
      padding: 5,
    },
    profileImage: {
      marginBottom: 10  
    },
    caption: {
        marginBottom: 10
    },
    favIcon: {
        padding:0,
    },
    tags:{
        marginBottom: 10
    },
    comments:{
        minHeight: 120
    },
    addComment:{
        "& button":{
            verticalAlign: 'bottom'
        }
    }
})


const ImageModalBody = (props) => {
    const { classes } = props;
    console.log("props",props);
    return (
        <Grid container spacing={6}>
        <Grid item xs={6}>
              <img src={props.media_url} alt={props.caption} width ={300} height={200}/>
        </Grid>
        <Grid item xs={6}>
         <Grid container className = {classes.profileImage}>
            <Grid item xs ={2}>
            <Avatar src={profileImage} />
            </Grid>
            <Grid item xs ={8}>
            <Typography>{props.userName}</Typography>
                </Grid>
         </Grid>
         <Divider />
         <Grid item xs ={12} className = {classes.caption}>
         <Typography variant="body2" color="textPrimary" component="p">
          {props.caption}
        </Typography>
         </Grid>
         <Grid item xs ={12}  className = {classes.tags}>
         <Typography variant="body2" color="textSecondary" component="p">
          {props.tags}
        </Typography>
         </Grid>
         <Grid item xs ={12}  className = {classes.comments}>
         <Typography variant="body2" color="textPrimary" component="p">
          {props.comments && props.comments.map(val => (
            <span>{val.user}: {val.comment}</span>
          ))}
        </Typography>
         </Grid>
         <Grid item xs ={12}  className = {classes.likes}>
         <IconButton className = {classes.favIcon} aria-label="add to favorites" onClick={() => props.incrementLikes(props.likes, props.id)}>
          <FavoriteBorderIcon />
        </IconButton>
        <span>{props.likes} likes</span>
         </Grid>
         <Grid item xs ={12}  className = {classes.addComment}>
           <TextField id="standard-basic" label="Add a comment" onChange={(e) =>props.getComments(e.target.value)}/>
           <Button variant="contained" color="primary" onClick ={() => props.addComment(props.id, props.userName)}>Add</Button>
         </Grid>
        </Grid>
        </Grid>
    )
}

export default withStyles(styles)(ImageModalBody);