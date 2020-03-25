import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";

const toobar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default toobar;
