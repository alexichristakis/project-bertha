import React from "react";
import styled from "styled-components";

import colors from "../../lib/colors";

const Wrapper = styled.div`
	display: flex;
	flex: 3;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const TweetBody = styled.div`
	background-color: ${props => props.backgroundColor || colors.darkgray};
	padding: 20px;
	border-radius: 15px;
`;

const Header = styled.div`
	color: ${colors.darkgray};
	margin: 0 0 12px 12px;
	font-size: 20px;
`;

const Text = styled.div`
	color: white;
	font-size: 20px;
`;

const Time = styled.div`
	color: ${colors.lightgray};
	margin-top: 12px;
	font-size: 15px;
`;

const Tweet = ({ time, text, header, backgroundColor }) => {
	return (
		<Wrapper>
			<Header>{header}</Header>
			<TweetBody backgroundColor={backgroundColor}>
				<Text>{text}</Text>
				<Time>{time}</Time>
			</TweetBody>
		</Wrapper>
	);
};

export default Tweet;
