import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>£{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          added={() => props.addedIngredient(control.type)}
          removed={() => props.removedIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      );
    })}
    <button
      disabled={!props.purchaseable}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "Sign in to Order"}
    </button>
  </div>
);

export default buildControls;
