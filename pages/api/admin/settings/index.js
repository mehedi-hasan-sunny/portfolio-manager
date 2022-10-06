import {ValidateToken} from "../../../../helpers/api/AuthCheck";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import {errorRes, successRes} from "../../../../helpers/jsonResponse";
import deepmerge from "deepmerge";
import CRUD from "../../../../helpers/CRUD";


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
		const collectionCRUD = new CRUD('settings', 'settings');
		let collection = null;
		let formData = {};
		
		switch (req.method) {
			case "GET": {
				const settingsDefault = require("../../../../config/settingsDefault.json");
				collection = await collectionCRUD.read();
				
				if (collection instanceof Error) {
					collection = {}
				} else {
					collection = collection[0]
					delete collection.id
				}
				
				successRes(res, deepmerge(settingsDefault, collection))
				break
			}
			case "POST": {
				
				Object.keys(req.body).forEach((key) => {
					const keyArr = key.split('.');
					formData = setNestedProp(formData, keyArr, req.body[key]);
				});
				
				collection = await collectionCRUD.read();
				if (collection instanceof Error) {
					collection = await collectionCRUD.create(formData)
				} else {
					collection = collection[0]
					collection = await collectionCRUD.update(collection.id, formData)
					delete collection.id
				}
				
				successRes(res, collection);
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
