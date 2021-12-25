import {firebaseAdmin} from "!/firebaseDb/firebaseAdmin"

export default async function handler(req, res) {
	
	const results = await firebaseAdmin.firestore().collection('projects').get();
	const resultSnap = results.docs.map((item=> {
		return {
			id: item.id,
			...item.data()
		}
	}))
	
	
	if (results.empty) {
		console.log('No such document!');
		res.status(200).json("No such document!")
	} else {
		res.status(200).json(resultSnap)
	}
}
