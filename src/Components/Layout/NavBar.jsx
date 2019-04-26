import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import style from "./scss/NavBar.module.scss";

const NavBar = props => {
  return (
    <nav className={style.navbar}>
      <ul>
        {!props.isAuthenticated && (
          <Link to="/signup">
            <li className={style.menuOption}>Cadastre-se</li>
          </Link>
        )}
        {props.isAuthenticated && (
          <Link to="/dashboard">
            <li className={style.menuOption}>Partidas</li>
          </Link>
        )}
        {props.isAuthenticated && (
          <Link to={`${props.url}/ranking`}>
            <li className={style.menuOption}>Classificação</li>
          </Link>
        )}
        {props.isAuthenticated ? (
          <Link to="/logout">
            <li className={style.menuOption}>Logout</li>
          </Link>
        ) : (
          <Link to="/">
            <li className={style.menuOption}>Login</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchtoProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(NavBar);
