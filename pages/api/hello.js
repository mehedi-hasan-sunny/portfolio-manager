import db from "../../firebaseDb/firebaseAdmin";
import {successRes} from "../../helpers/jsonResponse";

export default async function handler(req, res) {
	const collectionRef = db.collection("projects");
	const snapshots = await collectionRef.get();
	if (!snapshots.empty) {
		const projects = snapshots.docs.map(async project => {
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
		
		successRes(res, await Promise.all(projects))
	} else {
		successRes(res, [])
	}
}
