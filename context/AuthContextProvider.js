import nookies from 'nookies';
import {createContext, useEffect, useState} from "react";
import {onIdTokenChanged, check} from "firebase/auth"
import {auth} from "../firebaseDb/firebaseClient";

const AuthContext = createContext({
	user: null,
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	
	// listen for token changes
	// call setUser and write new token as a cookie
	useEffect(() => {
		// return onIdTokenChanged(auth, async (user) => {
		// 	console.log(user)
		// 	if (!user) {
		// 		setUser(null);
		// 		nookies.set(undefined, 'token', '', { path: '/' });
		// 	} else {
		// 		const token = await user.getIdToken();
		// 		setUser(user);
		// 		nookies.set(undefined, 'token', token, { path: '/' });
		// 	}
		// });
	}, []);
	
	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			const user = auth.currentUser;
			if (user) await user.getIdToken(true);
		}, 10 * 60 * 1000);
		
		// clean up setInterval
		return () => clearInterval(handle);
	}, []);
	
	return (
			<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}