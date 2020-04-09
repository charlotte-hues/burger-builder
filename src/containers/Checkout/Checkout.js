import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

class Checkout extends React.Component {
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    const summary = !this.props.ings ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        {purchasedRedirect}
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
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
