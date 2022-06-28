import '../styles/globals.css'
import Head from "next/head";
import React from "react";

function MyApp({Component, pageProps}) {
	const isDarkModeOn = false;
	const toggleDarkMode = (e) => {
		const mode = document.querySelector("[data-mode]");
		mode.dataset.mode = e.target.checked ? "dark" : 'light';
	}
	return (
			<>
				<Head>
					<html data-mode={isDarkModeOn ? "dark" : "light"}/>
					<link rel="preconnect" href="https://fonts.googleapis.com"/>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
					<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700&display=swap"
					      rel="stylesheet"/>
					<link rel="stylesheet"
					      href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
					<link rel="stylesheet"
					      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap-grid.min.css"
					      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
					<title>Shohanur Rahman - UI-UX, Frontend Developer</title>
				</Head>
				<div style={{position: 'absolute', right: '1rem', top: "1rem", zIndex: 9}}>
					<label className="switch">
						<input type="checkbox" defaultChecked={isDarkModeOn} onChange={(e) => toggleDarkMode(e)}/>
						<span className="slider round"/>
					</label>
				</div>
				<Component {...pageProps} />
			</>
	)
	
}

export default MyApp
