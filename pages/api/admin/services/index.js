import GetPostAction from "!/helpers/api/GetPostAction";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '2mb'
		}
	}
}

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			title: req.body.title.trim(),
			description: req.body.description.trim(),
			icon: req.body.icon,
			prevIcon: req.body?.prevIcon
		}
	}
	
	return await GetPostAction(req, res, 'services', formData, ["icon"])
}
