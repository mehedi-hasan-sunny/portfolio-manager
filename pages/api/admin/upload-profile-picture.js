import db from "../../../config/firebaseAdmin"
import {errorRes, successRes} from "!/helpers/jsonResponse";
import {ValidateToken} from "../../../helpers/api/AuthCheck";
import cloudinary from "../../../config/cloudinary";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '5mb'
		}
	}
}

export default async function handler(req, res) {
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
		return authCheck
	}
	switch (req.method) {
		case "POST": {
			try {
				const updates = {
					displayPicture: null,
					originalImage: null,
					displayPicturePositions: req.body.positions
				};
				
				let uploadImagesArr = [req.body.displayPicture];
				
				if(!req.body?.hasOriginalImage){
					uploadImagesArr.push(req.body.originalImage)
				}
				
				let uploadImages = uploadImagesArr.map(item => cloudinary.uploader.upload(item))
				let images = await Promise.all(uploadImages)
				updates.displayPicture = images[0]?.secure_url ?? null;
				
				if(!req.body?.hasOriginalImage){
					updates.originalImage = images[1]?.secure_url ?? null;
				}
				else{
					delete updates.originalImage;
				}
				
				let result, collection;
				if(req.body?.id){
					const profileDisplayDocRef = db.doc(`profile/${req.body.profileId}/displayPicture${req.body.id ? ('/' + req.body.id) : ''}`)
					result = await profileDisplayDocRef.set(updates, {merge: true})
					collection = await profileDisplayDocRef.get()
				}
				else{
					const profileDisplayDocRef = db.collection(`profile/${req.body.profileId}/displayPicture`);
					result = await profileDisplayDocRef.add(updates)
					collection = await profileDisplayDocRef.get()
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
