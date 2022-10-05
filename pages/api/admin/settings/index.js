import {ValidateToken} from "../../../../helpers/api/AuthCheck";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import {errorRes, successRes} from "../../../../helpers/jsonResponse";
import * as path from "path";
import deepmerge from "deepmerge";

const fs = require('fs');

let SETTINGS_PATH = '';
if (process && process.env.NODE_ENV === 'development') {
	SETTINGS_PATH = path.join(process.cwd(), ["config", "settings.json"].join(path.sep));
} else {
	SETTINGS_PATH = "/tmp/settings.json";
}

function getSettingsData(){
	let settingsData = {};
	try {
		if (process && process.env.NODE_ENV === 'development') {
			settingsData = require("../../../../config/settings.json");
		} else {
			if(fs.existsSync(SETTINGS_PATH)){
				settingsData = fs.readFileSync(SETTINGS_PATH);
				settingsData = JSON.parse(settingsData);
			}
		}
	} catch (e) {
	}
	const settingsDefault = require("../../../../config/settingsDefault.json");
	settingsData = deepmerge(settingsDefault, settingsData);
	return settingsData;
}

export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if (authCheck !== true) {
		return authCheck
	}
	
	const checkMethod = () => {
		if (!['GET', 'POST'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		switch (req.method) {
			case "GET": {
				let settingsData = getSettingsData();
				successRes(res, settingsData)
				break
			}
			case "POST": {
			
				const settings = getSettingsData();
				let formData = {};
				if (settings instanceof Object) {
					Object.keys(req.body).forEach((key) => {
						const keyArr = key.split('.');
						formData = setNestedProp(formData, keyArr, req.body[key]);
					});
				}
				const data = {...settings, ...formData};
				fs.writeFileSync(SETTINGS_PATH, JSON.stringify(data));
				
				successRes(res, data);
				break;
			}
		}
		
		// if (!(collection instanceof Error)) {
		// 	successRes(res, collection)
		// } else {
		// 	errorRes(res, `${collectionName} not found.`, 404)
		// }
		
	} catch (err) {
		console.error(err)
		if (err instanceof MethodNotAllowedException) {
			errorRes(res, err.message, 405)
		} else {
			errorRes(res, err.message)
		}
	}
}

const setNestedProp = (obj = {}, [first, ...rest], value) => ({
	...obj,
	[first]: rest.length
			? setNestedProp(obj[first], rest, value)
			: value
});
