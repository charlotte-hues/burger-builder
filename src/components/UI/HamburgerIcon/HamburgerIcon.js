import React from "react";
// import HamburgerIcon from "../../../assets/images/hamburger-icon.svg";
import classes from "./HamburgerIcon.module.css";

const hamburgerIcon = props => (
  <svg
    className={classes.HamburgerIcon}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 8 L28 8" className={classes.Top} />
    <path d="M6 10 L6 10" className={classes.Filler1} />
    <path d="M4 16 L28 16" />
    <path d="M26 22 L26 22" className={classes.Filler2} />
    <path d="M4 24 L28 24" className={classes.Bottom} />
  </svg>
);

export default hamburgerIcon;
