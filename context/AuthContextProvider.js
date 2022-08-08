import nookies from 'nookies';
import {createContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebaseDb/firebaseClient";
import {getCookie} from "cookies-next";

const AuthContext = createContext({
	user: null,
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	
	useEffect(async () => {
		const token = getCookie("token");
		const response = await fetch("/api/check-token?token="+token)
		const user = await response.json()
		console.log(user)
	}, []);
	
	// force refresh the token every 55 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			let cookieUser = getCookie('user');
			console.log(cookieUser)
			const user = auth.currentUser ?? getCookie('user');
			if (user) await user.getIdToken(true);
		}, 55 * 60 * 1000);
		
		// clean up setInterval
		return () => clearInterval(handle);
	}, []);
	
	return (
			<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}