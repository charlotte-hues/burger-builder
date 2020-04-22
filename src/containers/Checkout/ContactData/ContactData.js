import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
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
      valid: false,
      changed: false
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
      valid: false,
      changed: false
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
      },
      valid: false,
      changed: false
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
      valid: true,
      changed: false
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
      valid: false,
      changed: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "fastest" },
          { value: "cheapest", displayValue: "cheapest" }
        ]
      },
      value: "fastest",
      validation: {
        required: false,
        changed: false
      },
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (let formEl in orderForm) {
      formData[formEl] = orderForm[formEl].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      uid: props.uid
    };
    props.onOrderBurger(order, props.authToken);
  };

  const inputChangedHandler = (e, input) => {
    const updatedElement = updateObject(orderForm[input], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        orderForm[input].validation,
        orderForm[input].valid
      ),
      changed: true
    });
    const updatedForm = updateObject(orderForm, {
      [input]: updatedElement
    });
    let isFormValid = true;
    for (let key in updatedForm) {
      isFormValid = updatedForm[key].valid && isFormValid;
    }
    setOrderForm(updatedForm);
    setFormIsValid(isFormValid);
  };

  let formElementsArray = [];
  for (let input in orderForm) {
    formElementsArray.push({
      id: input,
      config: orderForm[input]
    });
  }

  let contactForm = (
    <React.Fragment>
      <h4>Enter your Contact Details</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map(input => {
          return (
            <Input
              key={input.id}
              elementConfig={input.config.elementConfig}
              elementType={input.config.elementType}
              value={input.config.value}
              changed={e => inputChangedHandler(e, input.id)}
              valid={input.config.valid}
              shouldValidate={input.config.validation}
              touched={input.config.changed}
            />
          );
        })}
        <Button submit={true} disabled={!formIsValid} btnType="Success">
          Order
        </Button>
      </form>
    </React.Fragment>
  );

  if (props.loading) {
    contactForm = (
      <React.Fragment>
        <h4>Processing your order</h4>
        <Spinner />
      </React.Fragment>
    );
  }

  return <div className={classes.ContactData}>{contactForm}</div>;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    authToken: state.auth.token,
    uid: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
