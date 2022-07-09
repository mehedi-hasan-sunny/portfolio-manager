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
		
		const certificationsCRUD = new CRUD('Certifications','certifications');
		let successMessage;
		let certifications = null;
		
		switch (req.method) {
			case "GET": {
				certifications = await certificationsCRUD.read(id)
				break
			}
			case "PUT": {
				const updateData = {
					title: req.body.title.trim(),
					institution: req.body.institution.trim(),
					issueDate: req.body.issueDate,
					expireDate: req.body.expireDate,
					credentialId: req.body.credentialId,
					certificateLink: req.body.certificateLink.trim()
				}
				certifications = await certificationsCRUD.update(id, updateData)
				break
			}
			case "DELETE": {
				successMessage =  await certificationsCRUD.delete(id)
				break
			}
		}
		
		if (successMessage || !(certifications instanceof Error)) {
			successRes(res, successMessage ?? certifications)
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
