import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "postcode"
        },
        value: "",
        validation: {
          required: true
        }
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "Uk",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    purchasing: false,
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData
    };
    axios
      .post("/orders.json", order)
      .then(result => {
        this.setState({ purchasing: false, loading: false });
        this.props.history.push("/my-orders");
      })
      .catch(error => this.setState({ loading: false }));
  };

  checkValidity(value, rules) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }
    return isValid;
  }

  inputChangedHandler = (e, input) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedForm[input] };
    updatedElement.value = e.target.value;
    updatedElement.valid = this.checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    console.log(updatedElement.valid);
    updatedForm[input] = updatedElement;
    this.setState({
      orderForm: updatedForm
    });
  };

  render() {
    let formElementsArray = [];
    for (let input in this.state.orderForm) {
      formElementsArray.push({
        id: input,
        config: this.state.orderForm[input]
      });
    }

    let contactForm = (
      <React.Fragment>
        <h4>Enter your Contact Details</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(input => {
            return (
              <Input
                key={input.id}
                elementConfig={input.config.elementConfig}
                elementType={input.config.elementType}
                value={input.config.value}
                changed={e => this.inputChangedHandler(e, input.id)}
              />
            );
          })}
          <Button btnType="Success">Order</Button>
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
