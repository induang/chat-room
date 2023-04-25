import axios from "axios";
import noti from "./noti";


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
		noti({type: "error", message: error.message})
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
		const message = error.response?.data?.message || error.message;
		if(error.response?.status === 401){
			noti({type: 'error', message: "Unauthorization."})
			window.localStorage.removeItem('token');
			window.location.href = '/'
		}
		noti({type: 'error', message})
		return Promise.reject()
	}
)

export default httpRequest;