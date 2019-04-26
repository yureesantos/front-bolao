import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../../Layout/Form/Form";
import InputGroup from "../../Layout/InputGroup/InputGroup";
import InputSelect from "../../Layout/InputSelect/InputSelect";

class MatchAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: ""
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.edited) {
      this.props.history.goBack();
    }
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Form
          name="addmatch"
          title="Adicionar Partida"
          formStyle="formWhite"
          btStyle="formWhite"
          btText="Adicionar"
          sendAction="matchAdd"
        >
          <InputGroup
            label="Descrição"
            Labeltype="form"
            htmlFor="desc"
            type="text"
            name="desc"
            value={this.state.desc}
            changed={this.onChangeHandler}
            error={this.props.errors.resultAEmpty}
            errosMsg={this.props.errors.resultAEmpty}
          />
          <InputSelect
            name="teamA"
            label="Time A"
            Labeltype="form"
            placeholder="Time A"
            error={this.props.errors.teamA}
            errosMsg={this.props.errors.teamA}
          />
          <InputSelect
            name="teamB"
            label="Time B"
            Labeltype="form"
            placeholder="Time B"
            error={this.props.errors.teamB}
            errosMsg={this.props.errors.teamB}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    edited: state.match.edited,
    errors: state.match.errors
  };
};

export default connect(mapStateToProps)(MatchAdd);
