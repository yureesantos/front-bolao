import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../Layout/Spinner";
import Form from "../Layout/Form/Form";
import InputGroup from "../Layout/InputGroup/InputGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.onLogin(userData);
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      setTimeout(() => {
        this.props.history.push("/dashboard");
      }, 500);
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      setTimeout(() => {
        this.props.history.push("/dashboard");
      }, 500);
    }
  }

  render() {
    let message = null;
    if (this.props.errors.userNotFound) {
      message = this.props.errors.userNotFound;
    } else if (this.props.errors.wrongPassword) {
      message = this.props.errors.wrongPassword;
    }

    return this.props.loading ? (
      <Spinner />
    ) : (
      <Form
        name="login"
        sendAction="onLogin"
        formStyle="formBlack"
        title="Faça o Login"
        btStyle="formBlack"
        btText="Entrar"
        msgType="error"
        error={message}
      >
        <InputGroup
          label="Nome de Usuario"
          Labeltype="login"
          htmlFor="username"
          type="text"
          name="username"
          value={this.state.username}
          changed={this.onChangeHandler}
        />
        <InputGroup
          label="Senha"
          Labeltype="login"
          htmlFor="password"
          type="password"
          name="password"
          value={this.state.password}
          changed={this.onChangeHandler}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    errors: state.auth.errors
  };
};
export default connect(mapStateToProps)(Login);
