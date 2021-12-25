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

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			try {
				// successRes(res, [])
				
				const linkCategoriesCollectionRef = collection(db, "linkCategories");
				const linkCategoriesSnap = await getDocs(linkCategoriesCollectionRef);
				if (!linkCategoriesSnap.empty) {
					const linkCategories = linkCategoriesSnap.docs.map(async linkCategory => {
						return {id: linkCategory.id, ...linkCategory.data()};
					});
					successRes(res, await Promise.all(linkCategories))
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
				const linkCategoriesCollectionRef = collection(db, "linkCategories");
				let linkCategory = await addDoc(linkCategoriesCollectionRef, {
					title: req.body.title,
					icon: req.body.icon
				});
				linkCategory = await getDoc(linkCategory)
				if (linkCategory.exists()) {
					successRes(res, {linkCategory: {id: linkCategory.id, ...linkCategory.data()}})
				} else {
					successRes(res, null)
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
