import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import * as Actions from "../../../store/actions/index";

import classnames from "classnames";

import style from "./InputSelect.module.scss";

class InputSelect extends Component {
  state = {
    selectedOption: {
      value: this.props.teamID,
      label: this.props.teamname
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  componentDidMount() {
    this.props.teamOpen("?page=1&maxItems=10000");
  }

  render() {
    this.hasErrors = "";

    if (this.props.error) {
      this.hasErrors = style.hasErrors;
    }

    // Label Classes
    this.login = "";
    this.form = "";

    if (this.props.Labeltype === "login") {
      this.login = style.login;
    }

    if (this.props.Labeltype === "form") {
      this.form = style.form;
    }

    this.options = this.props.teams.map((team, index) => {
      return {
        value: team._id,
        label: team.name
      };
    });

    const { selectedOption } = this.state;
    return (
      <div className={style.inputGroup}>
        <Select
          className={style.inputs}
          options={this.options}
          name={this.props.name}
          value={selectedOption}
          onChange={this.handleChange}
        />
        <label
          className={classnames(this.login, this.form)}
          htmlFor={this.props.htmlFor}
        >
          {this.props.label}
        </label>
        {this.props.error && (
          <div className={style.errorMessage}>{this.props.errosMsg}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.team.teams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    teamOpen: data => dispatch(Actions.teamOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputSelect);
