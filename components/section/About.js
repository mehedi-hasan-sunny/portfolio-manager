import timeline from "../../styles/Timeline.module.css"
import TimelineContent from "../custom/TimelineContent";

const About = ({experiences, isAdmin = false, editExperience = null, deleteExperience = null}) => {
	return (
			<div className={timeline.timeline}>
				<div className={timeline.timelineLeft}>
					<h2 className={timeline.timelineHeader + " fw-bold"}>Work Experience</h2>
				</div>
				
				<div className={timeline.timelineRight}>
					{
						experiences && experiences.map((experience, index) =>
								<TimelineContent {...experience} key={index} isAdmin={isAdmin}>
									{
										isAdmin ?
												<TimelineContent.AdminActions>
													<div className={"d-flex align-center gap-1"}>
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
	)
};

export default About;