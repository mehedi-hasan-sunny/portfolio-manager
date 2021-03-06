import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			title: req.body.title.trim(),
			type: req.body.type.trim(),
			rating: req.body.rating
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'skills', formData)
}
