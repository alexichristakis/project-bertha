import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import moment from "moment";
import {
	VictoryZoomContainer,
	VictoryLabel,
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryLine
} from "victory";

import colors from "../../lib/colors";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.medgray};
	border-radius: 0 0 20px 20px;
	padding-bottom: 20px;
	display: flex;
	flex-direction: row;
`;

class TimeSeries extends Component {
	state = {
		num_tweets: 0,
		time_series: [],
		zoomedXDomain: [],
		combined_dataset: [],
		positive: [],
		negative: []
	};

	componentDidMount() {
		this.update();
	}

	// wow this is pretty janky - not proud
	componentWillReceiveProps(nextProps) {
		if (
			this.props.username !== nextProps.username ||
			this.props.num_tweets !== nextProps.num_tweets
		) {
			this.update();
		}
	}

	// this too...
	update = () => {
		const { data, num_tweets } = this.props;
		this.setState({ time_series: data.time_series, num_tweets: num_tweets }, () => {
			this.updateData([-1 * Infinity, Infinity], () =>
				this.setState({ entireDomain: this.getEntireDomain })
			);
		});
	};

	getEntireDomain() {
		const { combined_dataset } = this.state;
		return {
			y: [_.minBy(combined_dataset, d => d.y).y, _.maxBy(combined_dataset, d => d.y).y],
			x: [combined_dataset[0].x, _.last(combined_dataset).x]
		};
	}

	filter = (entry, domain) => {
		const ts = moment(entry.x).unix();
		return ts >= domain[0] && ts <= domain[1];
	};

	updateData = (domain, callback) => {
		const { time_series } = this.props.data;

		let combined_dataset = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.score
				};
			})
			.reverse()
			.filter(entry => this.filter(entry, domain));

		// console.log("combined:", combined_dataset);

		let positive = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.pos
				};
			})
			.reverse()
			.filter(entry => this.filter(entry, domain));

		let negative = time_series
			.map(entry => {
				return {
					time: entry.time,
					x: entry.time,
					y: entry.neg
				};
			})
			.reverse()
			.filter(entry => this.filter(entry, domain));

		this.setState({ combined_dataset, positive, negative }, callback);
	};

	onDomainChange = domain => {
		this.setState({
			zoomedXDomain: domain.x
		});
	};

	// function to aggregate time series data by day
	aggregateData = data => {
		let aggregated = [];

		let sum = 0;
		let count = 0;
		data.forEach((entry, index) => {
			if (index > 0) {
				if (entry.time == data[index - 1].time) {
					sum += entry.y;
					count += 1;
				} else {
					if (sum) {
						sum /= count;
						aggregated.push({ time: data[index - 1].time, x: data[index - 1].time, y: sum });
						sum = 0;
						count = 0;
					} else {
						aggregated.push(entry);
					}
				}
			}
		});

		return aggregated;
	};

	render() {
		const { combined_dataset, positive, negative } = this.state;

		let new_combined = this.aggregateData(combined_dataset);
		let new_positive = this.aggregateData(positive);
		let new_negative = this.aggregateData(negative);

		return (
			<Wrapper>
				<VictoryChart
					theme={VictoryTheme.grayscale}
					containerComponent={
						<VictoryZoomContainer zoomDimension="x" onZoomDomainChange={this.onDomainChange} />
					}
				>
					<VictoryLabel x={160} y={24} style={{ fontSize: "20px" }} text="Positivity Score" />
					<VictoryLine
						data={new_combined}
						interpolation="bundle"
						domain={{ y: [-1, 1] }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
					/>

					<VictoryAxis crossAxis dependentAxis label="Positivity" />
					<VictoryAxis
						crossAxis
						offsetY={50}
						label="Date"
						tickCount={5}
						style={{
							axis: { stroke: "#756f6a" },
							axisLabel: { fontSize: 15, padding: 30 },
							grid: { stroke: t => (t > 0.5 ? colors.blue : "grey") },
							ticks: { stroke: "grey", size: 5 },
							tickLabels: { fontSize: 8, padding: 5 }
						}}
					/>
				</VictoryChart>
				<VictoryChart
					theme={VictoryTheme.grayscale}
					containerComponent={
						<VictoryZoomContainer zoomDimension="x" onZoomDomainChange={this.onDomainChange} />
					}
				>
					<VictoryLabel
						x={110}
						y={24}
						style={{ fontSize: "20px" }}
						text="Positive & Negative Probabilities"
					/>
					<VictoryLine
						data={new_positive}
						interpolation="bundle"
						style={{
							data: { stroke: colors.green }
						}}
						domain={{ y: [0, 1] }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
					/>
					<VictoryLine
						data={new_negative}
						interpolation="bundle"
						style={{
							data: { stroke: colors.red }
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
							axisLabel: { fontSize: 15, padding: 30 },
							grid: { stroke: t => (t > 0.5 ? colors.blue : "grey") },
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
