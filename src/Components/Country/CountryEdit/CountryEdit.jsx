import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../../../store/actions/index";

import style from "./CountryEdit.module.scss";

import CountryEdit from "./CountryEditItem/CountryEditItem";
import Spinner from "../../Layout/Spinner";

class CountryEditList extends Component {
  componentDidMount() {
    this.props.countryEditOpen(this.props.match.params._id);
  }

  componentDidUpdate() {
    if (this.props.edited) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <div className={style.countryEdit}>
        {this.props.country.name ? (
          <CountryEdit
            name={this.props.country.name}
            countryID={this.props.country._id}
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.country.country,
    erros: state.country.errors,
    edited: state.country.edited
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    countryEditOpen: countryID => dispatch(Actions.countryEditOpen(countryID)),
    countryEditOpenSuccess: countryID =>
      dispatch(Actions.countryEditOpenSuccess(countryID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CountryEditList);
