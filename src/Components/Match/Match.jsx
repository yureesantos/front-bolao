import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import MatchList from "./MatchList/MatchList";
import MatchAdd from "./MatchAdd/MatchAdd";
import MatchEdit from "./MatchEdit/MatchEdit";

class Match extends Component {
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
        <Route path={`${this.props.match.url}`} exact component={MatchList} />
        <Route
          path={`${this.props.match.url}/finished`}
          exact
          component={MatchList}
        />
        <Route
          path={`${this.props.match.url}/edit-match/:_id`}
          component={MatchEdit}
        />
        <Route
          path={`${this.props.match.url}/add-match`}
          component={MatchAdd}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    loading: state.match.loading
  };
};

export default connect(mapStateToProps)(Match);
