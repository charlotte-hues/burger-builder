import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.isBuilding && !props.purchased) {
      return;
    } else {
      props.onInitIngredients();
    }
  }, []);

  const updatePurchaseable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((total, el) => {
        return total + el;
      }, 0);
    return sum >= 1;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/login");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Can't load ingredients!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          addedIngredient={props.onIngredientAdded}
          removedIngredient={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchaseable={updatePurchaseable(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        totalPrice={props.price}
      />
    );
  }

  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    error: state.burgerBuilder.error,
    price: state.burgerBuilder.totalPrice,
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
    isAuth: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch(actionCreators.addIngredient(ingredient)),
    onIngredientRemoved: ingredient =>
      dispatch(actionCreators.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirect(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
