import React from "react";
import classes from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends React.Component {
  render() {
    return (
      <div className={classes.Content}>
        <Burger />
        <div>Build Controls</div>
      </div>
    );
  }
}

export default BurgerBuilder;
