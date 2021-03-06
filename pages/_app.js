import '../styles/globals.css'
import Head from "next/head";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function MyApp({Component, pageProps, ...rest}) {
	const toggleDarkMode = (e) => {
		const mode = document.querySelector("[data-mode]");
		mode.dataset.mode = e.target.checked ? "dark" : 'light';
		
		pageProps.isDarkModeOn = e.target.checked
	}
	
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
						<input type="checkbox" defaultChecked={false} onChange={toggleDarkMode}/>
						<span className="slider round"/>
					</label>
				</div>
				<Component {...pageProps} />
				<ToastContainer/>
			</>
	)
	
}

export default MyApp
