import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  const visible = props.show ? classes.Open : classes.Close;

  return (
    <React.Fragment>
      <Backdrop clicked={props.close} show={props.show} />
      <div className={[classes.SideDrawer, visible].join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
