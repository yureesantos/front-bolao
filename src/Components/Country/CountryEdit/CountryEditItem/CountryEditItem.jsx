import React, { Component } from "react";
import { connect } from "react-redux";

import * as countryActions from "../../../../store/actions/index";

import InputGroup from "../../../Layout/InputGroup/InputGroup";
import Form from "../../../Layout/Form/Form";

class CountryEdit extends Component {
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

    const form = document.forms.namedItem("editCountry");

    const countryData = new FormData(form);

    this.props.onCountryEditSave(countryData);
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Form
        name="editCountry"
        sendAction="onCountryEditSave"
        formStyle="formWhite"
        title="Editar País"
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
          label="Bandeira:"
          Labeltype="form"
          htmlFor="image"
          type="file"
          name="image"
        />
        <input type="hidden" name="countryID" value={this.props.countryID} />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    edited: state.country.edited,
    errors: state.country.errors,
    loading: state.country.loading
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onCountryEditSave: countryData =>
      dispatch(countryActions.countryEditSave(countryData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CountryEdit);
