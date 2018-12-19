import React, { Component, Fragment } from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import Loading from "./Loading";
import Anayltics from "./Anayltics";

import { fetchSentiment } from "../util/api";

class App extends Component {
	state = {
		loading: false,
		username: "",
		data: require("../SAMPLE.json"),
		queried_username: "",
		queried_num_tweets: 500,
		num_tweets: 500
		// data: null
	};

	handleUsernameChange = event => {
		const { value } = event.target;
		this.setState({ username: value });
	};

	handlePressSearch = () => {
		const { username, num_tweets } = this.state;

		this.setState({ loading: true }, () =>
			fetchSentiment(username, num_tweets)
				.then(({ data }) => {
					this.setState({
						data,
						queried_username: username,
						queried_num_tweets: num_tweets,
						loading: false
					});
				})
				.catch(error => {
					console.log(error);
					this.setState({ loading: false });
				})
		);
	};

	handleOnSelect = num_tweets => {
		this.setState({ num_tweets });
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
					onSelect={this.handleOnSelect}
				/>
				<Anayltics
					data={this.state.data}
					username={this.state.queried_username}
					num_tweets={this.state.queried_num_tweets}
				/>
			</Fragment>
		);
	}
}

export default App;
