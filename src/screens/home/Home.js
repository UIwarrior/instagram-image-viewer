import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import HomeCard from "../../common/card/index";
import Header from "../../common/header/header";
import { credentials } from '../../screens/login/Login';
import api from "../../utils/api";
import mockData from '../../mock-data.json';
import "./Home.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
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

class Home extends Component {
  constructor(props) {
    console.log("home props", props);
    super(props);
    this.state = {
      instaImages: [],
      mediaApiResponse: [],
      commentInputValue: ""
    };
    this.incrementLikes = this.incrementLikes.bind(this);
    this.addComment = this.addComment.bind(this);
    this.callSearch = this.callSearch.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  /**
   * Method which invokes when user searches anything in top search bar, 
   * it searces in entire array within caption and return matched results
   * @param {*} e 
   */


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

/**
 * This method returns caption and tags both for a specific image from API response
 * @param {*} id 
 * @returns 
 */


  getCaptionTags(id){
    const matchedCaption = this.state.mediaApiResponse.find((val) => val.id === id);
    if (matchedCaption) {
      return matchedCaption.caption;
    }
  }

/**
 * This method returns caption for a specific image using id from API response
 * @param {*} id 
 * @returns 
 */


  getCaption(id) {
    const matchedCaption = this.state.mediaApiResponse.find((val) => val.id === id);
    if (matchedCaption) {
      return matchedCaption.caption.split("\n")[0];
    }

    return "";
  }

 /**
 * This method generates and return random likes count
 * @returns 
 */


  getLikes() {
    return Math.floor(Math.random() * 1000)
  }

/**
 * This method returns tags for a specific image using id from API response
 * @param {*} id 
 * @returns 
 */

  getTags(id) {
    const found = this.state.mediaApiResponse.find((val) => val.id === id);
    if (found) {
      return found.caption.substr(found.caption.lastIndexOf("\n"), found.caption.length) ;
    }
    return "";
  }

  /**
   * This method acts as a handler for comment box within each image when User types a comment 
   * @param {*} e 
   * @param {*} id 
   */


  getComments(e, id){
    let commentedImage = this.state.instaImages.find(val => val.id === id);
    commentedImage.commentInputValue = e;
        this.setState(prevState => ({
          instaImages: [...prevState.instaImages, commentedImage],
          commentInputValue: e
        }));
  }

  /**
   * This method converts API response datetime to date and time 
   * @param {*} _date 
   * @returns 
   */


  convertDateTime(_date){
    const now = new Date(_date);
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return date + ' ' + time;
  }

  /**
   * This method adds a comment a specific image by an user 
   * @param {*} id 
   * @param {*} user 
   */


  addComment(id, user){
    let commentedImage = this.state.instaImages.find(val => val.id === id);
    commentedImage.comments.push({
        comment: this.state.commentInputValue,
        user,
    });

    commentedImage.commentInputValue = "";
    this.setState(prevState => ({
        instaImages: [...prevState.instaImages, commentedImage],
      }));
  }

  /**
   * This method increments likes or decrements on a specific image
   * @param {*} params 
   * @param {*} id 
   */


  incrementLikes(params, id){
    let likedImage = this.state.instaImages.find(val => val.id === id);
    likedImage.likedFlag = !likedImage.likedFlag;
    if(likedImage.likedFlag === false){
      likedImage.likes = likedImage.likes - 1;
    }    
   else{
    likedImage.likes = likedImage.likes + 1;
   }

    this.setState(prevState => ({
        instaImages: [...prevState.instaImages, likedImage]
      }));
  }

  componentDidMount() {

    // check to validate if user is logged in
    if( sessionStorage.getItem('loggedIn') !== "true" && !sessionStorage.getItem("access-token"))
    {
      this.props.history.push("/login");
    }
    else
    {
      const finalImages = [];
      api
        .get("/me/media", {
          params: {
            fields: "id,caption",
            access_token: credentials.accessToken,
          },
        })
        .then(async (response) => {
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
                    captionTags: this.getCaptionTags(imageDetails.id),
                    likedFlag: false,
                    commentInputValue: this.state.commentInputValue
                  });
              }
              else{
                  console.log("second API error happened");
              }
            })
          );
          this.setState({ instaImages: finalImages });
        }).catch(error => {
            console.log("first API error due to token expiry, will load from mock data", mockData);
            this.setState({ instaImages: mockData.instaImages });
        })
    }

  }



  render() {
    const { classes, history } = this.props;
    console.log("this.props", this.props);
    return (
      <React.Fragment>
        <Header logoName="Image Viewer" triggerSearch = {this.callSearch} history={history}/>
        <Grid item xs={12} className={classes.root} spacing={2}>
          <Grid container className = {classes.parentContainer} justify="center" spacing={4}>
            {this.state.instaImages &&
              this.state.instaImages.map((val) => (
                <HomeCard
                  media_url={val.media_url}
                  caption={val.caption}
                  tags={val.tags}
                  likes={val.likes}
                  date={val.date}
                  userName = {val.userName}
                  incrementLikes = {this.incrementLikes}
                  addComment = {this.addComment}
                  id={val.id}
                  likedFlag ={val.likedFlag}
                  comments = {val.comments}
                  getComments = {this.getComments}
                  commentInputValue ={val.commentInputValue}
                />
              ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
