import timeline from "../../styles/Timeline.module.css"

const TimelineContent = () => (
		
		<div className={timeline.timelineWrapper}>
			<div className={timeline.timelineTitleContainer}>
				<h2 className={timeline.timelineHeader}>Digital Product Manager, <span className={"fw-bold"}>ZX Com</span>
				</h2>
				<h4 className={timeline.timelineDate}>Dec 2019 - Present</h4>
			</div>
			<p className={timeline.timelineDescription}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolore fugit magni nesciunt sed? A
				aspernatur assumenda esse eveniet exercitationem.
			</p>
		</div>
);
const About = (props) => (
		<div className={timeline.timeline}>
			<div className={timeline.timelineLeft}>
				<h2 className={timeline.timelineHeader + " fw-bold"}>Work Experience</h2>
			</div>
			
			<div className={timeline.timelineRight}>
				{
					[1, 2, 3, 4, 5].map((index) =>
							<TimelineContent key={index}/>
					)
				}
			</div>
		
		
		</div>
);

export default About;