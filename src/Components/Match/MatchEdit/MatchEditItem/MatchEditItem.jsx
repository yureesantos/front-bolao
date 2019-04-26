import React, { Component } from "react";
import { connect } from "react-redux";

import * as Actions from "../../../../store/actions/index";

import InputGroup from "../../../Layout/InputGroup/InputGroup";
import InputSelect from "../../../Layout/InputSelect/InputSelect";
import SelectGroup from "../../../Layout/SelectGroup/SelectGroup";
import Form from "../../../Layout/Form/Form";

class MatchEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      resultA: "",
      resultB: ""
    };
  }

  componentDidMount() {
    this.setState({
      desc: this.props.desc,
      resultA: this.props.resultA,
      resultB: this.props.resultB
    });
  }

  onSubmit = event => {
    event.preventDefault();

    const form = document.forms.namedItem("editmatch");

    const matchData = new FormData(form);

    this.props.onMatchEditSave(matchData);
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log(this.props);
    return (
      <Form
        name="editMatch"
        sendAction="onMatchEditSave"
        formStyle="formWhite"
        title="Editar Partida"
        btStyle="formWhite"
        btText="Editar"
      >
        <InputGroup
          label="Descrição"
          Labeltype="form"
          htmlFor="desc"
          type="text"
          name="desc"
          value={this.state.desc}
          changed={this.onChangeHandler}
        />
        <InputSelect
          name="teamA"
          label="Time A"
          Labeltype="form"
          placeholder="Time A"
          error={this.props.errors.teamA}
          errosMsg={this.props.errors.teamA}
          teamname={this.props.teamA.name}
          teamID={this.props.teamA._id}
        />
        <InputGroup
          label="Placar Time A"
          Labeltype="form"
          htmlFor="resultA"
          type="text"
          name="resultA"
          value={this.state.resultA}
          changed={this.onChangeHandler}
        />
        <InputSelect
          name="teamB"
          label="Time B"
          Labeltype="form"
          placeholder="Time B"
          error={this.props.errors.teamB}
          errosMsg={this.props.errors.teamB}
          teamname={this.props.teamB.name}
          teamID={this.props.teamB._id}
        />
        <InputGroup
          label="Placar Time B"
          Labeltype="form"
          htmlFor="resultB"
          type="text"
          name="resultB"
          value={this.state.resultB}
          changed={this.onChangeHandler}
        />
        <SelectGroup
          name="open"
          label="Aberta"
          Labeltype="form"
          htmlFor="open"
          selected={this.props.open}
          closeMatch={true}
        />
        <input type="hidden" name="matchID" value={this.props._id} />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    edited: state.match.edited,
    errors: state.match.errors,
    loading: state.match.loading
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onMatchEditSave: matchData => dispatch(Actions.matchEditSave(matchData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(MatchEdit);
