import GetPostAction from "!/helpers/api/GetPostAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			icon: req.body.icon,
			title: req.body.title
		}
	}
	
	return await GetPostAction(req, res, 'linkCategories', formData)
}
