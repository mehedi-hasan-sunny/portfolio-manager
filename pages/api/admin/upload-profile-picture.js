import db from "../../../firebaseDb/firebaseAdmin"
import {errorRes, successRes} from "!/helpers/jsonResponse";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '5mb'
		}
	}
}

export default async function handler(req, res) {
	
	switch (req.method) {
		case "POST": {
			console.log(req.body, "body")
			try {
				const updates = {
					displayPicture: null,
					originalImage: null,
					displayPicturePositions: req.body.positions
				};
				
				let uploadImages = [req.body.originalImage, req.body.displayPicture].map(item => cloudinary.uploader.upload(item))
				let images = await Promise.all(uploadImages)
				updates.displayPicture = images[0].url;
				updates.originalImage = images[1].url;
				
				const profileDisplayDocRef = db.collection(`profile/${req.body.profileId}/displayPicture${req.body.id ? ('/' + req.body.id) : ''}`);
				let collection = await profileDisplayDocRef.get()
				let result;
				if(collection.exists){
					result = await profileDisplayDocRef.update(updates)
					collection = await result.get()
					collection = collection.docs[0]
				}
				else{
					result = await profileDisplayDocRef.add(updates)
					collection = await result.get()
				}
				
				successRes(res, {id: collection.id, ...collection.data()}, 202)
				
			} catch (err) {
				console.log(err)
				errorRes(res, err.message)
			}
			break
		}
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}
