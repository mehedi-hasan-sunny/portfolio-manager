import db from "../config/firebaseAdmin";


export default async function (linkableType, linkableId, links) {
	let result = [], linkDeleteData = [], linkData = [];
	
	links.forEach((item) => {
		if(item) {
			if (!item.url && item.id) {
				linkDeleteData.push(item.id)
			} else if (item.url) {
				linkData.push(item)
			}
		}
		
	})
	
	if (linkDeleteData.length) {
		linkDeleteData.map(async item => {
			return await db.doc(`${linkableType}/${linkableId}/links/${item}`).delete()
		})
		await Promise.all(linkDeleteData)
	}
	
	if (linkData && linkData.length) {
		
		const linkDocRef = db.collection(`${linkableType}/${linkableId}/links`);
		const links = linkData.map(async (item) => {
			const {icon, url} = item;
			let linkDoc;
			if (item.id) {
				linkDoc = linkDocRef.doc(item.id)
				return linkDoc.update({icon, url})
				
			} else {
				linkDoc = linkDocRef.doc()
				return linkDoc.set({icon, url}, {merge: true})
			}
		})
		
		result = await Promise.all(links)
	}
	
	return result
	
}