import axios from "axios";

// const API = `https://floating-journey-91484.herokuapp.com/tweet?username=`;

const API = axios.create({
	baseURL: `https://floating-journey-91484.herokuapp.com/`
});
