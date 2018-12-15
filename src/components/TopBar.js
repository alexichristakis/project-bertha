import React, { Component } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";

import colors from "../lib/colors";

import Input from "./Input";

const Wrapper = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	background-color: ${colors.gray};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 30px;
	font-weight: 700;
	color: ${colors.black};
	padding-bottom: 5px;
`;

const Nav = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

const Button = styled.img`
	cursor: pointer;
	width: 30px;
	height: 30px;
	transition: all 170ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
	&:hover {
		transform: scale(1.25);
	}
`;

const options = [
	{ value: 100, label: "100" },
	{ value: 200, label: "200" },
	{ value: 500, label: "500" },
	{ value: 1000, label: "1000" }
];

const customStyles = {
	container: (provided, state) => ({
		...provided,
		flex: 1,
		height: "56px",
		marginRight: "20px"
	}),
	valueContainer: (provided, state) => ({
		...provided,
		height: "56px"
	}),
	control: (provided, state) => ({
		...provided,
		borderRadius: "20px",
		borderWidth: "0px",
		backgroundColor: colors.lightgray
	}),
	menu: (provided, state) => ({
		...provided,
		borderRadius: "20px",
		borderWidth: "0px",
		overflow: "hidden"
	})
};

class TopBar extends Component {
	state = {};

	handleOnChange = (item, { action }) => {
		// console.log(type);
		if (action === "select-option") this.props.onSelect(item.value);
	};

	render() {
		return (
			<Wrapper>
				<Title>Twitterlytics</Title>
				<Input
					onSearch={this.props.onSearch}
					onChange={this.props.onUsernameChange}
					label="enter a Twitter handle"
					value={this.props.username}
					locked={this.props.loading}
					active={false}
				/>
				<Select
					placeholder="number of Tweets"
					styles={customStyles}
					options={options}
					onChange={this.handleOnChange}
				/>
				<Button
					onClick={() => window.open("https://github.com/alexichristakis/project-bertha")}
					src={require("../assets/github-logo.png")}
				/>
			</Wrapper>
		);
	}
}

export default TopBar;
