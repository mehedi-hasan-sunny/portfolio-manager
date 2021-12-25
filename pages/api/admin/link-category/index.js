import db from "../../../../firebaseDb/firebaseAdmin";

import {errorRes, successRes} from "!/helpers/jsonResponse";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			try {
				// successRes(res, [])
				
				const linkCategoriesCollectionRef = db.collection("linkCategories");
				const linkCategoriesSnap = await linkCategoriesCollectionRef.get();
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
				const linkCategoriesCollectionRef = db.collection("linkCategories");
				let linkCategory = await linkCategoriesCollectionRef.add({
					title: req.body.title,
					icon: req.body.icon
				});
				linkCategory = await linkCategory.get()
				if (linkCategory.exists) {
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
