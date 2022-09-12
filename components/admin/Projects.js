import React from 'react';
import Card from "../Card";

const Projects = ({projects, handleSelectProject, toggleModal, deleteProject}) => {
	return (
			<div className={"row"}>
				{
					projects.map((item, index) => {
						return (
								<div className={"col-xs-12  col-sm-6 col-lg-4 mb-3"} key={index}>
									<Card key={index} imgSrc={
										item.images ?
												(() => {
													if (item.images.length) {
														const thumbnail = item.images.find(item => item.isThumbnail);
														return thumbnail ? thumbnail.url : item.images[0].url;
													} else {
														return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
													}
												})() : null}
									      className={"mb-2"}
									      onClick={() => {
										      handleSelectProject(item)
										      toggleModal();
									      }}
									/>
									<div className={"d-flex justify-space-between"}>
										<h4 className={"px-2"}>{item.title}</h4>
										<div>
											<i className={"las la-edit hover-able"} onClick={() => {
												handleSelectProject(item)
												toggleModal();
											}}/>
											&nbsp;
											<i className="las la-trash-alt ms-auto text-danger" onClick={() => deleteProject(item.id)}/>
										</div>
									
									</div>
								</div>
						)
					})
				}
			</div>
	);
};

export default React.memo(Projects);