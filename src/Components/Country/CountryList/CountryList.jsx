import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Actions from "../../../store/actions/index";

import style from "./CountryList.module.scss";

import Spinner from "../../Layout/Spinner";
import CountryItem from "./CountryItem/CountryItem";
import Button from "../../Layout/Button";

class CountryList extends Component {
  componentDidMount() {
    this.props.countryOpen(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      return this.props.countryOpen(this.props.location.search);
    }
  }

  render() {
    const countries = this.props.countries.map((country, index) => {
      return (
        <CountryItem urlEdit={this.props.match.url} key={index} {...country} />
      );
    });

    return this.props.loading ? (
      <Spinner />
    ) : (
      <>
        <div className={style.wrapper}>
          <div className={style.countries}>{countries}</div>
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
                <Link to={`${this.props.match.url}/add-country`}>
                  <Button btStyle="ok">Novo País</Button>
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
    countries: state.country.countries,
    loading: state.country.loading,
    navigation: state.country.navigation
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    countryOpen: data => dispatch(Actions.countryOpen(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CountryList);
