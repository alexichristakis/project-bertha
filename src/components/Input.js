import React, { Component } from "react";
import styled from "styled-components";
// import { TransitionMotion, spring } from "react-motion";

const Field = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 20px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
  ${props =>
    props.active
      ? `
      background-color: #ffffff;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    `
      : `
      &:hover {
        background-color: rgba(255, 255, 255, 0.45);
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
      }
  `};
`;

const Text = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;
`;

class Input extends Component {
  state = {
    active: (this.props.locked && this.props.active) || false,
    value: this.props.value || "",
    error: this.props.error || "",
    label: this.props.label || "Label"
  };

  changeValue = event => {
    const value = event.target.value;
    this.setState({ value, error: "" });
  };

  handleKeyPress = event => {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  };

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;

    return (
      <Field active={active}>
        <Text
          id={1}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue}
          onKeyPress={this.handleKeyPress}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
      </Field>
    );
  }
}

export default Input;
