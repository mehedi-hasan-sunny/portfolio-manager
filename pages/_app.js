import '../styles/globals.css'
import Head from "next/head";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import {AuthContextProvider} from "../context/AuthContextProvider";
import nookies from "nookies";
import {getCookie} from "cookies-next";

function MyApp({Component, pageProps}) {
	const toggleDarkMode = (e) => {
		const mode = document.querySelector("[data-mode]");
		mode.dataset.mode = e.target.checked ? "dark" : 'light';
		nookies.set(undefined, 'darkMode', e.target.checked ? 'on' : 'off', {path: '/', maxAge: 365 * 24 * 60 * 60 * 1000})
	}
	const darkMode = getCookie("darkMode");
	const switchValue = (darkMode && darkMode === 'on')
	
	useEffect(() => {
		AOS.init({
			duration: 1500
		});
		AOS.refresh();
	}, []);
	
	return (
			<>
				<Head>
					<title>{process.env.NEXT_PUBLIC_TITLE}</title>
				</Head>
				<div className={"fixed-right"} style={{zIndex: 9}}>
					<label className="switch mt-4 me-3">
						<input type="checkbox" defaultChecked={switchValue} onClick={toggleDarkMode}/>
						<span className="slider round"/>
					</label>
				</div>
				<AuthContextProvider>
					<Component {...pageProps} />
				</AuthContextProvider>
				<ToastContainer/>
			</>
	)
	
}

export default MyApp
