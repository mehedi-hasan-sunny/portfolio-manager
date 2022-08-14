import db from "../../../config/firebaseAdmin"

import linksManager from "!/actions/linksManager";
import {errorRes, successRes} from "!/helpers/jsonResponse";
import {ValidateToken} from "../../../helpers/api/AuthCheck";

export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
		return authCheck
	}
	const reqData = (req) => ({
		firstName: req.body.firstName.trim(),
		lastName: req.body.lastName.trim(),
		email: req.body.email.trim().toLowerCase(),
		phoneCode: '+880',
		phoneNumber: req.body.phoneNumber.replace(/^0+/, '').trim(),
		bioTitle: req.body.bioTitle.trim(),
		bio: req.body.bio.trim(),
		title: req.body.title.trim(),
		liveIn: req.body.liveIn.trim(),
		dob: req.body.dob.trim(),
		experienceInYears: req.body.experienceInYears.trim(),
		cvDownloadLink: req.body.cvDownloadLink.trim(),
		circleText: req.body.circleText.trim(),
		circleTextSize: req.body.circleTextSize.trim(),
		circleTextDegree: req.body.circleTextDegree.trim(),
		circleFontSize: req.body.circleFontSize.trim(),
		// displayPicture: req.body.displayPicture.trim()
	})
	
	
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
					});
					const displayRef = await db.collection(`profile/${profileDoc.id}/displayPicture`).get();
					const displayDoc = displayRef.docs[0] ?? null;
					
					profile.links = await Promise.all(links);
					profile.displayPicture = displayDoc ? {id: displayDoc.id, ...displayDoc.data()} : null;
					
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
				
				const profileSnapshot = await collectionRef.limit(1).get();
				let profile, links
				
				if (profileSnapshot.empty) {
					profile = await collectionRef.add(reqData(req));
					const linksData = req.body.links;
					links = await linksManager(
							"profile",
							profile.id,
							linksData
					)
					
					profile = await profile.get().data()
					successRes(res, {profile: {...profile, links: links}}, 202)
					
				} else {
					const profileRef = db.doc("profile/" + profileSnapshot.docs[0].id);
					profile = await profileRef.set(reqData(req), {merge: true});
					const linksData = req.body.links;
					links = await linksManager(
							"profile",
							profile.id,
							linksData
					)
					successRes(res, {profile: {...profile, links: links}}, 200)
				}
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
