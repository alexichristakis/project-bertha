import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import TopBar from "./TopBar";
import Loading from "./Loading";

import { fetchSentiment } from "../util/api";

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
		const { username } = this.state;
		console.log(username);
		this.setState({ loading: true }, () =>
			fetchSentiment(username)
				.then(res => {
					console.log(res);
					this.setState({ data: res, loading: false });
				})
				.catch(error => {
					console.log(error);
					this.setState({ loading: false });
				})
		);
	};

	render() {
		return (
			<Fragment>
				{this.state.loading && <Loading />}
				<TopBar
					loading={this.state.loading}
					username={this.state.username}
					onUsernameChange={this.handleUsernameChange}
					onSearch={this.handlePressSearch}
				/>
			</Fragment>
		);
	}
}

export default App;
