import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";

import {errorRes, successRes} from "!/helpers/jsonResponse";
import {db} from "!/firebaseDb/firebaseClient";

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
					successRes(res, linkCategory)
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
