import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			designation: req.body.designation.trim(),
			company: req.body.company.trim(),
			startDate: req.body.startDate,
			endDate: req.body.endDate ?? null,
			description: req.body.description.trim()
		}
	}
	
	return await GetPostAction(req, res, 'experiences', formData, [], 'startDate')
}
