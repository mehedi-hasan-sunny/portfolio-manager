import SectionLayout from "../layout/SectionLayout";
import {empty} from "../../helpers/common";
import HtmlParser from "html-react-parser";

const About = ({profile, ...props}) => {
	return (
			<>
				{
					!empty(profile) ?
							<>
								<div className={"row justify-space-between align-center"}>
									<div className="col-xs-12 offset-sm-3 col-sm-9">
										<div className={"row gap-2 border-bottom pb-4"}>
											<div className="col" data-aos="fade-up">
												<h4 className={"mb-4 fs-14"}>Live in</h4>
												<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.liveIn}
													</span>
											</div>
											<div className="col" data-aos="fade-up" data-aos-delay="250">
												<h4 className={"mb-4 fs-14"}>Experience</h4>
												<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.experienceInYears} years
													</span>
											</div>
											<div className="col" data-aos="fade-up" data-aos-delay="500">
												<h4 className={"mb-4 fs-14"}>Birth Date</h4>
												<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.dob}
													</span>
											</div>
										</div>
									</div>
								</div>
								
								<SectionLayout className={"border-bottom mb-3"} title={"Hello"} header={profile.bioTitle}>
									<p className={"my-3 fs-16 fw-400 lh-22"}>
										{HtmlParser(profile.bio)}
									</p>
								</SectionLayout>
							
							</>
							: null
				}
			</>
	)
};

export default About;