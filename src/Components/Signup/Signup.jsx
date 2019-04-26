import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../Layout/Spinner";
import InputGroup from "../Layout/InputGroup/InputGroup";
import Form from "../Layout/Form/Form";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidUpdate() {
    if (this.props.msg) {
      setTimeout(() => {
        this.props.history.push("/");
      }, 1000);
    }
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Form
        name="signup"
        sendAction="onSignup"
        formStyle="formBlack"
        title="Preencha Todos os Campos"
        btStyle="formBlack"
        btText="Confirmar"
      >
        <InputGroup
          label="Nome de Usuario"
          Labeltype="login"
          htmlFor="username"
          type="text"
          name="username"
          value={this.state.username}
          changed={this.onChangeHandler}
          error={this.props.errors.username}
          errosMsg={this.props.errors.username}
        />
        <InputGroup
          label="Email"
          Labeltype="login"
          htmlFor="email"
          type="text"
          name="email"
          value={this.state.email}
          changed={this.onChangeHandler}
          error={this.props.errors.email}
          errosMsg={this.props.errors.email}
        />
        <InputGroup
          label="Senha"
          Labeltype="login"
          htmlFor="password"
          type="password"
          name="password"
          value={this.state.password}
          changed={this.onChangeHandler}
          error={this.props.errors.password}
          errosMsg={this.props.errors.password}
        />
        <InputGroup
          label="Repetir Senha"
          Labeltype="login"
          htmlFor="password2"
          type="password"
          name="password2"
          value={this.state.password2}
          changed={this.onChangeHandler}
          error={this.props.errors.password}
          errosMsg={this.props.errors.password}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.signup.loading,
    msg: state.signup.msg.msg,
    errors: state.signup.errors
  };
};

export default connect(mapStateToProps)(Signup);
