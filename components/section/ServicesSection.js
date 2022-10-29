import SectionLayout from "../layout/SectionLayout";
import HtmlParser from "html-react-parser";

const ServicesSection = ({
	                         services,
	                         isAdmin = false,
	                         editService = null,
	                         deleteService = null,
	                         className = null,
	                         header = null,
	                         title = "Services",
	                         ...props
                         }) => {
	return (
			<>
				<SectionLayout className={className + ' pb-0 border-bottom'} title={title} header={header}/>
				<SectionLayout>
					<div className={"row mb-4"}>
						{
							services.map((service) => {
								return <div className="col-12 col-md-6 col-lg-4" key={service.id}>
									<div
											className={"relative border-1 rounded-lg d-flex align-center justify-center flex-column p-3 w-100"}>
										<img className={"img-fluid mt-3"} style={{maxWidth: "3.5rem"}} src={service.icon} alt=""
										     loading={"lazy"}/>
										<h4 className={"fw-bold mt-5 mb-4"}>{service.title}</h4>
										<div className={"fs-14 my-0"}>
											{HtmlParser(service.description)}
										</div>
										{
											isAdmin ?
													<div className={"top-right-0.5"}>
														<div className={"d-flex align-center gap-0.5"}>
															<button className={"transparent-btn"} aria-label={"Edit experience"}
															        onClick={() => {
																        editService(service);
															        }}>
																<i className={"las la-edit"}/>
															</button>
															
															<button className={"transparent-btn"} aria-label={"Delete experience"}
															        onClick={() => {
																        deleteService(service.id)
															        }}>
																<i className={"las la-trash-alt text-danger"}/>
															</button>
														</div>
													</div> : null
										}
									</div>
								</div>
							})
						}
					</div>
					{
						props.children
					}
				</SectionLayout>
			</>
	
	)
};

export default ServicesSection;