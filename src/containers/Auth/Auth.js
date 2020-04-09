import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email address"
        },
        value: "",
        validation: {
          required: true
        }
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "******"
        },
        value: "",
        validation: {
          minLength: 6,
          required: true
        }
      }
    },
    formIsValid: false
  };

  submitLoginDetails = e => {
    e.preventDefault();
  };

  checkValidity(value, rules) {
    if (!rules) return;
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length > rules.minLength;
    }
    return isValid;
  }

  inputChangedHandler = (e, input) => {
    const updatedControls = {
      ...this.state.controls,
      [input]: {
        ...this.state.controls[input],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[input].validation
        ),
        changed: true
      }
    };

    let formIsValid = true;
    for (let key in updatedControls) {
      formIsValid = updatedControls[key].valid && formIsValid;
    }

    this.setState({
      controls: updatedControls,
      formIsValid: formIsValid
    });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let inputs = formElementsArray.map(input => {
      return (
        <Input
          key={input.id}
          elementConfig={input.config.elementConfig}
          elementType={input.config.elementType}
          value={input.config.value}
          changed={e => this.inputChangedHandler(e, input.id)}
          valid={input.config.valid}
          shouldValidate={input.config.validation}
          touched={input.config.changed}
        />
      );
    });

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitLoginDetails}>
          {inputs}
          <Button disabled={!this.state.formIsValid} btnType="Success">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
