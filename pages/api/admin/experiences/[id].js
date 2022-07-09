import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			designation: req.body.designation.trim(),
			company: req.body.company.trim(),
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			isPresent: req.body.isPresent,
			description: req.body.description.trim()
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'experiences', formData)
}
