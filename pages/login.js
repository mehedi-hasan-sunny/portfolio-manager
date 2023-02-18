import Input from "../components/custom/Input";
// import Link from "next/link";
import {adminLogin} from "../actions/auth";
import {getCookie} from "cookies-next";
import {useState} from "react";

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
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsDisabled(true);
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        adminLogin(formProps, (data) => {
            if (data && data.error) {
                setErrorMessage(data.message);
                setIsDisabled(false);
                return;
            }
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            window.location.href = redirect || "/admin"
        })

    }

    return (
        <div className={"container d-flex align-center justify-center"} style={{maxWidth: '30rem', minHeight: '80vh'}}>
            <form className={"p-3 mx-auto w-100"} onSubmit={handleSubmit}>
                <h2 className={"my-4 text-center"}>Log in</h2>
                <Input label={"Email"} type={"email"} name={"email"} required errorMessage={errorMessage}
                       disabled={isDisabled} onInput={() => {
                    setErrorMessage(null);
                }}/>

                <Input label={"Password"} type={"password"} name={"password"} required disabled={isDisabled}
                       errorMessage={errorMessage ? ' ' : null} onInput={() => {
                    setErrorMessage(null);
                }}/>

                <button type={"submit"} disabled={isDisabled}
                        className={"btn bg-olive text-white pull-right btn-block"}>Confirm
                </button>

            </form>
        </div>

    );
}

export default Login;