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
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from "@material-ui/core/FormGroup";
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import CompetenciesButton from "./CompetenciesButton";
import AttendanceButton from "./AttendanceButton";
import PerformanceButton from "./PerformanceButton";
import JournalButton from "./JournalButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/users";
import compose from "recompose/compose";
import JournalInputBox from "./JournalInputBox";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 3,
    height: "100%",
    zIndex: 300,
    overflow: "hidden",
    postion: "fixed",
    display: "flex"
    // justify: 'space-around'
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
    // justifyContent: 'space-around'
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
    justifyContent: "center",
    position: "fixed",
    right: 300
  },
  name: {
    color: "white"
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
    console.log(emname);
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.user);
    console.log(this.props.user, "user props");
    let { emname } = this.props.user;
    return (
      <div className={classes.root}>
        <FormGroup>
          {/* <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          /> */}
        </FormGroup>
        <AppBar className={classes.appBar} position="absolute">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            />
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/dashboard" style={{ color: "white" }}>
                {" "}
                Dashboard{" "}
              </Link>
            </Typography>
            <Typography className="name" color="inherit">
              {emname}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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

// // export const styling= withStyles(styles)(MenuAppBar);
// // export default connect(mapStateToProps, {getUser})(MenuAppBar, (styling))

// export default compose(withStyles(styles (JournalInputBox), connect(),)(AppBar));
