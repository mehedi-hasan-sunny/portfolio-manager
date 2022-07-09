import React from 'react';
import SectionLayout from "./layout/SectionLayout";
import TimelineContent from "./custom/TimelineContent";
import timeline from "../styles/Timeline.module.css";

const ExperiencesSection = ({experiences, isAdmin = false, editExperience = null, deleteExperience = null, className = null, ...props}) => {
	return (
			<SectionLayout className={className} title={"Experiences"}>
				{
					<div className={timeline.timeline}>
						<div className={timeline.timelineRight}>
							{
									experiences && experiences.map((experience, index) =>
											<TimelineContent {...experience} key={index} isAdmin={isAdmin}>
												{
													isAdmin ?
															<TimelineContent.AdminActions>
																<div className={"d-flex align-center gap-0.5 top-right"}>
																	<button className={"transparent-btn"} aria-label={"Edit experience"}
																	        onClick={() => {
																		        editExperience(experience);
																	        }}>
																		<i className={"las la-edit"}/>
																	</button>
																	
																	<button className={"transparent-btn"} aria-label={"Delete experience"}
																	        onClick={() => {
																		        deleteExperience(experience.id)
																	        }}>
																		<i className={"las la-trash-alt text-danger"}/>
																	</button>
																</div>
															</TimelineContent.AdminActions> : null
												}
											</TimelineContent>
									)
							}
						</div>
					</div>
				}
			</SectionLayout>
	)
};

export default ExperiencesSection;