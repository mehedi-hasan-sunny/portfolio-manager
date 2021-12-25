import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, getDoc} from "firebase/firestore";
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

import {errorRes, successRes} from "!/helpers/jsonResponse";
import imageUploader from "!/actions/imageUploader";
import linksManager from "!/actions/linksManager";

const formidable = require('formidable-serverless');


export const config = {
	api: {
		bodyParser: false
	}
}

export default async function handler(req, res) {
	switch (req.method) {
		
		case "GET": {
			try {
				const collectionRef = collection(db, "projects");
				const snapshots = await getDocs(collectionRef);
				if (!snapshots.empty) {
					const projects = snapshots.docs.map(async project => {
						const linksRef = await getDocs(collection(db, 'projects', project.id, 'links'));
						const links = linksRef.docs.map(link => {
							return {id: link.id, ...link.data()}
						})
						
						
						const imagesRef = await getDocs(collection(db, 'projects', project.id, 'images'));
						const images = imagesRef.docs.map(image => {
							return {id: image.id, ...image.data()}
						})
						
						return {id: project.id, ...project.data(), links: links, images: images};
					});
					
					successRes(res, await Promise.all(projects))
				} else {
					successRes(res, [])
				}
				
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
						
						const collectionRef = collection(db, "projects");
						
						let project = await addDoc(collectionRef, {
							title: req.body.title,
							description: req.body.description,
							startDate: req.body.startDate ? req.body.startDate : null,
							endDate: req.body.endDate ? req.body.endDate : null,
							thumbnail: null,
							// createdAt: serverTimestamp()
						});
						
						
						const linksData = JSON.parse(req.body.links);
						
						const links = await linksManager(
								"projects",
								project.id,
								linksData
						)
						
						
						let thumbnail = null
						if (files && files.thumbnail) {
							thumbnail = await imageUploader(
									project.id, files.thumbnail,
									true,
							);
						}
						
						let images = []
						if (files && files.images) {
							images = await imageUploader(
									project.id, files.images,
									false
							);
						}
						
						successRes(res, {project: (await getDoc(project)).data()});
						
					} catch (err) {
						console.log(err)
						errorRes(res, err.message)
					}
					
				});
				
			} catch (err) {
				console.log(err)
				errorRes(res, err.message)
			}
			break
		}
		
		
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}
