import {errorRes, successRes} from "!/helpers/jsonResponse";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import CRUD from "../../../../helpers/CRUD";

export default async function handler(req, res) {
	
	const checkMethod = () => {
		if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const {id} = req.query;
		
		const skillsCRUD = new CRUD('Skills','skills');
		let successMessage;
		let skills = null;
		
		switch (req.method) {
			case "GET": {
				skills = await skillsCRUD.read(id)
				break
			}
			case "PUT": {
				const updateData = {
					title: req.body.title.trim(),
					type: req.body.type.trim(),
					rating: req.body.rating
				}
				skills = await skillsCRUD.update(id, updateData)
				break
			}
			case "DELETE": {
				successMessage =  await skillsCRUD.delete(id)
				break
			}
		}
		
		if (successMessage || !(skills instanceof Error)) {
			successRes(res, successMessage ?? skills)
		} else {
			errorRes(res, "Skills not found.", 404)
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
