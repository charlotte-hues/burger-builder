import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = props => {
  useEffect(() => {
    return () => {
      props.onSetRedirectPath("/");
    };
  }, []);

  const [controls, setControls] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const inputChangedHandler = (e, input) => {
    const updatedControls = updateObject(controls, {
      [input]: updateObject(controls[input], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[input].validation),
        changed: true
      })
    });

    let formIsValid = true;
    for (let key in updatedControls) {
      formIsValid = updatedControls[key].valid && formIsValid;
    }

    setControls(updatedControls);
    setFormIsValid(formIsValid);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(prevState => !prevState);
  };

  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let inputs = formElementsArray.map(input => {
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
  });

  let loginArea = (
    <form onSubmit={submitHandler}>
      {inputs}
      <div>
        <Button submit={true} disabled={!formIsValid} btnType="Success">
          {isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          Switch to {isSignUp ? "Log in" : "Sign Up"}
        </Button>
      </div>
    </form>
  );

  if (props.isLoading) {
    loginArea = <Spinner />;
  }

  if (props.isAuth && !props.isBuilding) {
    if (isSignUp) {
      loginArea = <h1>Welcome!</h1>;
    } else {
      loginArea = <h1>Welcome Back!</h1>;
    }
  }

  if (props.isAuth && props.isBuilding) {
    loginArea = <Redirect to={props.authRedirectPath} />;
  }

  const errorMessage = props.error ? <p>{props.error.message}</p> : null;

  return (
    <div className={classes.Auth}>
      {errorMessage}
      {loginArea}
    </div>
  );
};

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
      dispatch(actions.auth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirect("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
