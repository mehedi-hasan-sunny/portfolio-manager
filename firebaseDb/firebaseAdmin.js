import * as firebaseAdmin from 'firebase-admin';

const serviceAccount = require('./shohanur-protfolio-firebase-adminsdk-ppaf1-72e6aba1a3.json');

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey: serviceAccount.private_key,
			clientEmail: serviceAccount.client_email,
			projectId: serviceAccount.project_id,
		}),
	});
}

export { firebaseAdmin };