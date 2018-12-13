import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import TopBar from "./TopBar";
import Loading from "./Loading";
import Anayltics from "./Anayltics";

import { fetchSentiment } from "../util/api";

class App extends Component {
	state = {
		loading: false,
		username: "",
		data: require("../SAMPLE.json")
		// data: null
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
					const { data } = res;
					this.setState({ data, loading: false });

					/* some rudimentary analysis */
					// let pos = 0;
					// let neg = 0;
					// const { data } = res;
					// data.forEach(tweet => {
					// 	if (tweet.sentiment == "pos") pos++;
					// 	if (tweet.sentiment == "neg") neg++;
					// });

					// let analytic_data = { pos, neg, total: pos + neg };

					// this.setState({ data: analytic_data, loading: false });
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
				<Anayltics data={this.state.data} />
			</Fragment>
		);
	}
}

export default App;
