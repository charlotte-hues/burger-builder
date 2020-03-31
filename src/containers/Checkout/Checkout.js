import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    price: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      if (param[0] === "price") {
        this.setState({ price: param[1] });
      } else {
        ingredients[param[0]] = +param[1];
      }
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
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Checkout;
