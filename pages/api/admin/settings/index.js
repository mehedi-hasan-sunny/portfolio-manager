import {ValidateToken} from "../../../../helpers/api/AuthCheck";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import {errorRes, successRes} from "../../../../helpers/jsonResponse";
import * as path from "path";
const fs = require('fs');
const SETTINGS_PATH = path.join(process.cwd(),["config","settings.json"].join(path.sep));
const settings = require("../../../../config/settings.json");


export default async function handler(req, res) {
	// const authCheck = await ValidateToken({req, res});
	// if(authCheck !== true){
	// 	return authCheck
	// }
	
	const checkMethod = () => {
		if (!['GET', 'POST'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		switch (req.method) {
			case "GET": {
				successRes(res, settings)
				break
			}
			case "POST": {
				
				const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
				const settings = (data.length) ? JSON.parse(data): [];
				let formData = {};
				if (settings instanceof Object){
					Object.keys(req.body).forEach((key) =>{
						const keyArr = key.split('.');
						formData = setNestedProp(formData, keyArr, req.body[key]);
					});
				}
				fs.writeFileSync(SETTINGS_PATH, JSON.stringify({...settings, ...formData}));
				
				successRes(res, req.body)
				break
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
