import {errorRes, successRes} from "../jsonResponse";
import MethodNotAllowedException from "../CustomError";
import CRUD from "../CRUD";
import {ucFirst} from "../common";

const GetPostAction = async (req, res, collectionName, formData) => {
	
	const checkMethod = () => {
		if (!['GET', 'POST'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const collectionCRUD = new CRUD(collectionName,collectionName);
		let collection = null;
		
		switch (req.method) {
			case "GET": {
				collection = await collectionCRUD.read()
				break
			}
			case "POST": {
				collection = await collectionCRUD.create(formData)
				break
			}
			
		}
		
		if (!(collection instanceof Error)) {
			successRes(res, collection)
		} else {
			errorRes(res, `${collectionName} not found.`, 404)
		}
		
	} catch (err) {
		console.log(err)
		if (err instanceof MethodNotAllowedException) {
			errorRes(res, err.message, 405)
		} else {
			errorRes(res, err.message)
		}
		
	}
	
}

export default GetPostAction;
