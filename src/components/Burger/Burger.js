import React from "react";
import BurgerIngredient from "./BurgerIngridient/BurgerIngredient";
import PropTypes from "prop-types";

const burger = props => {
  return (
    <React.Fragment>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="bacon" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="salad" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
      <BurgerIngredient />
    </React.Fragment>
  );
};

burger.propTypes = {
  type: PropTypes.string.isRequired
};

export default burger;
