import db from "../../../../firebaseDb/firebaseAdmin";

import {errorRes, successRes} from "!/helpers/jsonResponse";

export default async function handler(req, res) {
	const {id} = req.query;
	
	switch (req.method) {
		case "GET": {
			try {
				const linkCategoryRef = db.doc("linkCategories/" + id);
				let linkCategory = await linkCategoryRef.get();
				if (linkCategory.exists) {
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
				const linkCategoryRef = db.doc("linkCategories/" + id);
				let linkCategory = await linkCategoryRef.get();
				if (linkCategory.exists) {
					
					const updateData = {
						icon: req.body.icon,
						title: req.body.title
					}
					await linkCategoryRef.update(updateData);
					
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
				const linkCategoryRef = db.doc("linkCategories/" + id);
				let linkCategory = await linkCategoryRef.get();
				if (linkCategory.exists) {
					linkCategory = await linkCategoryRef.delete();
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
