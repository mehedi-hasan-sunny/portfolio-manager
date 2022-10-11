import '../styles/globals.css'
import Head from "next/head";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import {AuthContextProvider} from "../context/AuthContextProvider";
import nookies from "nookies";
import {getCookie} from "cookies-next";

function MyApp({Component, pageProps, ...rest}) {
	const [switchValue, setSwitchValue] = useState();
	
	const toggleDarkMode = useCallback((e) => {
		const mode = document.querySelector("[data-mode]");
		mode.dataset.mode = (mode.dataset.mode === 'light') ? "dark" : 'light';
		nookies.set(undefined, 'darkMode', !(mode.dataset.mode === 'light') ? 'on' : 'off', {
			path: '/',
			maxAge: 365 * 24 * 60 * 60 * 1000
		});
		setSwitchValue((prev) => {
			return (mode.dataset.mode === 'light')
		})
	})
	
	const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
	
	useIsomorphicLayoutEffect(() => {
		if (typeof window !== "undefined") {
			const mode = getCookie("darkMode");
			const ele = document.querySelector("[data-mode]");
			ele.dataset.mode = (mode && mode === 'on' ? "dark" : 'light');
			setSwitchValue(!(mode && mode === 'on'))
		}
	}, []);
	
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
					<meta name="apple-mobile-web-app-title" content="dev.to"/>
					<meta name="application-name" content={process.env.NEXT_PUBLIC_TITLE}/>
					<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"/>
					<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"/>
				
				</Head>
				<div className={"fixed-right"} style={{zIndex: 9}}>
					
					<button className={"transparent-btn mt-4 me-4"} onClick={toggleDarkMode}>
						{
							!switchValue ? <i className={"la fs-24 la-sun-o text-gold"}></i> : <i className={"la fs-24 la-moon"}> </i>
						}
					</button>
					
					{/*<label className="switch mt-4 me-3">*/}
					{/*	<input type="checkbox" defaultChecked={switchValue} onClick={toggleDarkMode}/>*/}
					{/*	<span className="slider round"/>*/}
					{/*</label>*/}
				</div>
				<AuthContextProvider>
					<Component {...pageProps} />
				</AuthContextProvider>
				<ToastContainer/>
			</>
	)
	
}

export default MyApp
