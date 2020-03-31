import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    purchasing: false,
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Charlotte Hughes",
        address: {
          street: "test street 1",
          postCode: "ab12cd",
          country: "England"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastsest"
    };
    axios
      .post("/orders.json", order)
      .then(result => {
        this.setState({ purchasing: false, loading: false });
        this.props.history.push("/my-orders");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    let contactForm = (
      <React.Fragment>
        <h4>Enter your Contact Details</h4>
        <form>
          <input type="text" name="name" placeholder="your name" />
          <input type="email" name="email" placeholder="your email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postal" placeholder="Post Code" />
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );

    if (this.state.loading) {
      contactForm = (
        <React.Fragment>
          <h4>Processing your order</h4>
          <Spinner />
        </React.Fragment>
      );
    }

    return <div className={classes.ContactData}>{contactForm}</div>;
  }
}

export default ContactData;
