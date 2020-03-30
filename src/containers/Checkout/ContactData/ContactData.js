import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "axios";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    return (
      <div className={classes.ContactData}>
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
      </div>
    );
  }
}

export default ContactData;
