import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import classnames from 'classnames';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import ButtonBases from './Button';


const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 200,
    height: '100vh',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#2D2D2D',
    paddingLeft: '43vw',
    paddingRight: '47vw',
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
    fontFamily: 'Julius Sans One, sans-serif'
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
    <CardMedia
            className={classes.media}
            image="https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675413/The_Verge_Seismic_Wallpaper_Portrait.0.png"
            title="Pattern"
            
          />
          
          <Link to ='/dashboard'> <Button variant="raised" color="grey" fontFamily= 'Pacifico, cursive' className={classes.button}> 
          Login
          </Button></Link>
          
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