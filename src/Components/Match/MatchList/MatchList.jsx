import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../../../store/actions/index";

import style from "./MatchList.module.scss";

import Spinner from "../../Layout/Spinner";
import MatchItem from "./MatchItem/MatchItem";
import Button from "../../Layout/Button";

class MatchList extends Component {
  componentDidMount() {
    this.props.matchOpen(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      return this.props.matchOpen(this.props.location.search);
    }
  }

  render() {
    const matches = this.props.matches.map((match, index) => {
      if (this.props.match.url === "/dashboard/matches/finished") {
        if (match.finished) {
          return (
            <MatchItem url={this.props.match.url} key={index} {...match} />
          );
        }
      } else {
        if (!match.finished) {
          return (
            <MatchItem url={this.props.match.url} key={index} {...match} />
          );
        }
      }
    });

    return this.props.loading ? (
      <Spinner />
    ) : (
      <>
        <div className={style.wrapper}>
          <div className={style.matches}>{matches}</div>
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
              <div className={style.errors}>{this.props.errors.msg}</div>
              <div className={style.controlls}>
                <Link to={`${this.props.match.url}/add-match`}>
                  <Button btStyle="ok">Nova Partida</Button>
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
    matches: state.match.matches,
    loading: state.match.loading,
    errors: state.match.errors,
    navigation: state.match.navigation
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    matchOpen: data => dispatch(Actions.matchOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(MatchList);
