import {getCookie} from "cookies-next";
import {empty} from "../helpers/common";

export const GET = async (url, query = {}) => {
	if (!empty(query)) {
		query = `?` + (new URLSearchParams(query))
	} else {
		query = ''
	}
	
	const response = await fetch(url + query, {
		method: 'GET',
		headers: {
			token: getCookie("token") ?? ''
		}
	});
	
	return await checkResponse(response);
	
}

export const POST = async (url, formData) => {
	
	const response = await fetch(url, {
		method: empty(formData) ? "post" : "put",
		body: JSON.stringify(formData),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			token: getCookie("token") ?? ''
		},
	});
	return await checkResponse(response);
}

const checkResponse = async (response) =>{
	const data = await response.json();
	
	if (data?.error && (data?.code === 401 || data?.code === 403)) {
		window.location.href = "/login"
	}
	
	return data;
}