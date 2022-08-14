import HtmlParser from "html-react-parser";
import Image from "next/image";

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
						<div className={"mb-3"}>
							<h3>{order < 10 ? "0" + order : order} / {project.title}</h3>
							<div className={"fs-12 mt-5"}>
								{HtmlParser(project.description)}
							</div>
						</div>
						<div className={"d-inline-flex align-center"}>
							<a href={"#"} onClick={(event) => {
								event.preventDefault()
								handleSelectedItem(project)
							}} className={"mt-auto d-inline-block text-underline"}>
								<span>See more  &nbsp;</span><i className={"las la-arrow-right text-underline"}></i>
							</a>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-7 pe-md-0" data-aos={"fade-left"}>
					<div className={"d-flex justify-center justify-content-md-end ms-0 ms-md-auto mt-5 mt-md-0"}>
						<div className="image-container">
							<Image className={"img-fluid"} style={{maxHeight: "20rem"}} src={getThumbnail()}
							       loading={"lazy"} alt={project.title} height={320} width={410}/>
						</div>
					</div>
				
				</div>
			</div>
	);
}

export default Project;