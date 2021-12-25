import db from "firebase/firebaseAdmin"

export default async function handler(req, res) {
	
	const results = await db.collection('projects').get();
	
	if (!results.exists) {
		console.log('No such document!');
	} else {
		res.status(200).json(results.data())
	}
}
