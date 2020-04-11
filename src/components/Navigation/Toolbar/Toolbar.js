import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import HamburgerIcon from "../../UI/HamburgerIcon/HamburgerIcon";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.MobileOnly} onClick={props.drawerToggleClicked}>
      <HamburgerIcon />
    </div>

    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
