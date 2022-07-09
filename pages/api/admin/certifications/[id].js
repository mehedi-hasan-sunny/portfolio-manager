import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			title: req.body.title.trim(),
			institution: req.body.institution.trim(),
			issueDate: req.body.issueDate,
			expireDate: req.body.expireDate,
			credentialId: req.body.credentialId,
			certificateLink: req.body.certificateLink.trim()
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'certifications', formData)
}
