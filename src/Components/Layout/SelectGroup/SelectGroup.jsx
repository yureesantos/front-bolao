import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../../store/actions/index";

import classnames from "classnames";

import style from "./SelectGroup.module.scss";

class SelectGroup extends Component {
  componentDidMount() {
    if (this.props.closeMatch) {
      console.log("True/False");
    } else {
      this.props.countryOpen("?page=1&maxItems=10000");
    }
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
    // Tipo de Select (pais ou aberto/fechado)
    if (this.props.closeMatch) {
      if (this.props.selected) {
        this.options = (
          <>
            <option selected value="sim">
              Sim
            </option>
            <option value="nao">Não</option>
          </>
        );
      } else {
        this.options = (
          <>
            <option value="sim">Sim</option>
            <option selected value="nao">
              Não
            </option>
          </>
        );
      }
    } else {
      this.options = this.props.countries.map((country, index) => {
        if (country._id === this.props.selected) {
          return (
            <option selected key={index} value={country._id}>
              {country.name}
            </option>
          );
        }
        return (
          <option key={index} value={country._id}>
            {country.name}
          </option>
        );
      });
    }

    return (
      <div className={style.inputGroup}>
        <select
          className={classnames(style.inputs, this.hasErrors)}
          name={this.props.name}
        >
          {this.options}
        </select>
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
    countries: state.country.countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    countryOpen: data => dispatch(Actions.countryOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectGroup);
