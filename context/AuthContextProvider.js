import nookies from 'nookies';
import {createContext, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";

const AuthContext = createContext({
	user: null,
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const router = useRouter()
	
	useEffect(async () => {
		
		if(router.pathname.includes("/admin")){
			const token = getCookie("token");
			const response = await fetch("/api/check-token?token="+token)
			const {data} = await response.json();
			if(data){
				const {user} = data;
				if(user){
					setUser(user);
					return;
				}
			}
			nookies.destroy(undefined, "token");
			nookies.destroy(undefined, "user");
			await router.push("/login")
		}
		
	}, []);
	
	// force refresh the token every 55 minutes
	useEffect(() => {
		if(user){
			const TIMEOUT = user.exp - user.auth_time - 300;
			const handle = setInterval(async () => {
				const token = getCookie("token");
				const response = await fetch("/api/refresh-token?token="+token)
				const {data} = await response.json();
				if(data){
					const {user: authUser, token: newToken} = data;
					nookies.set(undefined, 'token', newToken, {path: '/', maxAge: 60 * 60});
					nookies.set(undefined, 'user', JSON.stringify(authUser), {path: '/', maxAge: 60 * 60});
					setUser(authUser);
				}
				nookies.destroy(undefined, "token");
				nookies.destroy(undefined, "user");
			}, TIMEOUT);
			
			// clean up setInterval
			return () => clearInterval(handle);
		}
		
		
	}, [user]);
	
	return (
			<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}