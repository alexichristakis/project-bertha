import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaSearch, FaAt } from "react-icons/fa";

import colors from "../lib/colors";

const Field = styled.div`
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  position: relative;
  background-color: ${colors.lightgray};
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
  ${props =>
    !props.locked &&
    (props.active
      ? css`
          background-color: #ffffff;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
        `
      : css`
          &:hover {
            background-color: rgba(255, 255, 255, 0.45);
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
          }
        `)};
`;

const At = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 15px;
  padding-top: 21px;
  color: ${colors.darkgray};
`;

const Text = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px 0px 35px;
  border: none;
  border-radius: 4px;
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

const Button = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 21px;
  padding-top: 21px;
  cursor: pointer;
  transition: all 170ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  &:hover {
    color: #afeeff;
    transform: scale(1.25);
  }
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
`;

class Input extends Component {
  state = {
    active: false
  };

  handleKeyPress = event => {
    if (event.which === 13) {
      this.props.onSearch();
    }
  };

  render() {
    const { active } = this.state;
    const { label, value, onChange, locked } = this.props;

    return (
      <Field active={active} locked={locked}>
        <At>
          <FaAt />
        </At>
        <Text
          id={1}
          type="text"
          disabled={locked}
          value={value}
          placeholder={label}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <Button disabled={locked} onClick={this.props.onSearch}>
          <FaSearch />
        </Button>
      </Field>
    );
  }
}

export default Input;
