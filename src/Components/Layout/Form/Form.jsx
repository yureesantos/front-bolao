import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../../../store/actions/index";

import Button from "../Button";

import classnames from "classnames";
import style from "./Form.module.scss";

class Form extends Component {
  onSubmit = event => {
    event.preventDefault();

    const form = document.forms.namedItem(this.props.name);
    const Data = new FormData(form);

    if (this.props.sendAction === "countryAdd") {
      this.props.countryAdd(Data);
    }
    if (this.props.sendAction === "onCountryEditSave") {
      this.props.onCountryEditSave(Data);
    }

    if (this.props.sendAction === "teamAdd") {
      this.props.teamAdd(Data);
    }

    if (this.props.sendAction === "onTeamEditSave") {
      this.props.onTeamEditSave(Data);
    }

    if (this.props.sendAction === "matchAdd") {
      this.props.matchAdd(Data);
    }

    if (this.props.sendAction === "onMatchEditSave") {
      this.props.onMatchEditSave(Data);
    }

    if (this.props.sendAction === "betAdd") {
      this.props.betAdd(Data);
    }

    if (this.props.sendAction === "onLogin") {
      this.props.onLogin(Data);
    }
    if (this.props.sendAction === "onSignup") {
      this.props.onSignup(Data);
    }
  };

  render() {
    let formWhite = null;
    let formBlack = null;
    let error = null;
    let ok = null;

    if (this.props.formStyle === "formWhite") {
      formWhite = style.formWhite;
    }

    if (this.props.formStyle === "formBlack") {
      formBlack = style.formBlack;
    }

    if (this.props.msgType === "error") {
      error = style.error;
    } else if (this.props.msgType === "ok") {
      ok = style.ok;
    }
    return (
      <form
        onSubmit={this.onSubmit}
        name={this.props.name}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <div className={classnames(formWhite, formBlack)}>
          <h1>{this.props.title}</h1>
          {this.props.children}
          {(this.props.open || !this.props.betForm) && (
            <Button btStyle={this.props.btStyle}>{this.props.btText}</Button>
          )}
          {this.props.error && (
            <p className={classnames(error, ok)}>{this.props.error}</p>
          )}
        </div>
      </form>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    // Country
    countryAdd: countryData => dispatch(Actions.countryAdd(countryData)),
    onCountryEditSave: countryData =>
      dispatch(Actions.countryEditSave(countryData)),
    // Team
    teamAdd: teamData => dispatch(Actions.teamAdd(teamData)),
    onTeamEditSave: teamData => dispatch(Actions.teamEditSave(teamData)),
    // Match
    matchAdd: matchData => dispatch(Actions.matchAdd(matchData)),
    onMatchEditSave: matchData => dispatch(Actions.matchEditSave(matchData)),
    // Bet
    betAdd: betData => dispatch(Actions.betAdd(betData)),
    // Login
    onLogin: userData => dispatch(Actions.login(userData)),
    onSignup: newUser => dispatch(Actions.singup(newUser))
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(Form);
