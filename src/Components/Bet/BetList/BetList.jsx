import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../../../store/actions/index";

import style from "./BetList.module.scss";

import Spinner from "../../Layout/Spinner";
import BetItem from "./BetItem/BetItem";
import Button from "../../Layout/Button";

class BetList extends Component {
  componentDidMount() {
    this.props.betOpen(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      return this.props.betOpen(this.props.location.search);
    }
  }

  render() {
    const bets = this.props.bets.map((bet, index) => {
      if (bet.finished) {
        return null;
      } else {
        return <BetItem key={index} {...bet} />;
      }
    });

    return this.props.loading ? (
      <Spinner />
    ) : (
      <>
        <div className={style.wrapper}>
          <div className={style.bets}>{bets}</div>
          <div className={style.footer}>
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    bets: state.bet.bets,
    loading: state.bet.loading,
    errors: state.bet.errors,
    navigation: state.bet.navigation
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    betOpen: data => dispatch(Actions.betOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(BetList);
