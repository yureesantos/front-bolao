import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CountryList from "./CountryList/CountryList";
import CountryEdit from "./CountryEdit/CountryEdit";
import CountryAdd from "./CountryAdd/CountryAdd";
class Country extends Component {
  componentDidUpdate() {
    if (!this.props.isAuth) {
      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    }
  }

  render() {
    return (
      <>
        {!this.props.isAuth && <h1>Você não está autorizado</h1>}
        <Route path={`${this.props.match.url}`} exact component={CountryList} />
        <Route
          path={`${this.props.match.url}/edit-country/:_id`}
          component={CountryEdit}
        />
        <Route
          path={`${this.props.match.url}/add-country`}
          component={CountryAdd}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    loading: state.country.loading,
    countries: state.country.countries
  };
};

export default connect(mapStateToProps)(Country);
