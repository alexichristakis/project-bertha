import React from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import Tweet from "./Tweet";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 16px 0 16px;
`;

const PosNeg = ({ data }) => {
	const { num_neg, num_pos, num_neu, most_positive, most_negative } = data;
	return (
		<Wrapper>
			<Tweet header={"most positive tweet:"} text={most_positive.text} time={most_positive.time} />
			<div style={{ display: "flex", flex: 3 }}>
				<VictoryPie
					animate={true}
					colorScale={["red", "orange", "green"]}
					padAngle={3}
					height={300}
					innerRadius={50}
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
			<Tweet header={"most negative tweet:"} text={most_negative.text} time={most_negative.time} />
		</Wrapper>
	);
};

export default PosNeg;
