import {errorRes, successRes} from "../jsonResponse";
import MethodNotAllowedException from "../CustomError";
import CRUD from "../CRUD";
import {empty} from "../common";
import {v2 as cloudinary} from "cloudinary";
import {ValidateToken} from "./AuthCheck";


const GetPostAction = async (req, res, collectionName, formData, formFileKeys=[]) => {
	
	const authCheck = await ValidateToken({req, res});
	if(authCheck !== true){
		return authCheck
	}
	
	const checkMethod = () => {
		if (!['GET', 'POST'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const collectionCRUD = new CRUD(collectionName,collectionName);
		let collection = null;
		
		switch (req.method) {
			case "GET": {
				collection = await collectionCRUD.read()
				break
			}
			case "POST": {
				
				let uploadImages = {}
				if (!empty(formFileKeys)) {
					cloudinary.config({
						cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
						api_key: process.env.CLOUDINARY_API_KEY,
						api_secret: process.env.CLOUDINARY_API_SECRET,
						secure: true
					});
					uploadImages = formFileKeys.map((key) => {
						if (Array.isArray(req.body[key])) {
							return req.body[key].map((item) => cloudinary.uploader.upload(item))
						}
						return cloudinary.uploader.upload(req.body[key])
					})
					uploadImages = await Promise.all(uploadImages)
					uploadImages = uploadImages.reduce((acc, item, index) => {
						if (Array.isArray(item)) {
							acc[formFileKeys[index]] = item.map((innerItem) => innerItem.url)
						} else {
							acc[formFileKeys[index]] = item.url
						}
					}, {})
				}
				
				collection = await collectionCRUD.create({...formData, ...uploadImages})
				break
			}
			
		}
		
		if (!(collection instanceof Error)) {
			successRes(res, collection)
		} else {
			errorRes(res, `${collectionName} not found.`, 404)
		}
		
	} catch (err) {
		console.log(err)
		if (err instanceof MethodNotAllowedException) {
			errorRes(res, err.message, 405)
		} else {
			errorRes(res, err.message)
		}
		
	}
	
}

export default GetPostAction;
