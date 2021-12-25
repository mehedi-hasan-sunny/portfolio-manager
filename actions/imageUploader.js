import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../firebaseDb/firebaseClient";

const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
});


export default async function (projectId, imageFiles, isThumbnail = false, previousImages = []) {
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
			// await Image.destroy({where: {id: deleteImages}})
		}
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
			
			console.log(imageBulk)
			
			const projectRef = doc(db, 'projects', projectId);
			const imageCollectionRef = collection(projectRef, "images");
			images = imageBulk.map(async (item) => {
				let imageDoc;
				if (item.id) {
					imageDoc = doc(imageCollectionRef, item.id)
				} else {
					imageDoc = doc(imageCollectionRef)
				}
				return setDoc(imageDoc, item, {merge: true})
			})
		}
	}
	
	return await Promise.all(images)
	
}