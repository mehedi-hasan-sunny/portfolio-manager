import React from 'react';
import {avatar, imageBlob} from "../../styles/Profile.module.css";

function ProfileImageBlob({displayPicture, alt}) {
	return (
			<div className={avatar}>
				<div className={imageBlob} style={{backgroundImage: `url('${displayPicture}')`}}/>
			</div>
	);
}

export default ProfileImageBlob;