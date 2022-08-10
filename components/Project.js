import HtmlParser from "html-react-parser";

function Project({project, handleSelectedItem, className = '', order = 0}) {
	
	const getThumbnail = () => {
		if (project.images.length) {
			const thumbnail = project.images.find(item => item.isThumbnail);
			return thumbnail ? thumbnail.url : project.images[0].url;
		}
		return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		
	}
	
	return (
			<div className={`row py-5 ${className}`.trim()}>
				<div className="col-sm-12 col-md-5 ps-md-0" data-aos={"fade-right"}>
					<div className="d-flex h-100 flex-column justify-space-between">
						<div>
							<h3>{order < 10 ? "0" + order : order} / {project.title}</h3>
							<div className={"fs-12 mt-5"}>
								{HtmlParser(project.description)}
							</div>
						</div>
						<a href={"#"} onClick={(event) => {
							event.preventDefault()
							handleSelectedItem(project)
						}} className={"mt-auto d-inline-flex align-center text-underline"}>
							<span>See more  &nbsp;</span><i className={"las la-arrow-right"} style={{paddingTop: '1px'}}></i>
						</a>
					</div>
				</div>
				<div className="col-sm-12 col-md-7 pe-md-0" data-aos={"fade-left"}>
					<img className={"img-fluid ms-0 ms-md-auto mt-5 mt-md-0"} style={{maxHeight: "20rem"}} src={getThumbnail()}
					     loading={"lazy"} alt={project.title}/>
				</div>
			</div>
	);
}

export default Project;