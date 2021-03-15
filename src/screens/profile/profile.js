import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../common/header/header";
import { credentials } from "../../screens/login/Login";
import api from "../../utils/api";
import mockData from "../../mock-data.json";
import {
  Avatar,
  Button,
  FormHelperText,
  GridList,
  GridListTile,
  TextField,
  Typography,
} from "@material-ui/core";
import profileImage from "../../assets/instaprofilepic.jpeg";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import ModalComponent from "../../common/modal/modal";
import ImageModalBody from "../../common/dialog";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "60%",
    margin: "20px auto",
    justifyContent: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    margin: "10px 10px 10px 10px",
  },
  parentContainer: {
    width: "60%",
    margin: "auto",
  },
  profileImage: {
    marginRight: 40,
  },
  userNameSection: {
    marginBottom: 10,
  },
  followersSection: {
    marginBottom: 15,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  updateButton: {
    marginTop: 30,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instaImages: [],
      mediaApiResponse: [],
      comment: "",
      followers: 396,
      noOfPeopleFollowed: 566,
      fullName: "Arnab Sadhya",
      changedName: "",
      imageModalFlag: false,
      editModalFlag: false,
      clickedImageObj: {},
      commentInputVal: "",
      error: {
        required: false,
      },
    };
    this.incrementLikes = this.incrementLikes.bind(this);
    this.addComment = this.addComment.bind(this);
    this.callSearch = this.callSearch.bind(this);
    this.getComments = this.getComments.bind(this);
    this.updateFullName = this.updateFullName.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
  }

  /**
   * Method which invokes when user searches anything in top search bar,
   * it searces in entire array within caption and return matched results
   * @param {*} e
   */

  callSearch(e) {
    if (e.target.value === null || e.target.value === "") {
      this.setState({
        instaImages: mockData.instaImages,
      });
    } else {
      let filteredArray = this.state.instaImages.filter(
        (val) =>
          val.caption.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      this.setState({
        instaImages: filteredArray,
      });
    }
  }

  /**
   * This method returns caption and tags both for a specific image from API response
   * @param {*} id
   * @returns
   */

  getCaptionTags(id) {
    const matchedCaption = this.state.mediaApiResponse.find(
      (val) => val.id === id
    );
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
    const matchedCaption = this.state.mediaApiResponse.find(
      (val) => val.id === id
    );
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
    return Math.floor(Math.random() * 1000);
  }

  /**
   * This method returns tags for a specific image using id from API response
   * @param {*} id
   * @returns
   */

  getTags(id) {
    const found = this.state.mediaApiResponse.find((val) => val.id === id);
    if (found) {
      return found.caption.split("\n")[1];
    }
    return "";
  }

  /**
   * This method acts as a handler for comment box within each image when User types a comment
   * @param {*} e
   * @param {*} id
   */

  getComments(e) {
    this.setState({
      comment: e,
      commentInputVal: e,
    });
  }

  /**
   * This method converts API response datetime to date and time
   * @param {*} _date
   * @returns
   */

  convertDateTime(_date) {
    const now = new Date(_date);
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return date + " " + time;
  }

  /**
   * This method adds a comment a specific image by an user
   * @param {*} id
   * @param {*} user
   */

  addComment(id, user) {
    let commentedImage = this.state.instaImages.find((val) => val.id === id);
    commentedImage.comments.push({
      comment: this.state.commentInputVal,
      user,
    });
    this.setState((prevState) => ({
      commentInputVal: "",
      instaImages: [...prevState.instaImages, commentedImage],
    }));
  }

  /**
   * This method increments likes or decrements on a specific image
   * @param {*} params
   * @param {*} id
   */

  incrementLikes(params, id) {
    let likedImage = this.state.instaImages.find((val) => val.id === id);
    likedImage.likedFlag = !likedImage.likedFlag;
    if (likedImage.likedFlag === false) {
      likedImage.likes = likedImage.likes - 1;
    } else {
      likedImage.likes = likedImage.likes + 1;
    }

    this.setState((prevState) => ({
      instaImages: [...prevState.instaImages, likedImage],
    }));
  }

  /**
   * This method triggers edit modal to visible
   */

  handleOpen = () => {
    this.setState({ editModalFlag: true });
  };

  /**
   * This method closes the edit name modal
   */

  handleClose = () => {
    this.setState({ editModalFlag: false });
  };

  /**
   * This method triggers modal to visible
   */

  handleImageModalClose = () => {
    this.setState({ imageModalFlag: false });
  };

  /**
   * This method updates the full name in the state from modal
   * @returns
   */

  updateFullName() {
    if (
      this.state.changedName !== "" &&
      this.state.changedName !== null &&
      this.state.changedName !== undefined
    ) {
      this.setState({
        fullName: this.state.changedName,
        editModalFlag: false,
      });
    } else {
      this.setState({
        error: {
          required: true,
        },
      });
      return;
    }
  }

  /**
   * when user updates the name in the popup this handler kicks in
   * @param {*} e
   */

  changeNameHandler(e) {
    this.setState({
      changedName: e.target.value,
    });
  }

  /**
   * This triggers image details modal
   * @param {*} e
   */

  openImageModal(imageObj) {
    this.setState({
      imageModalFlag: true,
      clickedImageObj: imageObj,
    });
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("loggedIn") !== "true" &&
      !sessionStorage.getItem("access-token")
    ) {
      this.props.history.push("/login");
    } else {
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
              if (_response) {
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
                  likeColor: "grey",
                });
              } else {
                console.log("second API error happened");
              }
            })
          );
          this.setState({ instaImages: finalImages });
        })
        .catch((error) => {
          console.log("first API error", mockData);
          this.setState({ instaImages: mockData.instaImages });
        });
    }
  }

  render() {
    const { classes, history } = this.props;
    return (
      <React.Fragment>
        <Header
          logoName="Image Viewer"
          history={history}
          triggerSearch={this.callSearch}
        />
        <ModalComponent
          modalTitle="Edit"
          open={this.state.editModalFlag}
          handleClose={this.handleClose}
          size="sm"
        >
          <TextField
            id="standard-basic"
            label="Full Name"
            required
            onChange={this.changeNameHandler}
          />
          {this.state.error.required && (
            <FormHelperText id="component-error-text" error={true}>
              Required
            </FormHelperText>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.updateFullName}
            className={classes.updateButton}
          >
            UPDATE
          </Button>
        </ModalComponent>

        <ModalComponent
          open={this.state.imageModalFlag}
          handleClose={this.handleImageModalClose}
          size="lg"
        >
          <ImageModalBody
            media_url={this.state.clickedImageObj.media_url}
            caption={this.state.clickedImageObj.caption}
            tags={this.state.clickedImageObj.tags}
            likes={this.state.clickedImageObj.likes}
            date={this.state.clickedImageObj.date}
            userName={this.state.clickedImageObj.userName}
            incrementLikes={this.incrementLikes}
            addComment={this.addComment}
            id={this.state.clickedImageObj.id}
            likedFlag={this.state.clickedImageObj.likedFlag}
            comments={this.state.clickedImageObj.comments}
            getComments={this.getComments}
            commentInputVal={this.state.commentInputVal}
          />
        </ModalComponent>

        <Grid container className={classes.root} spacing={4}>
          <Grid item xs={1} className={classes.profileImage}>
            <Avatar src={profileImage} className={classes.avatar} />
          </Grid>
          <Grid item xs={8}>
            <Grid item xs={12} className={classes.userNameSection}>
              <Typography variant="h5">
                {this.state.instaImages[0] &&
                  this.state.instaImages[0].userName}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.followersSection}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography>
                    Posts:{" "}
                    {this.state.instaImages[0] && this.state.instaImages.length}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Follows:{" "}
                    {this.state.instaImages[0] && this.state.noOfPeopleFollowed}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    Followed By:{" "}
                    {this.state.instaImages[0] && this.state.followers}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {this.state.instaImages[0] && this.state.fullName}{" "}
                <Fab
                  size="small"
                  onClick={this.handleOpen}
                  color="secondary"
                  aria-label="edit"
                >
                  <EditIcon />
                </Fab>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.parentContainer}
          justify="center"
          spacing={4}
        >
          <GridList cellHeight={240} className={classes.gridList} cols={3}>
            {this.state.instaImages &&
              this.state.instaImages.map((val) => (
                <GridListTile
                  style={{ cursor: "pointer" }}
                  key={val.media_url}
                  cols={val.cols || 1}
                >
                  <img
                    onClick={() => this.openImageModal(val)}
                    src={val.media_url}
                    alt={val.caption}
                  />
                </GridListTile>
              ))}
          </GridList>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
