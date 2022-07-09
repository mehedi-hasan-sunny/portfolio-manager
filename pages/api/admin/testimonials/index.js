import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			name: req.body.name.trim(),
			designation: req.body.designation.trim(),
			feedback: req.body.feedback.trim()
		}
	}
	return await GetPostAction(req, res, 'testimonials', formData)
}
