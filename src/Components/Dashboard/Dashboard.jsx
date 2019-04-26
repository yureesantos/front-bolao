import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link, Switch } from "react-router-dom";

import style from "./DashBoard.module.scss";

import Spinner from "../Layout/Spinner";
import NavBar from "../Layout/NavBar";
import Logout from "../Login/Logout";
import Country from "../Country/Country";
import Team from "../Team/Team";
import Match from "../Match/Match";
import Bet from "../Bet/Bet";
import Ranking from "../Ranking/Ranking";

class Dashboard extends Component {
  render() {
    return (
      <>
        <div className={style.background} />

        <div className={style.general}>
          <NavBar url={this.props.match.url} />
          {this.props.loading && <Spinner />}
          {!this.props.isAuth ? (
            <h1>Você não está autorizado</h1>
          ) : this.props.admin ? (
            <>
              <div className={style.panel}>
                <div className={style.panelBar}>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/teams`,
                      search: `?page=1&maxItems=12`
                    }}
                  >
                    Times
                  </Link>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/matches/finished`,
                      search: `?page=1&maxItems=12`
                    }}
                  >
                    Partidas Encerradas
                  </Link>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/matches`,
                      search: `?page=1&maxItems=12`
                    }}
                  >
                    Partidas
                  </Link>
                </div>
                <Route
                  path={`${this.props.match.url}/countries`}
                  component={Country}
                />
                <Route
                  path={`${this.props.match.url}/teams`}
                  component={Team}
                />
                <Switch>
                  <Route
                    path={`${this.props.match.url}/matches/finished`}
                    component={Match}
                  />
                  <Route
                    path={`${this.props.match.url}/matches`}
                    component={Match}
                  />
                </Switch>
              </div>
              <Route path="/logout" exact component={Logout} />
            </>
          ) : (
            <>
              <div className={style.internalPanel}>
                <Route path={this.props.match.url} component={Bet} />
                <Route
                  path={`${this.props.match.url}/ranking`}
                  component={Ranking}
                />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  admin: state.auth.currentUser.userAdmin,
  lading: state.country.loading
});

export default connect(mapStateToProps)(Dashboard);
