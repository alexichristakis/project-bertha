import React, { Component } from "react";
import styled from "styled-components";

import TimeSeries from "./TimeSeries";
import Mid from "./Mid";
import PosNeg from "./PosNeg";

const Wrapper = styled.div`
	height: 100%;
	max-width: 1500px;
	margin: 0 auto;
	align-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 16px 0 16px;
`;

class Anayltics extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.username !== this.props.username) return true;
		else if (nextProps.num_tweets !== this.props.num_tweets) return true;
		else return false;
	}

	render() {
		const { data, username, num_tweets } = this.props;

		if (data == null) return <div />;
		else {
			return (
				<Wrapper>
					<TimeSeries data={data} username={username} num_tweets={num_tweets} />
					<Mid data={data} />
					<PosNeg data={data} />
				</Wrapper>
			);
		}
	}
}

export default Anayltics;
