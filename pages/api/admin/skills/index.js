
import {errorRes, successRes} from "!/helpers/jsonResponse";
import MethodNotAllowedException from "../../../../helpers/CustomError";
import CRUD from "../../../../helpers/CRUD";

export default async function handler(req, res) {
	
	const checkMethod = () => {
		if (!['GET', 'POST'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const skillsCRUD = new CRUD('Skills','skills');
		let skills = null;
		
		switch (req.method) {
			case "GET": {
				skills = await skillsCRUD.read()
				break
			}
			case "POST": {
				const formData = {
					title: req.body.title.trim(),
					type: req.body.type.trim(),
					rating: req.body.rating
				}
				skills = await skillsCRUD.create(formData)
				break
			}
			
		}
		
		if (!(skills instanceof Error)) {
			successRes(res, skills)
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
