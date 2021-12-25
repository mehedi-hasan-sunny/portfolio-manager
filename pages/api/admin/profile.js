import db from "../../../firebaseDb/firebaseAdmin"

import linksManager from "!/actions/linksManager";
import {errorRes, successRes} from "!/helpers/jsonResponse";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			try {
				const collectionRef = db.collection("profile").limit(1);
				const profileSnapshot = await collectionRef.get();
				if (!profileSnapshot.empty) {
					const profileDoc = profileSnapshot.docs[0];
					const profile = {id: profileDoc.id, ...profileDoc.data()}
					const linksRef = await db.collection(`profile/${profileDoc.id}/links`).get();
					const links = linksRef.docs.map(link => {
						return {id: link.id, ...link.data()}
					})
					
					profile.links = await Promise.all(links);
					
					successRes(res, profile)
					
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
				const collectionRef = db.collection("profile");
				let profile = await collectionRef.add({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					title: req.body.title,
					displayPicture: req.body.displayPicture
				});
				const linksData = req.body.links;
				const links = await linksManager(
						"profile",
						profile.id,
						linksData
				)
				
				successRes(res, {profile: (await profile.get()).data()}, 202)
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "PUT": {
			try {
				
				const profileRef = db.doc("profile/" + req.body.id);
				
				const profileSnap = await profileRef.get();
				if (profileSnap.exists) {
					let profile = await profileRef.set({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						title: req.body.title,
						displayPicture: req.body.displayPicture
					}, {merge: true});
					
					const linksData = req.body.links;
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
