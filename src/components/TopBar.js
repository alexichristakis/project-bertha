import React, { Component } from "react";
import styled, { css } from "styled-components";
import colors from "../lib/colors";

import Input from "./Input";

const Wrapper = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	padding-left: 20px;
	background-color: rgba(250, 250, 250, 0.9);
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

class TopBar extends Component {
	state = {};

	render() {
		return (
			<Wrapper>
				<Title>sentimenter</Title>
				<Input label="enter a Twitter handle" active={false} />
			</Wrapper>
		);
	}
}

export default TopBar;
