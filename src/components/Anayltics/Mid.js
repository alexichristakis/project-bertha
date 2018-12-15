import React from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";
import moment from "moment";

import colors from "../../lib/colors";

import Tweet from "./Tweet";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 16px 0 16px;
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
	margin: 20px;
	font-size: ${props => (props.xlarge ? "75px" : "40px")};
	font-weight: bold;
	text-align: center;
`;

const Mid = ({ data }) => {
	let {
		num_neg,
		num_pos,
		num_neu,
		most_positive,
		most_negative,
		num_political,
		num_art,
		num_tech,
		num_sports,
		time_series
	} = data;

	const num_tweets = time_series.length;
	const num_months = moment
		.duration(moment(time_series[0].time).diff(moment(time_series[num_tweets - 1].time)))
		.asMonths();

	const tweets_per_month = Math.round((num_tweets / num_months) * 100) / 100;

	const positive_tweet = most_positive.shift();
	const negative_tweet = most_negative.shift();

	return (
		<Wrapper>
			<div style={{ display: "flex", flex: 2 }}>
				<VictoryPie
					animate={true}
					colorScale={["red", "orange", "green"]}
					padAngle={3}
					height={300}
					innerRadius={60}
					style={{
						labels: {
							fontSize: 15
						}
					}}
					data={[
						{ x: "Negative", y: num_pos },
						{ x: "Neutral", y: num_neu },
						{ x: "Positive", y: num_neg }
					]}
				/>
			</div>
			<Header>
				<Header xlarge>{tweets_per_month}</Header>
				Tweets / month
			</Header>
			<div style={{ display: "flex", flex: 2 }}>
				<VictoryPie
					animate={true}
					colorScale={["red", "blue", "orange", "green"]}
					padAngle={3}
					height={300}
					innerRadius={60}
					style={{
						labels: {
							fontSize: 15
						}
					}}
					data={[
						{ x: "Sports", y: num_sports },
						{ x: "Politics", y: num_political },
						{ x: "Art", y: num_art },
						{ x: "Technology", y: num_tech }
					]}
				/>
			</div>
		</Wrapper>
	);
};

export default Mid;
