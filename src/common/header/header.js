import React from 'react';
import './header.css';
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import profileImage from '../../assets/instaprofilepic.jpeg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#c0c0c0'
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    searchBox:{
      backgroundColor: '#c0c0c0',
      borderRadius: 4
    },
    inputBox: {
      width:300,
    },
    avatar:{
      "& div":{
        marginLeft: 30
      }
    },
    profileMenu: {
      cursor: 'pointer'
    }
  });

class Header extends React.Component{

   constructor(props) {
     super(props);
     this.state = {
      anchorEl: null,
     }
   }

   /**
    * This method opens the profile menu when clicked on profile picture
    * @param {*} e 
    */

   handleClick = (e) => {
     this.setState({
       anchorEl:e.currentTarget
     })
   }


   /**
    * This method closes the profile menu, also when clicked on logout takes user to login page again, if clicked on profiles
    * it checks if user is already logged in or not then redirects to profile
    * @param {*} e 
    */

   handleClose = (param) => {
    this.setState({
      anchorEl: null
    })
    if(param === 'logout'){
      this.props.history.push("/login");
      sessionStorage.clear();
    }
    else if( param === 'profile' ){
      if(sessionStorage.getItem('loggedIn') === "true" && sessionStorage.getItem('access-token')){
        this.props.history.push("/profile");
      }
      else{
        alert("Please login first");
      }

    }
   }
    render() {
      const { anchorEl } = this.state;
      const { logoName , triggerSearch, classes} = this.props;
      return (
          <div className ="header">
          <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={9}><span className="logo">{logoName}</span></Grid>
          <Grid item xs={2}  className ={ classes.searchBox}>
          <Input
            className ={classes.inputBox}
            onChange = {triggerSearch}
            disableUnderline={true}             
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start" >
                <SearchIcon />
              </InputAdornment>
            }
          />
          
          </Grid>
            <Grid item xs={1} className ={classes.avatar}>
            <Avatar src={profileImage} alt="arnab" onClick={this.handleClick} style={{ height: '30px', width: '30px' }} />
            <Menu
              id="simple-menu"
              className = {classes.profileMenu}
              elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleClose}>
              <MenuItem onClick={() => this.handleClose('profile')}>My account</MenuItem>
              <Divider />
              <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
            </Menu>
            </Grid>
          </Grid>
          </div>
      )
    }

}

export default withStyles(styles)(Header);