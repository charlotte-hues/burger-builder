import React from "react";
import classes from "./Order.module.css";

const order = props => {
  //
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

  const contact = [];
  for (let key in props.contactDetails) {
    if (key === "name") {
      contact.push(<p key={key}>{props.contactDetails[key]}</p>);
    }
  }

  return (
    <div className={classes.Order}>
      <ul>
        Ingredients:
        {ingredientList}
      </ul>
      {contact}
      <p>
        Price: <strong>£{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
