import styles from '../styles/Profile.module.css'
import ProfileImageBlob from "./custom/ProfileImageBlob";

const Profile = ({profile = null}) => {
	return (
			<div className={"text-center " + styles.profile__wrapper}>
				<div className={styles.profileBg}>
					<div className={styles.profileBgStars}/>
					<div className={styles.profileBgCliff}/>
					<div className={styles.profileBgShootingStar}/>
					<div className={styles.profileBgMoon}/>
					<div className={styles.profileBgSun}/>
					<div className={styles.profileBgCloud1}/>
					<div className={styles.profileBgCloud2}/>
					<div className={styles.profileBgCloud3}/>
					<div className={styles.profileBgCloud4}/>
					<div className={styles.profileBgCloud5}/>
				</div>
				{
					profile ?
							<>
								<div className={"container"} style={{position: "relative", zIndex: 2}}>
									
									<ProfileImageBlob displayPicture={profile.displayPicture} alt={profile.firstName + " " + profile.lastName}/>
									
									<h2 className={"fw-bold"}>{profile.firstName + " " + profile.lastName}</h2>
									<h5>{profile.title}</h5>
									
									<div className={"row justify-space-between align-end py-3"}>
										<div className="col text-left">
											<h4 className={"fw-bold"}>Reach Me</h4>
											<a href={"tel:" + profile.phoneCode+profile.phoneNumber}>
												<span className={"mr-1"}>{profile.phoneCode}</span> {profile.phoneNumber}
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
