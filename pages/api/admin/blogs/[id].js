import EditDeleteGetByIdAction from "!/helpers/api/EditDeleteGetByIdAction";
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
	if ((req.method === "PUT")) {
		formData = {
			title: req.body.title.trim(),
			subtitle: req.body.subtitle.trim(),
			publishedAt: firestore.FieldValue.serverTimestamp(),
			coverImage: req.body.coverImage,
			content: req.body.content,
			summary: req.body.summary,
			tags: req.body.tags,
			prevCoverImage: !req.body.coverImage ? req.body.prevCoverImage : null,
		}
	}
	
	return await EditDeleteGetByIdAction(req, res, 'blogs', formData, ["coverImage"])
}
