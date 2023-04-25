import axios from "axios";


const httpRequest = axios.create({
	baseURL: 'http://localhost:5000',
	timeout: 10000,
	headers: {
		"Content-Type": 'application/json;charset=utf-8',
	}
});

httpRequest.interceptors.request.use(
	(config) => {
		const token = window.localStorage.getItem('token') || "";
		if(config.headers){
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		console.log(error)
		Promise.reject(error);
	}
)

httpRequest.interceptors.response.use(
	(response) => {
		const token = response.headers.Authorization;
		token && window.localStorage.setItem('token', token);
		return response.data;
	},
	(error) => {
		const message = error.response?.data?.errorMessage || error.message;
		if(error.response?.status === 401){
			console.log("unauthenrization");
			window.localStorage.removeItem('token');
			window.location.href = '/'
		}
		return Promise.reject()
	}
)

export default httpRequest;