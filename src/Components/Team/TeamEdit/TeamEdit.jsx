import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../../../store/actions/index";

import style from "./TeamEdit.module.scss";

import TeamEdit from "./TeamEditItem/TeamEditItem";
import Spinner from "../../Layout/Spinner";

class TeamEditList extends Component {
  componentDidMount() {
    this.props.teamEditOpen(this.props.match.params._id);
  }

  componentDidUpdate() {
    if (this.props.edited) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <div className={style.teamEdit}>
        {this.props.team.name ? (
          <TeamEdit
            name={this.props.team.name}
            teamID={this.props.team._id}
            countryID={this.props.team.country}
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    team: state.team.team,
    erros: state.team.errors,
    edited: state.team.edited
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    teamEditOpen: teamID => dispatch(Actions.teamEditOpen(teamID)),
    teamEditOpenSuccess: teamID => dispatch(Actions.teamEditOpenSuccess(teamID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(TeamEditList);
