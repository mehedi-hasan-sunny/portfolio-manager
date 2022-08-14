import Document, {Html, Head, Main, NextScript} from 'next/document';
import {getCookie} from "cookies-next";

export default class CustomDocument extends Document {
	// static async getInitialProps(ctx) {
	// 	const initialProps = await Document.getInitialProps(ctx)
	// 	const mode = getCookie("darkMode");
	// 	return { ...initialProps , mode: mode && mode === 'on' ? 'dark' : 'light'}
	// }
	render() {
		return (
				<Html data-mode={"light"}>
					<Head>
						<link rel="preconnect" href="https://fonts.googleapis.com"/>
						<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
						<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700&display=swap"
						      rel="stylesheet"/>
						<link rel="stylesheet"
						      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap-grid.min.css"
						      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
						<link rel="stylesheet"
						      href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
						<link rel="icon" href="/favicon.ico"/>
					</Head>
					<body>
					<Main />
					<NextScript />
					</body>
				</Html>
		)
	}
}