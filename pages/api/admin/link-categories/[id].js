import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			icon: req.body.icon,
			title: req.body.title
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'linkCategories', formData)
}
