import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			institution: req.body.institution.trim(),
			department: req.body.department.trim(),
			passingYear: req.body.passingYear
		}
	}
	
	return await GetPostAction(req, res, 'educations', formData)
}
