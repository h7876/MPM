import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonBases from './Button';
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  card: {
    maxWidth: 200,
    width: "100vw",
    height: '500',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderStyle: "solid",
    borderWidth: '2px',
    borderColor: 'white'

  },
  root: {
    flexGrow: 1,
    justify: 'space-around',
    alignContent: 'space-around',
    position: 'relative'
    , direction: 'row',
    
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

render(){
  const { classes } = this.props;
  return(
    <Grid container className='root' spacing={16} direction='row' >

    <div>
    <Card className={classes.card} >
    <CardHeader classes={{title: classes.title,}}title="Welcome"/>
          <ButtonBases/>
    </Card>
    </div>
    </Grid>
  )
}
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);