import {addDoc, collection, getDoc, getDocs} from "firebase/firestore";
import {errorRes, successRes} from "!/helpers/jsonResponse";
import {db} from "!/firebaseDb/firebaseClient";

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
