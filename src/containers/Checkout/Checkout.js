import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    price: ""
  };

  componentDidMount() {
    const price = this.props.location.state.totalPrice;
    this.setState({ price: price });

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.checkoutCanceledHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
      </React.Fragment>
    );
  }
}

export default Checkout;
