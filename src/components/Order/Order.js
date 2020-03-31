import React from "react";
import classes from "./Order.module.css";

const order = props => {
  //   const ingredientList = Object.keys(props.ingredients).map(ig => {
  //     return (
  //       <li key={ig}>
  //         {ig}: {props.ingredients[ig]}
  //       </li>
  //     );
  //   });

  const ingredientList = [];
  for (let ig in props.ingredients) {
    if (props.ingredients[ig] >= 1) {
      ingredientList.push(
        <li key={ig}>
          {ig} ({props.ingredients[ig]})
        </li>
      );
    }
  }

  return (
    <div className={classes.Order}>
      <ul>
        Ingredients:
        {ingredientList}
      </ul>

      <p>
        Price: <strong>£{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
