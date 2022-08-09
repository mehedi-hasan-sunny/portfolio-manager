import db from "../../../../firebaseDb/firebaseAdmin";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
});


import formidable from "formidable-serverless";

import {errorRes, successRes} from "!/helpers/jsonResponse";

import linksManager from "!/actions/linksManager";
import imageUploader from "!/actions/imageUploader";
import {ValidateToken} from "../../../../helpers/api/AuthCheck";

export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
		return authCheck
	}
	const {projectId: id} = req.query;
	
	switch (req.method) {
		case "PUT": {
			try {
				
				const projectRef = db.doc("projects/" + id);
				
				const projectSnap = await projectRef.get();
				
				if (projectSnap.exists) {
					const promise = new Promise((resolve, reject) => {
						const form = new formidable.IncomingForm({multiples: true, keepExtensions: true});
						form.on('error', reject);
						form.parse(req, (err, fields, files) =>
								err ? reject(err) : resolve({fields, files})
						)
					});
					
					try {
						const {fields, files} = await promise;
						
						let project = await projectRef.update({
							title: fields.title,
							description: fields.description,
							startDate: fields.startDate ? fields.startDate : null,
							endDate: fields.endDate ? fields.endDate : null,
						});
						
						const linksData = JSON.parse(fields.links);
						
						await linksManager(
								"projects",
								projectSnap.id,
								linksData
						)
						
						let thumbnail = null
						if (files && files.thumbnail) {
							thumbnail = await imageUploader(
									cloudinary,
									projectSnap.id, files.thumbnail,
									true
							);
						}
						
						let images = []
						if (files && files.images) {
							images = await imageUploader(
									cloudinary,
									projectSnap.id, files.images,
									false,
									JSON.parse(fields?.deletableImages)
							);
						}
						
						project = await projectRef.get();
						
						successRes(res, {project: {id: project.id, ...project.data()}});
						
						
					} catch (err) {
						console.log(err)
						errorRes(res, err.message, 500)
					}
					
				} else {
					errorRes(res, "project not found!", 404)
				}
				
				
			} catch (err) {
				console.log(err)
				errorRes(res, err.message)
			}
			break
		}
		case "DELETE": {
			try {
				
				const projectRef = db.doc("projects/" + id);
				
				const projectSnap = await projectRef.get();
				
				if (projectSnap.exists) {
					await projectRef.delete()
					successRes(res, "Project deleted successfully!")
				} else {
					errorRes(res, "Project not found.", 404)
				}
				
			} catch (err) {
				errorRes(res, err.message)
			}
			res.status(200).json({name: 'John Doe'})
			break
		}
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};