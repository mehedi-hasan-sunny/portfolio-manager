import {errorRes, successRes} from "../jsonResponse";
import MethodNotAllowedException from "../CustomError";
import CRUD from "../CRUD";
import {ucFirst} from "../common";

const EditDeleteGetByIdAction = async (req, res, collectionName, formData) => {
	
	const checkMethod = () => {
		if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const {id} = req.query;
		
		const collectionCRUD = new CRUD(ucFirst(collectionName), collectionName);
		let successMessage;
		let collection = null;
		
		switch (req.method) {
			case "GET": {
				collection = await collectionCRUD.read(id)
				break
			}
			case "PUT": {
				collection = await collectionCRUD.update(id, formData)
				break
			}
			case "DELETE": {
				successMessage = await collectionCRUD.delete(id)
				break
			}
		}
		
		if (successMessage || !(collection instanceof Error)) {
			successRes(res, successMessage ?? collection)
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

export default EditDeleteGetByIdAction;
