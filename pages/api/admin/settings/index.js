import {ValidateToken} from "../../../../helpers/api/AuthCheck";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import {errorRes, successRes} from "../../../../helpers/jsonResponse";
import * as path from "path";
const fs = require('fs');
const SETTINGS_PATH = path.join(process.cwd(),["config","settings.json"].join(path.sep));
let settingsData = {};

try {
	settingsData = require("../../../../config/settings.json");
} catch (e) {
}
const settingsDefault = require("../../../../config/settingsDefault.json");
settingsData = {...settingsDefault, ...settingsData};


export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
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
				successRes(res, settingsData)
				break
			}
			case "POST": {
				let data;
				if (fs.existsSync(SETTINGS_PATH)) {
					data = fs.readFileSync(SETTINGS_PATH, 'utf8');
				} else {
					data = settingsData;
				}
				
				const settings = (data.length) ? JSON.parse(data) : [];
				let formData = {};
				if (settings instanceof Object) {
					Object.keys(req.body).forEach((key) => {
						const keyArr = key.split('.');
						formData = setNestedProp(formData, keyArr, req.body[key]);
					});
				}
				data = {...settings, ...formData};
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

const setNestedProp = (obj = {}, [first, ...rest] , value) => ({
	...obj,
	[first]: rest.length
			? setNestedProp(obj[first], rest, value)
			: value
});
