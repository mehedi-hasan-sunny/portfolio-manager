import React from 'react';
import Card from "./Card";
import defaultImage from "../public/undraw_photo_re_5blb.svg"
function DribbbleShot({shot, className = ''}) {
	console.log(shot)
	const getThumbnail = () => {
		return shot.images.hidpi ?? defaultImage;
	}
	
	return (
			<Card imgSrc={getThumbnail()} className={"mb-2"} href={shot.html_url} onClick={() => {
				window.open(shot.html_url, '_blank');
			}}>
				<h5 className={"mt-1 fw-600"}>{shot.title}</h5>
			</Card>
	);
}

export default DribbbleShot;