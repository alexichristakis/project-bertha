import React, { Component } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import Tweet from "./Tweet";

const Wrapper = styled.div`
	// width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 16px 0 16px;
`;

class Anayltics extends Component {
	render() {
		const { data } = this.props;

		console.log(data);
		if (data == null) return <div />;
		else {
			const { num_neg, num_pos, most_positive, most_negative } = data;
			return (
				<Wrapper>
					<Tweet
						header={"most positive tweet:"}
						text={most_positive.text}
						time={most_positive.time}
					/>
					<VictoryPie
						animate={true}
						colorScale={["red", "green"]}
						padAngle={3}
						height={300}
						innerRadius={50}
						style={{
							labels: {
								fontSize: 15
							}
						}}
						data={[{ x: "Negative", y: num_pos }, { x: "Positive", y: num_neg }]}
					/>
					<Tweet
						header={"most negative tweet:"}
						text={most_negative.text}
						time={most_negative.time}
					/>
				</Wrapper>
			);
		}
	}
}

export default Anayltics;
