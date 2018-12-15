import axios from "axios";

// const API = `https://floating-journey-91484.herokuapp.com/tweet?username=`;

const baseURL = `https://floating-journey-91484.herokuapp.com/`;
// const baseURL = `http://0.0.0.0:5000/`;

const API = axios.create({
	baseURL
});

export const fetchSentiment = (username, num_tweets) => {
	console.log(num_tweets);
	return new Promise((resolve, reject) => {
		API.get("/tweet", { params: { username, num_tweets } })
			.then(res => {
				resolve(res);
			})
			.catch(error => reject(error));
	});
};

// http://0.0.0.0:5000/tweet?username=lukas
