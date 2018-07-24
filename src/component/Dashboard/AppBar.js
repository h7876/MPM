import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import CompetenciesButton from "./CompetenciesButton";
import AttendanceButton from "./AttendanceButton";
import PerformanceButton from "./PerformanceButton";
import JournalButton from "./JournalButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/users";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 3,
    height: "100%",
    zIndex: 300,
    overflow: "hidden",
    postion: "fixed",
    display: "flex"
  
  },
  flex: {
    flex: 2,
    color: "white",
    fontFamily: "Julius Sans One, sans-serif",
    position: "relative",
    left: 60
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    color: "white",
    backgroundColor: "black",
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed"
  
  },
  drawerPaper: {
    position: "fixed",
    width: drawerWidth,
    height: "100$",
    backgroundColor: "#2D2D2D",
    boxShadow: 20,
    zIndex: 300
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },

  title: {
    color: "white",
    fontFamily: "Julius Sans One, sans-serif",
    justifyContent: "left",
    position: "fixed",
    left: 55
  },
  img: {

    position: "absolute",
    justifyContent:"right",
    right: 5,
    top: 5
},
  name: {
    color: "white",
    position: "absolute",
    justifyContent: "right",
    right: 65,
    top: 25
  },

  dashboard: {
    position: "relative",
    right:30

  },
  toolbar: theme.mixins.toolbar
  
});

class MenuAppBar extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.updateState();
  }

  constructor() {
    super();
    this.state = {
      auth: true,
      anchorEl: null,
      user: "name"
    };
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  updateState() {
    this.setState({ user: this.props.emname });
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // console.log(this.props.user);
    // console.log(this.props.user, "user props");
    let { emname } = this.props.user;
    return (
      <div className={classes.root}>
        <FormGroup>
      
        </FormGroup>
        <AppBar className={classes.appBar} position="absolute">
          <Toolbar>
          
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              <Link to="/dashboard" style={{ color: "white" }}>
                {" "}
                Dashboard{" "}
              </Link>
            </Typography>
            <Typography className={classes.name} color="inherit">
              {emname}
         
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  className={classes.img}
                >
                 
                    <img className = 'img' src={this.props.user.emphoto} alt="profilephoto" height= '30px' width= '30px' borderradius='50%'/>
              
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <Link to="/competencies">
            {" "}
            <CompetenciesButton />
          </Link>
          <Link to="/attendance">
            <AttendanceButton />
          </Link>
          <Link to="./performance">
            <PerformanceButton />
          </Link>
          <Link to="./journal">
            <JournalButton />
          </Link>
          <Divider />
          <List />
        </Drawer>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(withStyles(styles)(MenuAppBar));


