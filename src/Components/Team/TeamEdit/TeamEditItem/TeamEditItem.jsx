import React, { Component } from "react";
import { connect } from "react-redux";


import InputGroup from "../../../Layout/InputGroup/InputGroup";
import SelectGroup from "../../../Layout/SelectGroup/SelectGroup";
import Form from "../../../Layout/Form/Form";

class TeamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
  }

  onSubmit = event => {
    event.preventDefault();

    const form = document.forms.namedItem("editTeam");

    const teamData = new FormData(form);

    this.props.onTeamEditSave(teamData);
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Form
        name="editTeam"
        sendAction="onTeamEditSave"
        formStyle="formWhite"
        title="Editar Time"
        btStyle="formWhite"
        btText="Editar"
      >
        <InputGroup
          label="Nome"
          Labeltype="form"
          htmlFor="name"
          type="text"
          name="name"
          value={this.state.name}
          changed={this.onChangeHandler}
          errors={this.props.errors.name}
          errosMsg={this.props.errors.name}
        />
        <InputGroup
          label="Logo:"
          Labeltype="form"
          htmlFor="image"
          type="file"
          name="image"
        />

        <SelectGroup
          name="country"
          label="País"
          Labeltype="form"
          htmlFor="image"
          selected={this.props.countryID}
        />

        <input type="hidden" name="teamID" value={this.props.teamID} />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    edited: state.team.edited,
    errors: state.team.errors,
    loading: state.team.loading
  };
};

export default connect(mapStateToProps)(TeamEdit);
