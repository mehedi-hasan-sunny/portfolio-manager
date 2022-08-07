import React from 'react';
import Input from "../components/custom/Input";
import Link from "next/link";
import {adminLogin} from "../actions/auth";
import {auth} from "../firebaseDb/firebaseAdmin"
import {getCookie} from "cookies-next";

export async function getServerSideProps({req, res}) {
	const token = getCookie("token", {req, res});
	let user = null;
	if(token){
		user = await auth.verifyIdToken(token);
	}
	
	
	const data = {
		props: {}
	};
	
	if (user) {
		data.redirect = {
			permanent: false,
			destination: "/admin",
		};
	}
	return data
}

function Login(props) {
	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps)
		adminLogin(formProps, () => {
			window.location.href = "/admin"
		})
		
	}
	
	return (
			<div className={"container d-flex align-center justify-center"} style={{maxWidth: '30rem', minHeight: '80vh'}}>
				<form className={"p-3 mx-auto w-100"} onSubmit={handleSubmit}>
					<h2 className={"my-4 text-center"}>Log in</h2>
					<Input label={"Email"} type={"email"} name={"email"} required/>
					
					<Input label={"Password"} type={"password"} name={"password"} required/>
					
					<button type={"submit"}
					        className={"btn bg-olive text-white pull-right btn-block"}>Confirm
					</button>
					
					
					<Link href={"/admin"} passHref>
						<button
								className={"btn bg-olive text-white pull-right btn-block mt-5"}>Admin
						</button>
					</Link>
				
				</form>
			</div>
	
	);
}

export default Login;