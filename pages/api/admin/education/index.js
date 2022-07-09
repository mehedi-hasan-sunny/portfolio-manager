
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
		
		const educationCRUD = new CRUD('Education','education');
		let education = null;
		
		switch (req.method) {
			case "GET": {
				education = await educationCRUD.read()
				break
			}
			case "POST": {
				const formData = {
					institution: req.body.institution.trim(),
					department: req.body.department.trim(),
					passingYear: req.body.passingYear,
				}
				education = await educationCRUD.create(formData)
				break
			}
			
		}
		
		if (!(education instanceof Error)) {
			successRes(res, education)
		} else {
			errorRes(res, "Education not found.", 404)
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
