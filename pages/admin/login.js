import React from 'react';
import Input from "../../components/custom/Input";

function Login(props) {
	function handleSubmit() {
	
	}
	
	return (
			<div className={"container d-flex align-center justify-center"} style={{maxWidth: '30rem', minHeight: '80vh'}}>
				<form className={"p-3 mx-auto w-100"} onSubmit={handleSubmit} >
					<h2 className={"my-4 text-center"}>Log in</h2>
					<Input label={"Email"} type={"email"} required/>
					
					<Input label={"Password"} type={"password"} required/>
					
					<button type={"submit"}
					        className={"btn bg-olive text-white pull-right btn-block"}>Confirm</button>
				</form>
			</div>
		
	);
}

export default Login;