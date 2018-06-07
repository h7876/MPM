import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import classnames from 'classnames';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import {Link} from 'react-router-dom';
import ButtonBases from './Button';
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  card: {
    maxWidth: 400,
    width: "100vw",
    height: '500',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#A5A5A5',
    // paddingLeft: '25vw',
    // paddingRight: '25vw',
    // paddingTop: '25vh',
    // paddingBottom: '25vh',
    justifyContent: 'center',
    // shadow: 10

  },
  root: {
    flexGrow: 1,
    justify: 'space-around',
    alignContent: 'space-around',
    position: 'relative'
    , direction: 'row'
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
    color: 'black',
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
    <Grid container className='root' spacing={16} direction='row' >

    <div>
    {/* <Grid className = {classes.grid}> */}
    <Card className={classes.card} >
    <CardHeader classes={{title: classes.title,}}title="Welcome"/>
          <ButtonBases/>
    </Card>
    {/* </Grid> */}
    </div>
    </Grid>
  )
}
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);