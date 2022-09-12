import {ValidateToken} from "../../../../helpers/api/AuthCheck";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import {errorRes, successRes} from "../../../../helpers/jsonResponse";
import settings from "../../../../config/settings.json"


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
				console.log(settings)
				successRes(res, settings)
				break
			}
			case "POST": {
				
				break
			}
			
		}
		
		// if (!(collection instanceof Error)) {
		// 	successRes(res, collection)
		// } else {
		// 	errorRes(res, `${collectionName} not found.`, 404)
		// }
		
	} catch (err) {
		console.log(err)
		if (err instanceof MethodNotAllowedException) {
			errorRes(res, err.message, 405)
		} else {
			errorRes(res, err.message)
		}
		
	}
}
