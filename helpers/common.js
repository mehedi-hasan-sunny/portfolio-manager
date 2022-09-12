import {toast} from "react-toastify";
import {GET, POST, PUT} from "../actions/http";

export const empty = (e) => {
	switch (e) {
		case "":
		case 0:
		case "0":
		case null:
		case false:
			return true;
		default:
			return !!((Array.isArray(e) && !e.length) || typeof (e) == "undefined" || !Object.keys(e).length);
	}
}

export const ucFirst = (e) => {
	return e.charAt(0).toUpperCase() + e.slice(1)
}

export const disabledFullForm = (form) => {
	for (let i = 0; i < form.elements.length; ++i) {
		form.elements[i].disabled = true;
	}
}

export const resetAndEnableFullForm = (form, reset = true) => {
	if (reset) {
		form.reset();
	}
	for (let i = 0; i < form.elements.length; ++i) {
		form.elements[i].disabled = false;
	}
}

export const commonGetServerSideProps = async (props = {}, context = {}) => {
	try {
		const {data} = await GET(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${props.adminApiUrl}`).setContext(context).exec();
		console.log(data)
		return {
			props: {...props, responseData: data ? (Array.isArray(data) ? data.reverse() : data) : []}
		}
	} catch (e) {
		return {
			props: {...props, responseData: []}
		}
	}
}

export const notify = (type, message) => {
	toast[type](message, {
		position: "bottom-right",
		hideProgressBar: true,
		theme: "colored"
	})
};


export const commonFromSubmitHandler = async (event, formData, apiUrl, item = null, onSuccessAction = null, {
	customSuccessMessage = null,
	customErrorMessage = null
} = {}) => {
	try {
		disabledFullForm(event.target);
		
		const URL = apiUrl.trim().replace(/^(\/)+/, '') + (!empty(item) && item?.id ? `/${item.id}` : '');
		
		const response = await (item?.id ? PUT : POST)(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${URL}`, formData).exec();
		
		if (response.code === 200 || response.code === 202) {
			const {data} = response
			if (data) {
				notify('success', customSuccessMessage ?? `${item ? 'Updated' : 'Created'} successfully.`)
				setTimeout(() => {
					resetAndEnableFullForm(event.target)
					onSuccessAction ? onSuccessAction(data) : null
				}, 500)
				return data;
			}
		} else {
			throw Error(`${response.error} \n ErrorCode: ${response.code}`)
		}
		
	} catch (err) {
		resetAndEnableFullForm(event.target, false)
		notify('error', customErrorMessage ?? `${err}`)
	}
};