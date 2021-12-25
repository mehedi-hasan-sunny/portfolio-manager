import {collection, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../firebaseDb/firebaseClient";


export default async function (linkableType, linkableId, links) {
	let result = [], linkDeleteData = [], linkData = [];
	
	links.forEach((item) => {
		if (!item.url && item.id) {
			linkDeleteData.push(item.id)
		} else if (item.url) {
			linkData.push(item)
		}
	})
	
	if (linkDeleteData.length) {
		linkDeleteData.map(async item => {
			return await deleteDoc(doc(db, linkableType, linkableId, "links", item))
		})
		await Promise.all(linkDeleteData)
	}
	
	if (linkData && linkData.length) {
		const projectRef = doc(db, linkableType, linkableId);
		const linkDocRef = collection(projectRef, "links");
		const links = linkData.map(async (item) => {
			const {icon, url} = item;
			let linkDoc;
			if (item.id) {
				linkDoc = doc(linkDocRef, item.id)
				return updateDoc(linkDoc, {icon, url})
				
			} else {
				linkDoc = doc(linkDocRef)
				return setDoc(linkDoc, {icon, url}, {merge: true})
			}
		})
		
		console.log(links)
		
		result = await Promise.all(links)
	}
	
	return result
	
}