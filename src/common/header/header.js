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
  });

class Header extends React.Component{

   constructor(props) {
     super(props);
     this.state = {
      anchorEl: null,
     }
   }

   handleClick = (e) => {
     this.setState({
       anchorEl:e.currentTarget
     })
   }

   handleClose = () => {
    this.setState({
      anchorEl: null
    })
   }
    render() {
      const { anchorEl } = this.state;
      const { logoName , triggerSearch} = this.props;
      return (
          <div className ="header">
    
          <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={10}><span className="logo">{logoName}</span></Grid>
          <Grid item xs={1}>
          <Input
            onChange = {triggerSearch}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start" >
                <SearchIcon />
              </InputAdornment>
            }
          /></Grid>
            <Grid item xs={1}><Avatar src={profileImage} alt="arnab" onClick={this.handleClick}  />
            <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
            </Grid>
          </Grid>
          </div>
      )
    }

}

export default withStyles(styles)(Header);