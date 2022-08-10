import {empty} from "../helpers/common";

const getProjects = async (db, noTimestamp) => {
	let projectSnapshots = await db.collection("projects").orderBy("createdAt", "desc").get();
	if (projectSnapshots.empty) {
		projectSnapshots = await db.collection("projects").get();
		if(projectSnapshots.empty)
			return []
	}
	const projects = projectSnapshots.docs.map(async project => {
		let linksRef = await db.collection(`projects/${project.id}/links`).orderBy("createdAt", "asc").get();
		if (empty(linksRef.docs)) {
			linksRef = await db.collection(`projects/${project.id}/links`).get();
		}
		const links = linksRef.docs.map(link => {
			let data = link.data();
			data.id = link.id
			/*if(noTimestamp){
				const {createdAt, ...restOfData} = data
				data = restOfData
			}*/
			return data
		})
		
		let imagesRef = await db.collection(`projects/${project.id}/images`).orderBy("timestamp", "asc").get();
		if (empty(imagesRef.docs)) {
			imagesRef = await db.collection(`projects/${project.id}/images`).get();
		}
		const images = imagesRef.docs.map(image => {
			let imageData = image.data();
			imageData.id = image.id
			if (noTimestamp) {
				const {timestamp, ...restOfData} = imageData
				imageData = restOfData
			}
			return imageData
		})
		
		let projectData = project.data();
		projectData.id = project.id
		if (noTimestamp) {
			const {createdAt, ...restOfData} = projectData
			projectData = restOfData
		}
		return {...projectData, links, images};
	});
	
	return await Promise.all(projects)
}
export {getProjects}