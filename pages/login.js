import React from 'react';
import Input from "../components/custom/Input";
import Link from "next/link";
import {adminLogin} from "../actions/auth";
import {getCookie} from "cookies-next";

export async function getServerSideProps({req, res}) {
	let token = null;
	try {
		token = getCookie("token", {req, res});
	} catch (e) {
		token = null
	}
	
	const data = {
		props: {}
	};
	
	if (token) {
		data.redirect = {
			permanent: false, destination: "/admin",
		};
	}
	return data
}

function Login(props) {
	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
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
					
				</form>
			</div>
	
	);
}

export default Login;