import React from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import colors from "../../lib/colors";

import Tweet from "./Tweet";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 16px 0 16px;
	margin-bottom: 20px;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 16px 0 16px;
`;

const Column = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.div`
	color: ${colors.darkgray};
	margin: 12px;
	font-size: 20px;
`;

const PosNeg = ({ data }) => {
	let {
		num_neg,
		num_pos,
		num_neu,
		most_positive,
		most_negative,
		num_political,
		num_art,
		num_tech,
		num_sports
	} = data;

	const positive_tweet = most_positive.shift();
	const negative_tweet = most_negative.shift();

	return (
		<Wrapper>
			<Column>
				<Tweet
					backgroundColor={colors.green}
					header={"most positive tweet:"}
					text={positive_tweet[2]}
					time={positive_tweet[1]}
				/>
				<Header>top positive tweets:</Header>
				{most_positive.map(tweet => (
					<Tweet positive text={tweet[2]} time={tweet[1]} />
				))}
			</Column>
			<div style={{ display: "flex", flex: 1 }} />
			<Column>
				<Tweet
					backgroundColor={colors.red}
					header={"most negative tweet:"}
					text={negative_tweet[2]}
					time={negative_tweet[1]}
				/>
				<Header>top negative tweets:</Header>
				{most_negative.map(tweet => (
					<Tweet negative text={tweet[2]} time={tweet[1]} />
				))}
			</Column>
		</Wrapper>
	);
};

export default PosNeg;
