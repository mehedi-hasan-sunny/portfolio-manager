import db from "../../../../config/firebaseAdmin";
import {firestore} from "firebase-admin";
import cloudinary from "../../../../config/cloudinary";

import {errorRes, successRes} from "!/helpers/jsonResponse";

import imageUploader from "!/actions/imageUploader";
import linksManager from "!/actions/linksManager";
import {getProjects} from "../../../../actions/getProjects";
import {ValidateToken} from "../../../../helpers/api/AuthCheck";

const formidable = require('formidable-serverless');


export const config = {
	api: {
		bodyParser: false
	}
}

export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
		return authCheck
	}
	switch (req.method) {
		
		case "GET": {
			try {
				const result = await getProjects(db);
				successRes(res, result)
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		
		
		case "POST": {
			try {
				const form = new formidable.IncomingForm({multiples: true, keepExtensions: true});
				
				await form.parse(req, async (err, fields, files) => {
					
					if (err) {
						return errorRes(res, err)
					}
					req.body = fields
					req.files = files
					try {
						// console.log(req.body)
						const collectionRef = db.collection("projects");
						
						let project = await collectionRef.add({
							title: req.body.title,
							description: req.body.description,
							startDate: req.body.startDate ? req.body.startDate : null,
							endDate: req.body.endDate ? req.body.endDate : null,
							createdAt: firestore.FieldValue.serverTimestamp()
						});
						
						
						const linksData = JSON.parse(req.body.links);
						
						const links = await linksManager(
								"projects",
								project.id,
								linksData
						)
						
						if (files && files.thumbnail) {
							await imageUploader(cloudinary,
									project.id, files.thumbnail,
									true,
							);
						}
						
						if (files && files.images) {
							await imageUploader(cloudinary,
									project.id, files.images,
									false
							);
						}
						
						successRes(res, {project: (await project.get()).data()});
						
					} catch (err) {
						errorRes(res, err.message)
					}
					
				});
				
			} catch (err) {
				console.error(err)
				errorRes(res, err.message)
			}
			break
		}
		
		
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}
