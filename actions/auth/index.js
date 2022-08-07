import {signInWithEmailAndPassword, onAuthStateChanged, token} from "firebase/auth";
import {auth} from "../../firebaseDb/firebaseClient";
import nookies from "nookies";
class Auth {
	constructor() {
		this.authValid = false
	}
	
	async isAuthValid(token) {
		await onAuthStateChanged(auth, async (user) => {
			this.authValid = !!user;
		});
		return this.authValid
	}
	
	adminLogin({email, password}, callback = null) {

		signInWithEmailAndPassword(auth, email, password).then(async ({user}) => {
			// Get the user's ID token as it is needed to exchange for a session cookie.
			if (!user) {
				nookies.set(undefined, 'token', '', {path: '/'});
			} else {
				const token = await user.getIdToken();
				nookies.set(undefined, 'token', token, {path: '/'});
			}
		}).then(() => {
			// A page redirect would suffice as the persistence is set to NONE.
			return auth.signOut();
		}).then(() => {
			if (callback) {
				callback();
			}
			this.authValid = true;
		});
		
	}
}
export const adminLogin = ({email, password}, callback = null) => {
	const auth = new Auth();
	auth.adminLogin({email, password}, callback)
}
export const isAuthValid = async (token) => {
	const auth = new Auth();
	return await auth.isAuthValid(token)
}
export default Auth;