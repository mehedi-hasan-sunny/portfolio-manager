import db from "../firebaseDb/firebaseAdmin";

export default class CRUD {
	constructor(moduleName, collectionName) {
		this.collectionName = collectionName
		this.moduleName = moduleName
	}
	
	async create(formData) {
		const collectionRef = db.collection(this.collectionName);
		let collection = await collectionRef.add(formData);
		collection = await collection.get();
		if (collection.exists) {
			collection = {[this.collectionName]: {id: collection.id, ...collection.data()}}
		} else {
			collection = new Error(`${this.moduleName} not created!`)
		}
		return collection;
	}
	
	async read(id = null) {
		const collectionRef = db[!id ? 'collection' : 'doc'](this.collectionName + (id ? `/${id}` : ''));
		let collection = await collectionRef.get();
		
		if (!collection.empty && !id) {
			collection = collection.docs.map(async collection => {
				return {id: collection.id, ...collection.data()};
			});
			collection = await Promise.all(collection)
		} else if (collection.exists && id) {
			collection = {id: collection.id, ...collection.data()}
		} else {
			collection = new Error(`${this.moduleName} not found`)
		}
		return collection;
	}
	
	async update(id, formData) {
		const collectionRef = db.doc(this.collectionName + `/${id}`);
		let collection = await collectionRef.get();
		
		if (collection.exists) {
			await collectionRef.update(formData);
			collection = {[this.collectionName]: {id: collection.id, ...collection.data()}}
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