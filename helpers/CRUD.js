import db from "../config/firebaseAdmin";
import {firestore} from "firebase-admin";

export default class CRUD {
	constructor(moduleName, collectionName) {
		this.collectionName = collectionName
		this.moduleName = moduleName
		this.order_by = 'createdAt'
		this.order_by_type = 'asc'
	}
	
	async create(formData) {
		const collectionRef = db.collection(this.collectionName);
		formData.createdAt = firestore.FieldValue.serverTimestamp();
		let collection = await collectionRef.add(formData);
		collection = await collection.get();
		if (collection.exists) {
			collection = {[this.collectionName]: {id: collection.id, ...collection.data()}}
		} else {
			collection = new Error(`${this.moduleName} not created!`)
		}
		return collection;
	}
	
	orderBy(col, type){
		this.order_by = col;
		this.order_by_type = type;
		return this;
	}
	
	async read(id = null) {
		let collectionRef = db[!id ? 'collection' : 'doc'](this.collectionName + (id ? `/${id}` : ''));
		let collection;
		if (!id) {
			collection = await collectionRef.orderBy(this.order_by, this.order_by_type).get();
			if (collection.empty) {
				collection = await collectionRef.get();
				const batch = db.batch();
				collection.forEach((collectionItem) => {
					batch.update(db.collection(this.collectionName).doc(collectionItem.id), {createdAt: firestore.FieldValue.serverTimestamp()})
				});
				batch.commit();
			}
		} else {
			collection = await collectionRef.get();
		}
		
		if (!collection.empty && !id) {
			collection = collection.docs.map(async collection => {
				const {createdAt = null, ...data} = collection.data();
				return {id: collection.id, ...data};
			});
			collection = await Promise.all(collection)
		} else if (collection.exists && id) {
			const {createdAt = null, ...data} = collection.data();
			collection = {id: collection.id, ...data}
		} else {
			collection = new Error(`${this.moduleName} not found`)
		}
		return collection;
	}
	
	async update(id, formData) {
		const collectionRef = db.doc(this.collectionName + `/${id}`);
		let collection = await collectionRef.get();
		
		if (collection.exists) {
			if (!collection.createdAt) {
				formData.createdAt = firestore.FieldValue.serverTimestamp();
			}
			await collectionRef.set(formData, {merge: true});
			collection = {[this.collectionName]: {id: collection.id, ...formData}}
		} else {
			collection = new Error(`${this.moduleName} not found`)
		}
		return collection;
	}
	
	
	async delete(id) {
		const collectionRef = db.doc(this.collectionName + `/${id}`);
		let collection = await collectionRef.get();
		
		if (collection.exists) {
			await collectionRef.delete();
			collection = "Deleted successfully!"
		} else {
			collection = new Error(`${this.moduleName} not found`)
		}
		return collection;
	}
	
	
}