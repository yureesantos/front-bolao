import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import TeamList from "./TeamList/TeamList";
import TeamEdit from "./TeamEdit/TeamEdit";
import TeamAdd from "./TeamAdd/TeamAdd";

class Team extends Component {
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
        <Route path={`${this.props.match.url}`} exact component={TeamList} />
        <Route
          path={`${this.props.match.url}/edit-team/:_id`}
          component={TeamEdit}
        />
        <Route path={`${this.props.match.url}/add-team`} component={TeamAdd} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    loading: state.team.loading
  };
};

export default connect(mapStateToProps)(Team);
