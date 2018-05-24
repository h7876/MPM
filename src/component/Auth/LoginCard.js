import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import classnames from 'classnames';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import ButtonBases from './Button';


const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 400,
    height: '100vh',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#2D2D2D',
    paddingLeft: '40vw',
    paddingRight: '40vw',
    paddingTop: 40,
    shadow: 10

  },
  media: {
    height: 100,
    paddingTop: '55.25%', // 16:9
  },
  button: {
    margin: theme.spacing.unit,
    fontFamily: 'Julius Sans One, sans-serif'
    
  },
  grid: {
    padding: "0 50% !important",
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontFamily: 'Julius Sans One, sans-serif',
    justifyContent: 'center'
  }
  }
);

class LoginCard extends Component {
//put state here to edit expanded card vs normal card

render(){
  const { classes } = this.props;
  return(
    
    <div>
    {/* <Grid className = {classes.grid}> */}
    <Card className={classes.card} >
    <CardHeader classes={{title: classes.title,}}title="Welcome"/>
          <ButtonBases/>
    </Card>
    {/* </Grid> */}
    </div>
  
  )
}
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);