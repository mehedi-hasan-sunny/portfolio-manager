import {errorRes, successRes} from "../jsonResponse";
import MethodNotAllowedException from "../CustomError";
import CRUD from "../CRUD";
import {empty, ucFirst} from "../common";
import {v2 as cloudinary} from "cloudinary";


const EditDeleteGetByIdAction = async (req, res, collectionName, formData, formFileKeys = []) => {
	
	const checkMethod = () => {
		if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
			throw new MethodNotAllowedException(`Method '${req.method}' Not Allowed`)
		}
	}
	try {
		checkMethod();
		
		const {id} = req.query;
		
		const collectionCRUD = new CRUD(ucFirst(collectionName), collectionName);
		let successMessage;
		let collection = null;
		
		switch (req.method) {
			case "GET": {
				collection = await collectionCRUD.read(id)
				break
			}
			case "PUT": {
				
				let uploadImages = {}
				
				if (!empty(formFileKeys) && formData?.icon) {
					if(empty(formData?.icon)){
						uploadImages.icon = formData.prevIcon;
						delete formData.prevIcon;
					}
					else{
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
					delete formData.prevIcon;
				}
				
				collection = await collectionCRUD.update(id, {...formData, ...uploadImages})
				break
			}
			case "DELETE": {
				successMessage = await collectionCRUD.delete(id)
				break
			}
		}
		
		if (successMessage || !(collection instanceof Error)) {
			successRes(res, successMessage ?? collection)
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

export default EditDeleteGetByIdAction;
