import React from "react";
import BurgerIngredient from "./BurgerIngridient/BurgerIngredient";
import PropTypes from "prop-types";
import classes from "./Burger.module.css";

const burger = props => {
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="bacon" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="salad" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
      <BurgerIngredient />
    </div>
  );
};

burger.propTypes = {
  type: PropTypes.string.isRequired
};

export default burger;
