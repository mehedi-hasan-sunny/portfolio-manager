
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
		
		const certificationsCRUD = new CRUD('Certifications','certifications');
		let certifications = null;
		
		switch (req.method) {
			case "GET": {
				certifications = await certificationsCRUD.read()
				break
			}
			case "POST": {
				const formData = {
					title: req.body.title.trim(),
					institution: req.body.institution.trim(),
					issueDate: req.body.issueDate,
					expireDate: req.body.expireDate,
					credentialId: req.body.credentialId,
					certificateLink: req.body.certificateLink.trim()
				}
				certifications = await certificationsCRUD.create(formData)
				break
			}
			
		}
		
		if (!(certifications instanceof Error)) {
			successRes(res, certifications)
		} else {
			errorRes(res, "Certifications not found.", 404)
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
