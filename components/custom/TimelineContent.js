import timeline from "../../styles/Timeline.module.css";
import React from "react";
import {empty} from "../../helpers/common";

const AdminActions = () => null

const TimelineContent = ({designation, company, startDate, endDate = null, description, isAdmin = false, children}) => {
	
	const adminActions = isAdmin ? !Array.isArray(children) && children.type === AdminActions ? children : children.find(child => child.type === AdminActions) : isAdmin
	return (
			<div className={timeline.timelineWrapper}>
				<div className={timeline.timelineTitleContainer}>
					<h2 className={timeline.timelineHeader}>{designation}, <span className={"fw-bold"}>{company}</span>
					</h2>
					<h4 className={timeline.timelineDate}>{startDate + ' - ' + (!empty(endDate) ? endDate : 'Present')}</h4>
					
					{
						isAdmin ? adminActions.props.children : null
					}
				</div>
				<p className={timeline.timelineDescription}>
					{description}
				</p>
			</div>
	)
};

TimelineContent.AdminActions = AdminActions

export default TimelineContent;