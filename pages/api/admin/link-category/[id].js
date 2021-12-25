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

import {errorRes, successRes} from "!/helpers/jsonResponse";
export default async function handler(req, res) {
	const {id} = req.query;
	
	switch (req.method) {
		case "GET": {
			try {
				const linkCategoryRef = doc(db, "linkCategories", id);
				let linkCategory = await getDoc(linkCategoryRef);
				if (linkCategory.exists()) {
					linkCategory = {id: linkCategory.id, ...linkCategory.data()}
					successRes(res, linkCategory)
				} else {
					errorRes(res, "Link Category not found.", 404)
				}
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "PUT": {
			try {
				const linkCategoryRef = doc(db, "linkCategories", id);
				let linkCategory = await getDoc(linkCategoryRef);
				if (linkCategory.exists()) {
					
					const updateData = {
						icon: req.body.icon,
						title: req.body.title
					}
					await updateDoc(linkCategoryRef, updateData);
					
					linkCategory = {id: linkCategory.id, ...updateData}
					successRes(res, {linkCategory})
				} else {
					errorRes(res, "Link Category not found.", 404)
				}
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "DELETE": {
			console.log(id)
			try {
				const linkCategoryRef = doc(db, "linkCategories", id);
				let linkCategory = await getDoc(linkCategoryRef);
				if (linkCategory.exists()) {
					linkCategory = await deleteDoc(linkCategoryRef);
					successRes(res, "Deleted successfully!")
				} else {
					errorRes(res, "Link Category not found.", 404)
				}
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}
