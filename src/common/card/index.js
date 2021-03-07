import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './index.css';
import SignIn from '../form';
import Header from '../header/header';

const styles = ({
  root: {
    minWidth: 275,
  },
});

const SimpleCard = (props) => {

const { classes, history } = props;

  return (
    <div className="parentContainer">  
    <Card className={classes.root}>
      <CardContent>
       <SignIn history = {history} />
      </CardContent>
    </Card>
    </div>
  );
}

export default withStyles(styles)(SimpleCard);

