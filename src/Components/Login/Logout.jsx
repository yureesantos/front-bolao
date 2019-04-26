import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as Actions from "../../store/actions/index";

export class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.onLogoutCountry();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(Actions.logout()),
    onLogoutCountry: () => dispatch(Actions.eraseCountry())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
