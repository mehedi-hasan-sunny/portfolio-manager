import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from "react";
import {getCookies, getCookie, setCookie, removeCookies} from 'cookies-next';
import {empty} from "../helpers/common";

export default class CustomDocument extends Document {
	
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage
		
		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
		{
				return originalRenderPage({
					// Useful for wrapping the whole react tree
					enhanceApp: (App) => App,
					// Useful for wrapping in a per-page basis
					enhanceComponent: (Component) => Component,
				})
		}
		
		const initialProps = await Document.getInitialProps(ctx);
		// locale is in ctx.locale
		
		
		return {...initialProps, locale: ctx?.locale || 'en', isDarkModeOn: ctx?.isDarkModeOn || false};
	}
	
	render() {
		return (
				<Html data-mode={this.props.isDarkModeOn ? "dark" : "light"} lang={this.props.locale}>
					<Head>
						<link rel="preconnect" href="https://fonts.googleapis.com"/>
						<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
						<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700&display=swap"
						      rel="stylesheet"/>
						<link rel="stylesheet"
						      href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
						<link rel="stylesheet"
						      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap-grid.min.css"
						      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
						<link rel="icon" href="/favicon.ico"/>
					</Head>
					<body>
					<Main/>
					{/* Here we will mount our modal portal */}
					<div id="modal"/>
					<NextScript/>
					</body>
				</Html>
		)
	}
}