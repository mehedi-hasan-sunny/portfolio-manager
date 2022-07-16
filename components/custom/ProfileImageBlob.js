import React from 'react';
import {avatar, imageBlob} from "../../styles/Profile.module.css";

function ProfileImageBlob({displayPicture, alt}) {
	let style = {};
	if (displayPicture) {
		style = {
			backgroundImage: `url('${displayPicture}')`
		};
	} else {
		style = {
			fontSize: '14rem',
			backgroundColor: '#b0b0b085',
		}
	}
	
	return (
			<div className={avatar}>
				<div className={imageBlob + `${!displayPicture ? ' la la-user' : ''}`}
				     style={style}/>
			</div>
	);
}

export default ProfileImageBlob;