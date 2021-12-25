import styles from '../styles/Profile.module.css'

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
								<div style={{position: "relative", zIndex: 2}}>
									<img className={styles.avatar} src={profile.displayPicture}
									     alt={profile.firstName + " " + profile.lastName}/>
									<h4>{profile.firstName + " " + profile.lastName}</h4>
									<h5>{profile.title}</h5>
									<div className={"d-flex flex-wrap justify-center mt-3"}>
										{
											profile.links.map((item, index) => {
												return (<a rel={"noreferrer"} href={item.url} target={"_blank"} key={index}>
													<i className={item.icon + " la-2x mx-2"}/>
												</a>)
											})
										}
									</div>
								</div>
							</> : null
				}
			</div>
	);
};

export default Profile;
