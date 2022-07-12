import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '2mb'
		}
	}
}

export default async function handler(req, res) {
	let formData;
	if ((req.method === "PUT")) {
		formData = {
			title: req.body.title.trim(),
			description: req.body.description.trim(),
			icon: req.body.icon,
			prevIcon: req.body?.prevIcon,
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'services', formData, ["icon"])
}
