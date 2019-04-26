import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../../../store/actions/index";

import style from "./MatchEdit.module.scss";

import MatchEdit from "./MatchEditItem/MatchEditItem";
import Spinner from "../../Layout/Spinner";

class MatchEditList extends Component {
  componentDidMount() {
    this.props.matchEditOpen(this.props.match.params._id);
  }

  componentDidUpdate() {
    if (this.props.edited) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <div className={style.matchEdit}>
        {this.props.partida.desc ? (
          <MatchEdit {...this.props.partida} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    partida: state.match.partida,
    erros: state.match.errors,
    edited: state.match.edited
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    matchEditOpen: matchID => dispatch(Actions.matchEditOpen(matchID)),
    matchEditOpenSuccess: matchID =>
      dispatch(Actions.matchEditOpenSuccess(matchID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(MatchEditList);
