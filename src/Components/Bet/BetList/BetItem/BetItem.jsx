import React, { Component } from "react";

import { connect } from "react-redux";
import * as Actions from "../../../../store/actions/index";
import style from "./BetItem.module.scss";
import Form from "../../../Layout/Form/Form";
import InputGroup from "../../../Layout/InputGroup/InputGroup";

class BetItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultA: "",
      resultB: ""
    };
  }

  componentDidMount() {
    this.bet = this.props.bets.filter(b => b.user === this.props.userID);
    if (this.bet.length > 0) {
      this.setState({
        resultA: this.bet[0].resultA,
        resultB: this.bet[0].resultB
      });
    }
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Form
        name={this.props._id}
        formStyle="formBet"
        btStyle="formBet"
        btText="Confirmar"
        sendAction="betAdd"
        betForm={true}
        open={this.props.open}
      >
        <div className={style.betItem}>
          <span className={style.desc}>{this.props.desc} </span>
          <div className={style.teamA}>
            <span className={style.name}>{this.props.teamA.name}</span>
            <img
              className={style.logo}
              src={this.props.teamA.url}
              alt={`Logo do ${this.props.teamA.name}`}
            />
            {this.props.open ? (
              <InputGroup
                htmlFor="resultA"
                type="text"
                name="resultA"
                bet="sim"
                value={this.state.resultA}
                changed={this.onChangeHandler}
              />
            ) : (
              <span className={style.betClosed}>{this.state.resultA}</span>
            )}
          </div>
          <div className={style.teamB}>
            <span className={style.name}>{this.props.teamB.name}</span>
            <img
              className={style.logo}
              src={this.props.teamB.url}
              alt={`Logo do ${this.props.teamB.name}`}
            />
            {this.props.open ? (
              <InputGroup
                htmlFor="resultB"
                type="text"
                name="resultB"
                bet="sim"
                value={this.state.resultB}
                changed={this.onChangeHandler}
              />
            ) : (
              <span className={style.betClosed}>{this.state.resultB}</span>
            )}
          </div>
        </div>
        <input type="hidden" name="matchID" value={this.props._id} />
        <input type="hidden" name="userID" value={this.props.userID} />
        {this.props.errors
          ? this.props.errors.matchID === this.props._id && (
              <div className={style.errors}>
                {this.props.errors.errors.result}
              </div>
            )
          : this.props.edited && (
              <div className={style.success}>Aposta registrada</div>
            )}
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.currentUser.userid,
    loading: state.bet.loading,
    errors: state.bet.errors,
    edited: state.bet.edited
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
)(BetItem);
