import Input from "../custom/Input";
import {commonFromSubmitHandler} from "../../helpers/common";

const Contact = ({email = null, phone = null, settings = {}}) => {
	
	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target)
		const formProps = Object.fromEntries(form);
		
		await commonFromSubmitHandler(e, formProps, "/contact-me", null, null,
				{
					customSuccessMessage: "Email Sent.",
					customErrorMessage: "Email couldn't be sent at this moment!"
				})
	}
		
	
	return (
			<>
				<section>
					<div className="row py-4 border-bottom">
						<div className="col-12 col-md-3" data-aos="fade-right">
							{settings.title ? <h2 className={"fw-bold"}>{settings.title}</h2> : null}
						</div>
						<div className="col-12 col-md-9" data-aos="fade-left">
							<h1 className={"fs-32 lh-44 mt-0"}>
								{settings.headline_line_1}
								<br/>
								{settings.headline_line_2}
							</h1>
						</div>
					</div>
					<div className="row py-5">
						<div className="col-12 col-md-5 mb-4 mb-md-0" data-aos="fade-right" data-aos-delay={"200"}>
							<h2 className={"mb-4 fw-bold"}>Message me</h2>
							<form method={"post"} onSubmit={handleEmailSubmit}>
								<Input placeholder={"Full name"} name={"name"} id={"name"}/>
								<Input placeholder={"Email"} name={"email"} type={"email"} id={"email"}/>
								<Input placeholder={"Subject"} name={"subject"} id={"subject"}/>
								<textarea placeholder={"Message"} className={"form-control mb-3"} name="message" id="message" rows="4"/>
								<button type={"submit"} className={"btn btn-block bg-olive text-white"}>
									Send
								</button>
							</form>
						</div>
						<div className="col-md-5 offset-md-2" data-aos="fade-left" data-aos-delay={"200"}>
							<h2 className={"mb-4"}>Reach Me</h2>
							<p className={"fs-18 lh-28 mt-0 mb-5"}>
								{settings.reach_me_quote}
							</p>
							
							{/*<h3><i className={"la la-globe me-1"}></i>{email}</h3>*/}
							<h3 className={"mb-4 fw-500"}>
								<a href={"mailto:" + email}>
									<i className={"la la-envelope-o me-1"}></i>{email}
								</a>
							</h3>
							<h3 className={"fw-500"}>
								<a href={"tel:" + {phone}}>
									<i className={"la la-phone me-1"}></i>{phone}
								</a>
							</h3>
						
						</div>
					</div>
				</section>
			</>
	)
};

export default Contact;