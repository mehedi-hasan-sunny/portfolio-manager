import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebaseClient";
import nookies from "nookies";
class Auth {

	setCookies({token, user}){
		nookies.set(undefined, 'token', token ? token : '', {path: '/', maxAge: 60 * 60});
		nookies.set(undefined, 'user', user ? JSON.stringify(user) : '', {path: '/', maxAge: 60 * 60});
	}
	destroyCookies(){
		nookies.destroy(undefined, "token");
		nookies.destroy(undefined, "user");
	}
	
	
	adminLogin({email, password}, callback = null) {
		
		signInWithEmailAndPassword(auth, email, password).then(async ({user}) => {
			// Get the user's ID token as it is needed to exchange for a session cookie.
			if (!user) {
				this.setCookies()
			} else {
				const token = await user.getIdToken();
				this.setCookies({token, user})
			}
		
		}).then(() => {
			// A page redirect would suffice as the persistence is set to NONE.
			// return auth.signOut();
		}).then(() => {
			if (callback) {
				callback();
			}
		});
	}
}
export const adminLogin = ({email, password}, callback = null) => {
	const auth = new Auth();
	auth.adminLogin({email, password}, callback)
}

export default Auth;