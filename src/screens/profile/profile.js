import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import HomeCard from "../../common/card/index";
import Header from "../../common/header/header";
import { credentials } from "../../credentials";
import api from "../../utils/api";
import mockData from '../../mock-data.json';
import { Avatar, Button, GridList, GridListTile, Modal, TextField, Typography } from "@material-ui/core";
import profileImage from '../../assets/instaprofilepic.jpeg';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import ModalComponent from "../../common/modal/modal";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  profile:{
      width: '70%',
      margin: 'auto'
  },
  parentContainer: { 
    width: '60%',
    margin: 'auto',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instaImages: [],
      mediaApiResponse: [],
      comment: '',
      followers: 0,
      noOfPeopleFollowed: 0,
      fullName: "Arnab Sadhya",
      changedName: '',
      imageModalFlag: false,
      editModalFlag: false,
      clickedImageObj: {}
    };
    this.incrementLikes = this.incrementLikes.bind(this);
    this.addComment = this.addComment.bind(this);
    this.callSearch = this.callSearch.bind(this);
    this.getComments = this.getComments.bind(this);
    this.updateFullName = this.updateFullName.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this); 
  }


  callSearch(e){
    if(e.target.value === null || e.target.value === ""){
        this.setState({
            instaImages:mockData.instaImages
          }); 
    }
    else{
        let filteredArray = this.state.instaImages.filter(val => val.caption.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 );
        this.setState({
            instaImages:filteredArray
          });
    }
    
  }

  getCaptionTags(id){
    const matchedCaption = this.state.mediaApiResponse.find((val) => val.id === id);
    if (matchedCaption) {
      return matchedCaption.caption;
    }

  }

  getCaption(id) {
    const matchedCaption = this.state.mediaApiResponse.find((val) => val.id === id);
    if (matchedCaption) {
      return matchedCaption.caption.split("\n")[0];
    }

    return "";
  }

  getLikes() {
    return Math.floor(Math.random() * 1000)
  }

  getTags(id) {
    const found = this.state.mediaApiResponse.find((val) => val.id === id);
    if (found) {
      return found.caption.split("\n")[1];
    }
    return "";
  }

  getComments(e){
    console.log("comments",e);
    this.setState({
        comment:e
    })
  }


  convertDateTime(_date){
    const now = new Date(_date);
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    console.log("date and time",date, time);
    return date + ' ' + time;
  }

  addComment(id, user){
    console.log("adding", id);
    let commentedImage = this.state.instaImages.find(val => val.id === id);
    commentedImage.comments.push({
        comment: this.state.comment,
        user,
    });
    this.setState(prevState => ({
        instaImages: [...prevState.instaImages, commentedImage]
      }));
      console.log("this.state after posting comment", this.state)
  }

  incrementLikes(params, id){
    console.log("increment likes kicks in", id, this.state);
    let likedImage = this.state.instaImages.find(val => val.id === id);
    likedImage.likes = likedImage.likes + 1;
    likedImage.likeColor = 'red';
    
    this.setState(prevState => ({
        instaImages: [...prevState.instaImages, likedImage]
      }));
  }

  handleOpen = () => {
    this.setState({editModalFlag: true});
  };

  handleClose = () => {
    this.setState({editModalFlag: false});
  };

 updateFullName(){
   this.setState({
     fullName:this.state.changedName
   })
 }

 changeNameHandler(e){
   this.setState({
      changedName: e.target.value
   })
 }

 openImageModal(imageObj){
  this.setState({
    imageModalFlag: true,
    clickedImageObj: imageObj
  })

 }
 

  componentDidMount() {
    const finalImages = [];
    api
      .get("/me/media", {
        params: {
          fields: "id,caption",
          access_token: credentials.accessToken,
        },
      })
      .then(async (response) => {
        console.log("image array insta response", response.data.data);
        this.setState({
          mediaApiResponse: response.data.data,
        });
        await Promise.all(
          response.data.data.map(async (val) => {
            const _response = await api.get(`/${val.id}`, {
              params: {
                fields: "id,media_type,media_url,username,timestamp",
                access_token: credentials.accessToken,
              },
            });
            if(_response){
                const imageDetails = await _response.data;
                finalImages.push({
                  media_url: imageDetails.media_url,
                  date: this.convertDateTime(imageDetails.timestamp),
                  caption: this.getCaption(imageDetails.id),
                  tags: this.getTags(imageDetails.id),
                  likes: this.getLikes(),
                  comments: [],
                  id: imageDetails.id,
                  userName: imageDetails.username,
                  likeColor: 'grey',
                });
            }
            else{
                console.log("second API error happened");
            }
          })
        );
        this.setState({ instaImages: finalImages });
        console.log("this.state", this.state);
      }).catch(error => {
          console.log("first API error", mockData);
          this.setState({ instaImages: mockData.instaImages });
      })
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header logoName="Image Viewer" />  
        <ModalComponent modalTitle="Edit" open ={this.state.editModalFlag} handleClose = {this.handleClose}>
             <TextField id="standard-basic" label="Full Name" onChange ={this.changeNameHandler}/>
            <Button variant="contained" color="primary" onClick = {this.updateFullName}>
            UPDATE
          </Button>
          </ModalComponent>  


          <ModalComponent modalTitle="Edit" open ={this.state.imageModalFlag} handleClose = {this.handleClose}>
           <HomeCard
                  media_url={this.state.clickedImageObj.media_url}
                  caption={this.state.clickedImageObj.caption}
                  tags={this.state.clickedImageObj.tags}
                  likes={this.state.clickedImageObj.likes}
                  date={this.state.clickedImageObj.date}
                  userName = {this.state.clickedImageObj.userName}
                  incrementLikes = {this.incrementLikes}
                  addComment = {this.addComment}
                  id={this.state.clickedImageObj.id}
                  likeColor ={this.state.clickedImageObj.likeColor}
                  comments = {this.state.clickedImageObj.comments}
                  getComments = {this.getComments}
                />
          </ModalComponent>  



        <Grid item xs={12} className={classes.root} spacing={2}>
        <Grid className={classes.profile}>
        <Avatar src={profileImage} />
        <Typography>{this.state.instaImages[0] && this.state.instaImages[0].userName}</Typography>
        <Typography>Posts:{this.state.instaImages[0] && this.state.instaImages.length}</Typography>
        <Typography>Follows:{this.state.instaImages[0] && this.state.noOfPeopleFollowed}</Typography>
        <Typography>Followed By:{this.state.instaImages[0] && this.state.followers}</Typography>
        <Typography>{this.state.instaImages[0] && this.state.fullName} <Fab color="secondary" aria-label="edit">
        <EditIcon onClick = {this.handleOpen}/>
      </Fab></Typography>
        
        </Grid>
          <Grid container className = {classes.parentContainer} justify="center" spacing={4}>
          <GridList cellHeight={240} className={classes.gridList} cols={3}>
            {this.state.instaImages &&
              this.state.instaImages.map((val) => (
                <GridListTile key={val.media_url} cols={val.cols || 1}>
                        <img onClick={() =>this.openImageModal(val)} src={val.media_url} alt={val.caption} />
              </GridListTile>
              ))}
              </GridList>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
