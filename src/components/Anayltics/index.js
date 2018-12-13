import React, { Component } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

class Anayltics extends Component {
	render() {
		const { data } = this.props;
		return (
			<Wrapper>
				<VictoryPie
					colorScale={["green", "tomato"]}
					padAngle={3}
					height={200}
					innerRadius={35}
					// animate={{
					// 	duration: 2000
					// }}
					data={[{ x: "Positive", y: data.pos }, { x: "Negative", y: data.neg }]}
				/>
			</Wrapper>
		);
	}
}

export default Anayltics;
