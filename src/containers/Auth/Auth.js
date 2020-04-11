import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

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
    formIsValid: false,
    isSignUp: true
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
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

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
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

    let loginArea = (
      <form onSubmit={this.submitHandler}>
        {inputs}
        <div>
          <Button
            submit={true}
            disabled={!this.state.formIsValid}
            btnType="Success"
          >
            {this.state.isSignUp ? "Sign Up" : "Log In"}
          </Button>
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">
            Switch to {this.state.isSignUp ? "Log in" : "Sign Up"}
          </Button>
        </div>
      </form>
    );

    if (this.props.isLoading) {
      loginArea = <Spinner />;
    }

    if (this.props.isAuth && !this.props.isBuilding) {
      if (this.state.isSignUp) {
        loginArea = <h1>Welcome!</h1>;
      } else {
        loginArea = <h1>Welcome Back!</h1>;
      }
    }

    if (this.props.isAuth && this.props.isBuilding) {
      loginArea = <Redirect to={this.authRedirectPath} />;
    }

    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    return (
      <div className={classes.Auth}>
        {errorMessage}
        {loginArea}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
    isAuth: state.auth.token !== null,
    error: state.auth.error,
    isBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
    // onSetRedirectPath: () => dispatch(actions.setAuthRedirect("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
