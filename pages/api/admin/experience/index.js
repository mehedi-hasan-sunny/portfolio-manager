
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
		
		const experienceCRUD = new CRUD('Experience','experience');
		let experience = null;
		
		switch (req.method) {
			case "GET": {
				experience = await experienceCRUD.read()
				break
			}
			case "POST": {
				const formData = {
					designation: req.body.designation.trim(),
					company: req.body.company.trim(),
					startDate: req.body.startDate,
					endDate: req.body.endDate,
					isPresent: req.body.isPresent,
					description: req.body.description.trim(),
				}
				experience = await experienceCRUD.create(formData)
				break
			}
			
		}
		
		if (!(experience instanceof Error)) {
			successRes(res, experience)
		} else {
			errorRes(res, "Experience not found.", 404)
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
