import GetPostAction from "!/helpers/api/GetPostAction";
import {firestore} from "firebase-admin";


export const config = {
	api: {
		bodyParser: {
			sizeLimit: '15mb'
		}
	}
}

export default async function handler(req, res) {
	let formData;
	if ((req.method === "POST")) {
		formData = {
			title: req.body.title.trim(),
			subtitle: req.body.subtitle.trim(),
			publishedAt: firestore.FieldValue.serverTimestamp(),
			coverImage: req.body.coverImage,
			content: req.body.content,
			summary: req.body.summary,
			tags: req.body.tags,
		}
	}
	
	return await GetPostAction(req, res, 'blogs', formData, ["coverImage"])
}
