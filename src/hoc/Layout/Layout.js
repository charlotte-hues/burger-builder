import React, { useState } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerOpenedHandler = () => {
    setSideDrawerIsVisible(true);
  };

  const drawerToggleHandler = () => {
    setSideDrawerIsVisible(prevState => !prevState);
  };

  return (
    <React.Fragment>
      <Toolbar
        openSideDrawerIsVisible={sideDrawerOpenedHandler}
        drawerToggleClicked={drawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        close={sideDrawerClosedHandler}
        open={sideDrawerOpenedHandler}
        show={sideDrawerIsVisible}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
