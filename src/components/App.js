import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import TopBar from "./TopBar";
import Loading from "./Loading";

// import { fetchSentiment } from "../util/api";

class App extends Component {
	state = {
		loading: false,
		username: "",
		data: {}
	};

	handleUsernameChange = event => {
		const { value } = event.target;
		this.setState({ username: value });
	};

	handlePressSearch = () => {
		// const { username } = this.state;
		// fetchSentiment(username).then(res => {
		// 	this.setState({ data: res });
		// });
	};

	render() {
		return (
			<Fragment>
				{this.state.loading && <Loading />}
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
