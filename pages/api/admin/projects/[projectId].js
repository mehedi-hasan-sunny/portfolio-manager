import {initializeApp} from "firebase/app";
import {getFirestore, getDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import formidable from "formidable-serverless";

import {errorRes, successRes} from "!/helpers/jsonResponse";

import linksManager from "!/actions/linksManager";
import imageUploader from "!/actions/imageUploader";

export default async function handler(req, res) {
	const {projectId: id} = req.query;
	
	switch (req.method) {
		case "GET": {
			try {
				const project = await Project.findByPk(id);
				if (project) {
					successRes(res, project)
				} else {
					successRes(res, project, 204)
				}
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "PUT": {
			try {
				
				const projectRef = doc(db, "projects", id);
				
				const projectSnap = await getDoc(projectRef);
				
				
				if (projectSnap.exists()) {
					
					const promise = new Promise((resolve, reject) => {
						const form = new formidable.IncomingForm({multiples: true, keepExtensions: true});
						
						form.on('error', reject);
						form.parse(req, (err, fields, files) =>
								err ? reject(err) : resolve({fields, files})
						)
					});
					
					try {
						const {fields, files} = await promise;
						
						let project = await updateDoc(projectRef, {
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
									projectSnap.id, files.thumbnail,
									true,
							);
						}
						
						let images = []
						if (files && files.images) {
							images = await imageUploader(
									projectSnap.id, files.images,
									false
							);
						}
						
						project = await getDoc(projectRef);
						
						successRes(res, {project: {id: project.id, ...project.data()}});
						
						
					} catch (err) {
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
				
				const projectRef = doc(db, "projects", id);
				
				const projectSnap = await getDoc(projectRef);
				
				if (projectSnap.exists()) {
					await deleteDoc(projectRef)
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