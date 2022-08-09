import {getCookie} from "cookies-next";
import {empty} from "../helpers/common";

const HEADERS = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'token': getCookie("token") ?? ''
}


class Http {
	constructor(url, {method = "get", query, body}) {
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

export const POST = (url, formData) => {
	return POSTorPUT({url, formData});
}

export const PUT = (url, formData) => {
	return POSTorPUT({method: "put", url, formData});
}

const POSTorPUT = ({method = "post", url, formData}) => {
	const http = new Http(url, {body: JSON.stringify(formData)});
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
