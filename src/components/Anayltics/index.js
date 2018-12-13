import React, { Component } from "react";
import styled from "styled-components";

import TimeSeries from "./TimeSeries";
import PosNeg from "./PosNeg";

const Wrapper = styled.div`
	// width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 16px 0 16px;
`;

class Anayltics extends Component {
	render() {
		const { data, username } = this.props;

		// console.log(data);
		if (data == null) return <div />;
		else {
			return (
				<Wrapper>
					<TimeSeries data={data} username={username} />
					<PosNeg data={data} />
				</Wrapper>
			);
		}
	}
}

export default Anayltics;
