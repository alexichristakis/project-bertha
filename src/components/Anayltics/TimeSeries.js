import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import moment from "moment";
import {
	VictoryZoomContainer,
	VictoryChart,
	VictoryTheme,
	VictoryAxis,
	VictoryLine
} from "victory";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

class TimeSeries extends Component {
	state = {
		time_series: [],
		zoomedXDomain: [],
		combined_dataset: [],
		positive: [],
		negative: []
	};

	componentDidMount() {
		this.update();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.username !== nextProps.username) {
			this.update();
		}
	}

	update = () => {
		this.setState({ time_series: this.props.data.time_series }, () => {
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

	// getData() {
	// 	const { zoomedXDomain } = this.state;
	// 	this.updateData(zoomedXDomain);
	// }

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

	render() {
		const { combined_dataset, positive, negative } = this.state;
		// console.log(combined_dataset);

		return (
			<Wrapper>
				<VictoryChart
					theme={VictoryTheme.grayscale}
					containerComponent={
						<VictoryZoomContainer zoomDimension="x" onZoomDomainChange={this.onDomainChange} />
					}
				>
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
				<VictoryChart
					theme={VictoryTheme.grayscale}
					containerComponent={
						<VictoryZoomContainer zoomDimension="x" onZoomDomainChange={this.onDomainChange} />
					}
				>
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
