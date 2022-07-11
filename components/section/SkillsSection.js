import React from 'react';
import SectionLayout from "../layout/SectionLayout";

const SkillsSection = ({skills, isAdmin = false, editSkill = null, deleteSkill = null, className = null, ...props}) => {
	
	const makeStar = (skill) => {
	  return Array(skill.rating - (skill.rating % 1)).fill("*").map((val, index) => {
		  return <i className={"la la-star"} key={skill.id+"-star-" + index}></i>
	  })
	}
	
	return (
			<SectionLayout className={className} title={"Skills"}>
				<ul className={"row "} style={{listStyleType: "square"}}>
					{
						skills.map((skill, index) => {
							return (
									<li key={index} className={"col relative"}>
										<h4 className={"lh-22 mb-0"}>{skill.title} <span className={"fw-bold"}>{skill.type}</span></h4>
										<h5>
											{
												makeStar(skill)
											}
											{
												(skill.rating % 1 === 0.5) ? <i className={"la la-star-half"}></i> : null
											}
										</h5>
										
										{
											isAdmin ?
													<div className={"skill-edit-top-right"}>
														<div className={"d-flex align-center gap-0.5"}>
															<button className={"transparent-btn"} aria-label={"Edit experience"}
															        onClick={() => {
																        editSkill(skill);
															        }}>
																<i className={"las la-edit"}/>
															</button>
															
															<button className={"transparent-btn"} aria-label={"Delete experience"}
															        onClick={() => {
																        deleteSkill(skill.id)
															        }}>
																<i className={"las la-trash-alt text-danger"}/>
															</button>
														</div>
													</div> : null
										}
									</li>
						)
						})
					}
				</ul>
			</SectionLayout>
	)
};

export default SkillsSection;