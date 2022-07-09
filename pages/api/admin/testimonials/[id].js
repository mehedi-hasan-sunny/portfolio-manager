import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			name: req.body.name.trim(),
			designation: req.body.designation.trim(),
			feedback: req.body.feedback.trim()
		}
	}
	return await EditDeleteGetByIdAction(req, res, 'testimonials', formData)
}
