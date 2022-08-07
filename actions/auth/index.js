import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebaseDb/firebaseClient";
import nookies from "nookies";
class Auth {
	constructor() {
		this.authValid = false
	}
	
	isAuthValid(token) {
		onAuthStateChanged(auth, (user) => {
			this.authValid = !!user;
			return this.authValid
		});
		
	}
	
	adminLogin({email, password}, callback = null) {

		signInWithEmailAndPassword(auth, email, password).then(async ({user}) => {
			// Get the user's ID token as it is needed to exchange for a session cookie.
			console.log(user)
			if (!user) {
				nookies.set(undefined, 'token', '', {path: '/'});
			} else {
				const token = await user.getIdToken();
				nookies.set(undefined, 'token', token, {path: '/'});
				console.log(nookies.get('token'))
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

export default Auth;