import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			title: req.body.title.trim(),
			type: req.body.type.trim(),
			rating: req.body.rating
		}
	}
	
	return await GetPostAction(req, res, 'skills', formData)
}
