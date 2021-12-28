import db from "../../firebaseDb/firebaseAdmin";

import {errorRes, successRes} from "!/helpers/jsonResponse";


export default async function handler(req, res) {
	switch (req.method) {
		
		case "GET": {
			try {
				let projects = [], profile = {}
				
				const collectionRef = db.collection("projects");
				const snapshots = await collectionRef.get();
				if (!snapshots.empty) {
					projects = snapshots.docs.map(async project => {
						const linksRef = await db.collection(`projects/${project.id}/links`).get();
						const links = linksRef.docs.map(link => {
							return {id: link.id, ...link.data()}
						})
						
						const imagesRef = await db.collection(`projects/${project.id}/images`).get();
						const images = imagesRef.docs.map(image => {
							return {id: image.id, ...image.data()}
						})
						
						return {id: project.id, ...project.data(), links: links, images: images};
					});
				}
				
				projects = await Promise.all(projects)
				
				
				const profileCollectionRef = db.collection("profile").limit(1);
				const profileSnapshot = await profileCollectionRef.get();
				if (!profileSnapshot.empty) {
					const profileDoc = profileSnapshot.docs[0];
					profile = {id: profileDoc.id, ...profileDoc.data()}
					const linksRef = await db.collection(`profile/${profileDoc.id}/links`).get();
					const links = linksRef.docs.map(link => {
						return {id: link.id, ...link.data()}
					})
					profile.links = await Promise.all(links);
				}
				
				successRes(res, {projects, profile})
				
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
