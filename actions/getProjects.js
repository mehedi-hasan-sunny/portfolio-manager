const getProjects = async (db, noTimestamp) => {
	const collectionRef = db.collection("projects");
	const snapshots = await collectionRef.get();
	if (snapshots.empty) {
		return []
	}
	const projects = snapshots.docs.map(async project => {
		const linksRef = await db.collection(`projects/${project.id}/links`).orderBy("createdAt", "desc").get();
		const links = linksRef.docs.map(link => {
			let data =  link.data();
			data.id = link.id
			/*if(noTimestamp){
				const {createdAt, ...restOfData} = data
				data = restOfData
			}*/
			return data
		})
		
		const imagesRef = await db.collection(`projects/${project.id}/images`).orderBy("timestamp", "desc").get();
		const images = imagesRef.docs.map(image => {
			let imageData =  image.data();
			imageData.id = image.id
			if(noTimestamp){
				const {timestamp, ...restOfData} = imageData
				imageData = restOfData
			}
			return imageData
		})
		
		let projectData =  project.data();
		projectData.id = project.id
		if(noTimestamp){
			const {createdAt, ...restOfData} = projectData
			projectData = restOfData
		}
		return {...projectData, links, images};
	});
	
	return await Promise.all(projects)
}
export {getProjects}