import React, {useState} from 'react';
import SectionLayout from "../layout/SectionLayout";
import {empty} from "../../helpers/common";

const TestimonialsSection = ({
	                             testimonials,
	                             isAdmin = false,
	                             editTestimonial = null,
	                             deleteTestimonial = null,
	                             className = null,
	                             ...props
                             }) => {
	const [currentIndex, SetCurrentIndex] = useState(0);
	
	const handleCurrentIndex = (index) => {
		SetCurrentIndex(index < 0 ? 0 : index)
	}
	
	return (
			<SectionLayout className={className} title={"Testimonials"}>
				{
					!empty(testimonials) ?
							<div key={currentIndex} className={"relative"}>
								<h3 className={"lh-28 mb-0 fw-600"}>{testimonials[currentIndex].name}</h3>
								<h5 className={"mb-0"}>{testimonials[currentIndex].designation}</h5>
								<p style={{minHeight: "7rem"}}>
									{testimonials[currentIndex].feedback}
								</p>
								<button className={"me-2 btn btn-sm rounded bg-cream text-dark border-0"} onClick={() => {
									handleCurrentIndex(currentIndex - 1)
								}} disabled={currentIndex <= 0}><i className={"la la-angle-left"}></i></button>
								<button className={"btn btn-sm rounded bg-cream text-dark border-0"} onClick={() => {
									handleCurrentIndex(currentIndex + 1)
								}} disabled={currentIndex >= testimonials.length - 1}>
									<i className={"la la-angle-right"}></i>
								</button>
								{
									isAdmin ?
											<div className={"top-right"}>
												<div className={"d-flex align-center gap-0.5"}>
													<button className={"transparent-btn"} aria-label={"Edit experience"}
													        onClick={() => {
														        editTestimonial(testimonials[currentIndex]);
													        }}>
														<i className={"las la-edit"}/>
													</button>
													
													<button className={"transparent-btn"} aria-label={"Delete experience"}
													        onClick={() => {
														        deleteTestimonial(testimonials[currentIndex].id)
													        }}>
														<i className={"las la-trash-alt text-danger"}/>
													</button>
												</div>
											</div> : null
								}
							</div>
							: null
				}
			</SectionLayout>
	)
};

export default TestimonialsSection;