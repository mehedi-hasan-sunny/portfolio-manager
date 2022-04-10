import React from 'react';
import Card from "../Card";

function Projects({projects = [], handleSelectedItem, ...props}) {
	props.className = ("row gx-5 " + props.className).trim()
	return (
			<div className={props.className}>
				{
					projects.map((project, index) =>
							<div className={`col-md-6 mb-4`} key={index}>
								<a href={"#"} onClick={(event) => {
									event.preventDefault()
									handleSelectedItem(project)
								}}>
									<Card maxWidth={"100%"} className={"mx-auto mb-3"}
									      imgSrc={
										      project.images ?
												      (() => {
													      if (project.images.length) {
														      const thumbnail = project.images.find(item => item.isThumbnail);
														      return thumbnail ? thumbnail.url : project.images[0].url;
													      } else {
														      return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
													      }
												      })() : null}
									      alt={project.title}
									/>
									<h4 className={"mb-0"}>{project.title}</h4>
								</a>
							
							</div>
					)
				}
			</div>
	
	);
}

export default Projects;