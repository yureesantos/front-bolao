import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../../../store/actions/index";

import style from "./TeamList.module.scss";

import Spinner from "../../Layout/Spinner";
import TeamItem from "./TeamItem/TeamItem";
import Button from "../../Layout/Button";

class TeamList extends Component {
  componentDidMount() {
    this.props.teamOpen(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      return this.props.teamOpen(this.props.location.search);
    }
  }

  render() {
    const teams = this.props.teams.map((team, index) => {
      return <TeamItem urlEdit={this.props.match.url} key={index} {...team} />;
    });

    return this.props.loading ? (
      <Spinner />
    ) : (
      <>
        <div className={style.wrapper}>
          <div className={style.teams}>{teams}</div>
          {this.props.isAuth && (
            <>
              <div className={style.controlls}>
                {this.props.navigation.currentPage !== 1 && (
                  <Link
                    to={{
                      pathname: this.props.match.url,
                      search: `?page=1&maxItems=12`
                    }}
                  >
                    <Button btStyle="navPage" controlls="yes">
                      Primeira
                    </Button>
                  </Link>
                )}

                {this.props.navigation.hasPrevPage && (
                  <Link
                    to={{
                      pathname: this.props.match.url,
                      search: `?page=${
                        this.props.navigation.previousPage
                      }&maxItems=12`
                    }}
                  >
                    <Button btStyle="navPage" controlls="yes">
                      {"<"}
                    </Button>
                  </Link>
                )}
                {this.props.navigation.hasNextPage && (
                  <Link
                    to={{
                      pathname: this.props.match.url,
                      search: `?page=${
                        this.props.navigation.nextPage
                      }&maxItems=12`
                    }}
                  >
                    <Button btStyle="navPage" controlls="yes">
                      {">"}
                    </Button>
                  </Link>
                )}
                {this.props.navigation.lastPage !==
                  this.props.navigation.currentPage && (
                  <Link
                    to={{
                      pathname: this.props.match.url,
                      search: `?page=${
                        this.props.navigation.lastPage
                      }&maxItems=12`
                    }}
                  >
                    <Button btStyle="navPage" controlls="yes">
                      {"Ultima"}
                    </Button>
                  </Link>
                )}
              </div>
              <div className={style.controlls}>
                <Link to={`${this.props.match.url}/add-team`}>
                  <Button btStyle="ok">Novo Time</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    teams: state.team.teams,
    loading: state.team.loading,
    navigation: state.team.navigation
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    teamOpen: data => dispatch(Actions.teamOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(TeamList);
