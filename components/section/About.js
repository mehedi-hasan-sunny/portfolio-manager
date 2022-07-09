import SectionLayout from "../layout/SectionLayout";

const About = ({profile, ...props}) => {
	return (
		<>
			
			<div className={"row justify-space-between align-center"}>
				<div className="col-xs-12 offset-sm-3 col-sm-9">
					<div className={"row gap-2 border-bottom pb-4"}>
						<div className="col ">
							<h4 className={"mb-4"}>Live in</h4>
							<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.liveIn}
													</span>
						</div>
						<div className="col">
							<h4 className={"mb-4"}>Experience</h4>
							<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.experienceInYears} years
													</span>
						</div>
						<div className="col">
							<h4 className={"mb-4"}>Birth Date</h4>
							<span className={"my-3 fs-18 fw-bold lh-22"}>
														{profile.dob}
													</span>
						</div>
					</div>
				</div>
			</div>
			
			<SectionLayout className={"border-bottom mb-3"} title={"Hello"} header={profile.bioTitle}>
				<p className={"my-3 fs-16 lh-22"}>
					{profile.bio}
				</p>
			</SectionLayout>
			
		</>
	)
};

export default About;