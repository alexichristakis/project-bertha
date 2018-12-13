import React, { Component } from "react";
import styled from "styled-components";
import { VictoryLabel, VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from "victory";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

class TimeSeries extends Component {
	render() {
		const { time_series } = this.props.data;

		let combined_dataset = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.score
				};
			})
			.reverse();

		let positive = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.pos
				};
			})
			.reverse();

		let negative = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.neg
				};
			})
			.reverse();

		return (
			<Wrapper>
				<VictoryChart theme={VictoryTheme.grayscale}>
					<VictoryLine
						data={combined_dataset}
						domain={{ y: [-1, 1] }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
					/>

					<VictoryAxis crossAxis dependentAxis label="Score" />
					<VictoryAxis
						crossAxis
						offsetY={50}
						label="Date"
						tickCount={5}
						style={{
							axis: { stroke: "#756f6a" },
							axisLabel: { fontSize: 20, padding: 30 },
							grid: { stroke: t => (t > 0.5 ? "red" : "grey") },
							ticks: { stroke: "grey", size: 5 },
							tickLabels: { fontSize: 8, padding: 5 }
						}}
					/>
				</VictoryChart>
				<VictoryChart theme={VictoryTheme.grayscale}>
					<VictoryLine
						data={positive}
						style={{
							data: { stroke: "green" }
						}}
						domain={{ y: [0, 1] }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
					/>
					<VictoryLine
						data={negative}
						style={{
							data: { stroke: "red" }
						}}
						domain={{ y: [0, 1] }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
					/>

					<VictoryAxis crossAxis dependentAxis label="Score" />
					<VictoryAxis
						crossAxis
						offsetY={50}
						label="Date"
						tickCount={5}
						style={{
							axis: { stroke: "#756f6a" },
							axisLabel: { fontSize: 20, padding: 30 },
							grid: { stroke: t => (t > 0.5 ? "red" : "grey") },
							ticks: { stroke: "grey", size: 5 },
							tickLabels: { fontSize: 8, padding: 5 }
						}}
					/>
				</VictoryChart>
			</Wrapper>
		);
	}
}

export default TimeSeries;
