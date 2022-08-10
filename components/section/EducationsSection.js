import SectionLayout from "../layout/SectionLayout";

const EducationsSection = ({
	                           educations,
	                           isAdmin = false,
	                           editEducation = null,
	                           deleteEducation = null,
	                           className = null,
	                           dataAosDelay = null,
	                           ...props
                           }) => {
	return (
			<SectionLayout className={className} title={"Educations"} dataAosDelay={dataAosDelay}>
				{
					educations.map((education, index) => {
						return (
								<div className={"relative mb-3 " + (index !== (educations.length - 1) ? "border-bottom" : '')}
								     key={index}>
									<h3 className={"lh-28"}>{education.department}</h3>
									<h3 className={"fw-600 lh-28"}>{education.institution}</h3>
									<h4 className={"mb-3"}>Passing Year {education.passingYear}</h4>
									{
										isAdmin ?
												<div className={"top-right"}>
													<div className={"d-flex align-center gap-0.5"}>
														<button className={"transparent-btn"} aria-label={"Edit experience"}
														        onClick={() => {
															        editEducation(education);
														        }}>
															<i className={"las la-edit"}/>
														</button>
														
														<button className={"transparent-btn"} aria-label={"Delete experience"}
														        onClick={() => {
															        deleteEducation(education.id)
														        }}>
															<i className={"las la-trash-alt text-danger"}/>
														</button>
													</div>
												</div> : null
									}
								</div>
						)
					})
				}
			</SectionLayout>
	)
};

export default EducationsSection;