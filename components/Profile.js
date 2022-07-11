import styles from '../styles/Profile.module.css'
import ProfileImageBlob from "./custom/ProfileImageBlob";

const Profile = ({profile = null}) => {
	return (
			<div className={"text-center " + styles.profile__wrapper}>
				{
					profile ?
							<>
								<div className={"container"} style={{position: "relative", zIndex: 2}}>
									
									<ProfileImageBlob displayPicture={profile.displayPicture.displayPicture} alt={profile.firstName + " " + profile.lastName}/>
									
									<h1 className={"fw-bold mb-3"}>{profile.firstName + " " + profile.lastName}</h1>
									<h4 className={"fw-bold mb-5"}>{profile.title}</h4>
									
									<div className={"row justify-space-between align-end py-3 border " + styles.reachMeSection}>
										<div className="col text-left">
											<h4 className={"fw-bold"}>Reach Me</h4>
											<a href={"tel:" + profile.phoneCode+profile.phoneNumber}>
												<span className={"me-1"}>{profile.phoneCode}</span> {profile.phoneNumber}
											</a>
											<br/>
											<a href={"mailto:" + profile.email}>
												{profile.email}
											</a>
										</div>
										<div className={"col"}>
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
