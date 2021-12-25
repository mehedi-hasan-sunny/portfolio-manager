import * as firebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../firebaseDb/shohanur-protfolio-firebase-adminsdk-ppaf1-72e6aba1a3.json');

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey: serviceAccount.private_key,
			clientEmail: serviceAccount.client_email,
			projectId: serviceAccount.project_id,
		}),
	});
}

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
