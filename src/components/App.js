import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import TopBar from "./TopBar";
// import Loading from "./Loading";

const Wrapper = styled.div`
	display: flex;
	background-color: white;
	flex-direction: column;
	align-items: center;
	padding-top: 80px;
`;

const TopBar2 = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	height: 50px;
	background-color: red;
`;

class App extends Component {
	state = {
		loading: false,
		username: ""
	};

	handleUsernameChange = event => {
		const { value } = event.target;
		this.setState({ username: value });
	};

	handlePressSearch = () => {};

	render() {
		return (
			<Fragment>
				<TopBar
					loading={this.state.loading}
					username={this.state.username}
					onUsernameChange={this.handleUsernameChange}
					onPressSearch={this.handlePressSearch}
				/>
			</Fragment>
		);
	}
}

export default App;
