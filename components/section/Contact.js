import timeline from "../../styles/Timeline.module.css"
import Input from "../custom/Input";

const Contact = () => {

	return (
			<div className="row">
				<div className="col-md-7">
					<h2 className={"mb-4 fw-bold"}>Message Me Here</h2>
					<Input placeholder={"Full name"} name={"name"} id={"name"} />
					<Input placeholder={"Email"} name={"email"} type={"email"} id={"email"} />
					<Input placeholder={"Subject"} name={"subject"} id={"subject"} />
					<textarea placeholder={"Message"} className={"form-control mb-3"} name="message" id="message" rows="5" />
					<button className={"btn btn-block"}>
						Submit
					</button>
				</div>
				<div className="col-md-5">
				
				</div>
			</div>
	)
};

export default Contact;