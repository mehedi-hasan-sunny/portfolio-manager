import {createContext, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {GET} from "../actions/http";
import Auth from "../actions/auth";

const AuthContext = createContext({
	user: null,
});

export function AuthContextProvider({children}) {
	const [user, setUser] = useState(null);
	const router = useRouter();
	
	const auth = new Auth();
	
	useEffect(async () => {
		if (router.pathname.includes("/admin")) {
			const token = getCookie("token");
			const {data} = await GET("/api/check-token", {token}).exec();
			if (data) {
				const {user} = data;
				if (user) {
					setUser(user);
					return;
				}
			}
			auth.destroyCookies()
			await router.push("/login")
		}
	}, []);
	
	// force refresh the token every 55 minutes
	useEffect(() => {
		if (user) {
			const TIMEOUT = (user.exp - user.auth_time - 300) * 1000;
			const handle = setInterval(async () => {
				const token = getCookie("token");
				const {data} = await GET("/api/refresh-token", {token}).exec();
				if (data) {
					const {user: authUser, token: newToken} = data;
					auth.setCookies({token: newToken, user: authUser});
					setUser(authUser);
				} else {
					auth.destroyCookies()
				}
			}, TIMEOUT);
			// clean up setInterval
			return () => clearInterval(handle);
		}
	}, [user]);
	
	return (
			<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
	);
}