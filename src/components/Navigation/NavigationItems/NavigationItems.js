import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/my-burger" active>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/my-orders">My Orders</NavigationItem>
    ) : null}
    {props.isAuth ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/login">Login</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
