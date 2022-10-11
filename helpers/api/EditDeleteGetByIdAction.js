import {errorRes, successRes} from "../jsonResponse";
import MethodNotAllowedException from "../CustomError";
import CRUD from "../CRUD";
import {empty, ucFirst} from "../common";
import cloudinary from "../../config/cloudinary";


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
				
				if (!empty(formFileKeys)) {
					
					formFileKeys.forEach((key) => {
						if (empty(formData[`prev${ucFirst(key)}`])) {
							if (Array.isArray(formData[key])) {
								uploadImages[key] = formData[key].map((item) => cloudinary.uploader.upload(item));
							} else {
								uploadImages[key] = cloudinary.uploader.upload(formData[key]);
							}
						} else {
							uploadImages[key] = formData[`prev${ucFirst(key)}`]
						}
						delete formData[`prev${ucFirst(key)}`];
						delete formData[key];
					});
					
					uploadImages = Object.keys(uploadImages).reduce(async (accumulator, uploadImageKey) => {
						if (uploadImages[uploadImageKey] instanceof Array) {
							accumulator[uploadImageKey] = await Promise.all(uploadImages[uploadImageKey]);
							accumulator[uploadImageKey] = accumulator[uploadImageKey].reduce((acc, item, index) => {
								if (Array.isArray(item)) {
									acc[formFileKeys[index]] = item.map((innerItem) => innerItem.secure_url)
								} else {
									acc[formFileKeys[index]] = item.secure_url
								}
								return acc
							}, {});
						} else if (typeof uploadImages[uploadImageKey] === 'object' && typeof uploadImages[uploadImageKey].then === 'function') {
							accumulator[uploadImageKey] = await Promise.resolve(uploadImages[uploadImageKey]);
							accumulator[uploadImageKey] = accumulator[uploadImageKey].secure_url;
						} else {
							accumulator[uploadImageKey] = await uploadImages[uploadImageKey];
						}
						return accumulator;
					}, {});
				}
				uploadImages =  await Promise.resolve(uploadImages);
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
		console.error(err)
		if (err instanceof MethodNotAllowedException) {
			errorRes(res, err.message, 405)
		} else {
			errorRes(res, err.message)
		}
		
	}
	
}

export default EditDeleteGetByIdAction;
