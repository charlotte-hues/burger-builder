import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  submitDetailsHandler = () => {
    console.log("dff");
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
          <Button btnType="Success" clicked={this.submitDetailsHandler}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
