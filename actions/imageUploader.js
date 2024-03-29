import db from "../config/firebaseAdmin";
import {firestore} from "firebase-admin";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (cloudinary, projectId, imageFiles, isThumbnail = false, deletableImages = []) {
	let images = []
	
	//filter for deletable images
	if (deletableImages.length) {
		let deleteImages = []
		deleteImages = deletableImages.map(async item => {
			return await db.doc(`projects/${projectId}/images/${item.id}`).delete()
		})
		await Promise.all(deleteImages)
	}
	
	
	if (imageFiles) {
		
		let multiplePicturePromise;
		
		if (imageFiles.length) {
			multiplePicturePromise = [...imageFiles].map((picture) =>
					cloudinary.uploader.upload(picture.path)
			);
		} else if (imageFiles.size) {
			multiplePicturePromise = [cloudinary.uploader.upload(imageFiles.path)]
		}
	
		if (multiplePicturePromise) {
			let imageResponses = await Promise.all(multiplePicturePromise)
			
			let imageBulk = imageResponses.map((item) => {
				return {
					url: item.secure_url,
					isThumbnail: isThumbnail,
				}
			})
			
			
			if (images.length) {
				imageBulk = images.concat(imageBulk)
			}
			
			const imageCollectionRef = db.collection(`projects/${projectId}/images`);
			
			images = imageBulk.map(async (item) => {
				let imageDoc;
				if (item.id) {
					imageDoc = imageCollectionRef.doc(item.id)
				} else {
					imageDoc = imageCollectionRef.doc()
					item = {...item, timestamp: firestore.Timestamp.now()}
				}
				return imageDoc.set(item, {merge: true})
			})
		}
	}
	
	return await Promise.all(images)
	
}