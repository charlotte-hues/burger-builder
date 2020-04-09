import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/my-burger" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/my-orders">My Orders</NavigationItem>
    <NavigationItem link="/login">Log in</NavigationItem>
  </ul>
);

export default navigationItems;
