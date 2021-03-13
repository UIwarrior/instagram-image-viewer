import React from 'react';
import './header.css';
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';


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
    search: {
        width: '300px',
        position: 'relative',
        marginLeft: 0,
        borderRadius: '4px',
        top: '0px',

    },
    searchIcon: {
        height: '100%',
        padding: '4px 0px 20px 10px',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        pointerEvents: 'none',
        justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: '5px',
      borderRadius: '7px',
      // vertical padding + font size from searchIcon
      paddingLeft: '10px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  });

const Header = (props) => {
    const { classes } = props;
    return (
        <div className ="header">
        <span className="logo">{props.logoName}</span>
        <Grid container spacing={1} alignItems="flex-end">
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        </Grid>
        <Avatar alt="Remy Sharp">AS</Avatar>
        </div>
    )
}

export default withStyles(styles)(Header);