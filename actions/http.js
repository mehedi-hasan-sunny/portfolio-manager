import {getCookie} from "cookies-next";
import {empty} from "../helpers/common";

const HEADERS = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'token': getCookie("token") ?? ''
}


class Http {
	constructor(url, {method = "get", query, body} = {}) {
		this.url = url;
		this.method = method;
		this.query = query;
		this.body = body;
		this.context = null;
	}
	
	async get() {
		this.method = "get";
		if (!empty(this.query)) {
			this.query = `?` + (new URLSearchParams(this.query))
		} else {
			this.query = ''
		}
		return await this.#request()
	}
	
	async post() {
		this.method = "post";
		return await this.#request()
	}
	
	async put() {
		this.method = "put";
		return await this.#request()
	}
	
	async delete() {
		this.method = "delete";
		return await this.#request()
	}
	
	setContext({req, res}) {
		this.context = {req, res};
		HEADERS.token = getCookie("token", {req, res});
		return this;
	}
	
	async #checkResponse(response) {
		const data = await response.json();
		
		if (data?.error && (data?.code === 401 || data?.code === 403)) {
			if (!this.context)
				window.location.href = "/login"
		}
		
		return data;
	}
	
	async #request() {
		const options = {
			method: this.method,
			headers: HEADERS
		}
		if (this.body) {
			if(this.body instanceof FormData)
			{
				delete HEADERS["Content-Type"]
			}
			options.body = this.body;
		}
		
		const URL = this.url + (this.query ?? '')
		
		const response = await fetch(URL, options);
		return this.#checkResponse(response);
	}
}

export const GET = (url, query = {}) => {
	const http = new Http(url, {query});
	return {
		setContext: function (context) {
			http.setContext(context);
			return this;
		},
		exec: async function () {
			return await http.get();
		},
	};
}

export const POST = (url, formData, stringify = true) => {
	return POSTorPUT({url, formData, stringify});
}

export const PUT = (url, formData, stringify = true) => {
	return POSTorPUT({method: "put", url, formData, stringify});
}

const POSTorPUT = ({method = "post", url, formData, stringify = true}) => {
	const http = new Http(url, {body: stringify ? JSON.stringify(formData) : formData});
	return {
		setContext: function (context) {
			http.setContext(context)
			return this;
		},
		exec: async function () {
			return await http[method]();
		},
	};
}

export const DELETE = (url) => {
	const http = new Http(url);
	return {
		setContext: function (context) {
			http.setContext(context);
			return this;
		},
		exec: async function () {
			return await http.delete();
		},
	};
}