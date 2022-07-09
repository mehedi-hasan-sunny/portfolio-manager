import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			title: req.body.title.trim(),
			institution: req.body.institution.trim(),
			issueDate: req.body.issueDate,
			expireDate: req.body.expireDate,
			credentialId: req.body.credentialId,
			certificateLink: req.body.certificateLink.trim()
		}
	}
	
	return await GetPostAction(req, res, 'certifications', formData)
}
