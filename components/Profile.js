import styles from '../styles/Profile.module.css'
import ProfileImageBlob from "./custom/ProfileImageBlob";
import {empty} from "../helpers/common";
import CircleText from "./custom/CircleText";

const Profile = ({profile = null}) => {
	return (
			<div className={"text-center " + styles.profile__wrapper}>
				{
					!empty(profile) ?
							<>
								<div className={"container relative"} style={{zIndex: 2}}>
									
									{
										!empty(profile?.circleText) ?
												<CircleText text={profile?.circleText} size={profile?.circleTextSize} fontSize={profile?.circleFontSize}
												            deg={profile.circleTextDegree} dataAos={"zoom-in-left"}/>
												: null
									}
									
									<ProfileImageBlob displayPicture={profile?.displayPicture?.displayPicture}
									                  alt={profile.firstName + " " + profile.lastName}/>
									
									<h1 className={"fw-bold mb-3 lh-32"} data-aos="fade-right">{profile.firstName + " " + profile.lastName}</h1>
									<h4 className={"fw-bold mb-5"} data-aos="fade-left">{profile.title}</h4>
									
									<div className={"reach-me-ticker d-none d-md-block"} style={{left: Math.floor(profile?.circleText?.length * profile?.circleTextSize / 1.5)}}>
										<span></span>
									</div>
									<div className={"row justify-space-between align-end py-3 border " + styles.reachMeSection}>
										<div className="col text-left" data-aos={"fade-right"}>
											<h4 className={"fw-bold"}>Reach Me</h4>
											<a href={"tel:" + profile.phoneCode + profile.phoneNumber}>
												<span className={""}>{profile.phoneCode}</span> {profile.phoneNumber}
											</a>
											<br/>
											<a href={"mailto:" + profile.email}>
												{profile.email}
											</a>
										</div>
										<div className={"col"} data-aos={"fade-left"}>
											<div className={"d-flex flex-wrap justify-end mt-3"}>
												{
													profile.links.map((item, index) => {
														return (<a rel={"noreferrer"} href={item.url} target={"_blank"} key={index}>
															<i className={item.icon + " la-2x mx-2"}/>
														</a>)
													})
												}
											</div>
										</div>
									</div>
								</div>
							</> : null
				}
			</div>
	);
};

export default Profile;
