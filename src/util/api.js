import axios from "axios";

// const API = `https://floating-journey-91484.herokuapp.com/tweet?username=`;

const API = axios.create({
	baseURL: `https://floating-journey-91484.herokuapp.com/`
});

export const fetchSentiment = username => {
	return new Promise((resolve, reject) => {
		API.get("/tweet", { params: { username } })
			.then(res => {
				resolve(res);
			})
			.catch(error => reject(error));
	});
};
