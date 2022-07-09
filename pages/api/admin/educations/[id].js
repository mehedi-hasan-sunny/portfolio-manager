import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			institution: req.body.institution.trim(),
			department: req.body.department.trim(),
			passingYear: req.body.passingYear
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'educations', formData)
}
