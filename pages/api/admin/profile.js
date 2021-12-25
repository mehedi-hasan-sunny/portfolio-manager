import linksManager from "!/actions/linksManager";
import {errorRes, successRes} from "!/helpers/jsonResponse";

const {addDoc, collection, getDoc, query, limit, doc, setDoc, getDocs} = require("firebase/firestore");
const {db} = require("../../../firebase/firebaseClient");

export default async function handler(req, res) {
	switch (req.method) {
		case "GET": {
			try {
				const collectionRef = collection(db, "profile");
				
				const profileSnapshot = await getDocs(query(collectionRef, limit(1)));
				
				if (!profileSnapshot.empty) {
					const profileDoc = profileSnapshot.docs[0];
					const profile = {id: profileDoc.id, ...profileDoc.data()}
					const linksRef = await getDocs(collection(db, 'profile', profileDoc.id, 'links'));
					
					const links = linksRef.docs.map(link => {
						return {id: link.id, ...link.data()}
					})
					
					profile.links = await Promise.all(links);
					
					successRes(res, profile)
				} else {
					successRes(res, null)
				}
				
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "POST": {
			try {
				const collectionRef = collection(db, "profile");
				let profile = await addDoc(collectionRef, {
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
				
				successRes(res, {profile: (await getDoc(profile)).data()}, 202)
				
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		case "PUT": {
			try {
				const profileRef = doc(db, "profile", req.body.id);
				const profileSnap = await getDoc(profileRef);
				if (profileSnap.exists()) {
					let profile = await setDoc(profileRef, {
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
