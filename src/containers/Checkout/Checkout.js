import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const summary = !this.props.ings ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelCheckout={this.checkoutCanceledHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </React.Fragment>
    );
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
