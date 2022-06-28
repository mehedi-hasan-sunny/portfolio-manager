import db from "../../../firebaseDb/firebaseAdmin"

import linksManager from "!/actions/linksManager";
import {errorRes, successRes} from "!/helpers/jsonResponse";

export default async function handler(req, res) {
	
	switch (req.method) {
		case "POST": {
			try {
				const collectionRef = db.collection("profile");
				let profile = await collectionRef.add(reqData(req));
				const linksData = req.body.links;
				const links = await linksManager(
						"profile",
						profile.id,
						linksData
				)
				
				successRes(res, {profile: (await profile.get()).data()}, 202)
				
			} catch (err) {
				console.log(err)
				errorRes(res, err.message)
			}
			break
		}
		case "PUT": {
			try {
				
				const profileRef = db.doc("profile/" + req.body.id);
				
				const profileSnap = await profileRef.get();
				if (profileSnap.exists) {
					let profile = await profileRef.set(reqData(req), {merge: true});
					
					const linksData = req.body.links;
					
					console.log(linksData)
					const links = await linksManager(
							"profile",
							profileSnap.id,
							linksData
					)
					
					successRes(res, {profile: {...profile, links: links}})
					
				} else {
					errorRes(res, "Profile not created!", 404)
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
