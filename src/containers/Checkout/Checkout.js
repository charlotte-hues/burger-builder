import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  const continueCheckoutHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };
  const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
  const summary = !props.ings ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      {purchasedRedirect}
      <CheckoutSummary
        ingredients={props.ings}
        cancelCheckout={checkoutCanceledHandler}
        continueCheckout={continueCheckoutHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        component={ContactData}
      />
    </React.Fragment>
  );
  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
