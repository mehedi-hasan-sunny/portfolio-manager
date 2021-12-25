import db from "../firebaseDb/firebaseAdmin";

export default async function (cloudinary, projectId, imageFiles, isThumbnail = false, previousImages = []) {
	let images = []
	
	//filter for deletable images
	if (!isThumbnail && previousImages.length) {
		let deleteImages = []
		
		images = previousImages.filter((item) => {
			if (!item.url && item.id) {
				//collect deletable image ids
				deleteImages.push(item.id)
			} else {
				return item
			}
		});
		
		if (deleteImages.length) {
			
			deleteImages.map(async item => {
				return await db.doc(`projects/${projectId}/images/${item}`).delete()
			})
			await Promise.all(deleteImages)
			// await Image.destroy({where: {id: deleteImages}})
		}
	}
	
	
	if (imageFiles) {
		
		let multiplePicturePromise;
		
		if (imageFiles.length) {
			multiplePicturePromise = [...imageFiles].map((picture) =>
					cloudinary.v2.uploader.upload(picture.path)
			);
		} else if (imageFiles.size) {
			multiplePicturePromise = [cloudinary.v2.uploader.upload(imageFiles.path)]
		}
		
		if (multiplePicturePromise) {
			let imageResponses = await Promise.all(multiplePicturePromise)
			
			let imageBulk = imageResponses.map((item) => {
				return {
					url: item.url,
					isThumbnail: isThumbnail,
				}
			})
			
			
			if (images.length) {
				imageBulk = images.concat(imageBulk)
			}
			
			if (isThumbnail && previousImages.id) {
				imageBulk[0].id = previousImages.id
			}
			
			const imageCollectionRef = db.collection(`projects/${projectId}/images`);
			
			images = imageBulk.map(async (item) => {
				let imageDoc;
				if (item.id) {
					imageDoc = imageCollectionRef.doc(item.id)
				} else {
					imageDoc = imageCollectionRef.doc()
				}
				return imageDoc.set(item, {merge: true})
			})
		}
	}
	
	return await Promise.all(images)
	
}