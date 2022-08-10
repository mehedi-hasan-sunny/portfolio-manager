import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY,
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
		}),
	});
}

const db = firebaseAdmin.firestore();

export const auth = firebaseAdmin.auth();

export default db;