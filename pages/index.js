import Head from 'next/head'
import {container, main} from '../styles/Home.module.css'
import Profile from "../components/Profile";
import {useState} from "react";
import db from "../config/firebaseAdmin";
import About from "../components/section/About";
import Contact from "../components/section/Contact";
import EducationsSection from "../components/section/EducationsSection";
import ExperiencesSection from "../components/section/ExperiencesSection";
import CertificationsSection from "../components/section/CertificationsSection";
import SkillsSection from "../components/section/SkillsSection";
import TestimonialsSection from "../components/section/TestimonialsSection";
import SectionLayout from "../components/layout/SectionLayout";
import Navbar from "../components/layout/Navbar";
import HomeContext from "../context/HomeContext";
import ProjectsSection from "../components/section/ProjectsSection";
import ServicesSection from "../components/section/ServicesSection";
import {empty} from "../helpers/common";
import {getProjects} from "../actions/getProjects";
import BlogsSection from "../components/section/BlogsSection";
import {firestore} from "firebase-admin";
import deepmerge from "deepmerge";
import CRUD from "../helpers/CRUD";


export async function getStaticProps(context) {
	try {
		const collectionCRUD = new CRUD('settings', 'settings');
		const settingsDefault = require("../config/settingsDefault.json");
		let settingsCollection = await collectionCRUD.read();
		
		if (settingsCollection instanceof Error) {
			settingsCollection = {}
		} else {
			settingsCollection = settingsCollection[0]
			delete settingsCollection.id
		}
		
		
		let settingsData = deepmerge(settingsDefault, settingsCollection);
		
		const {sections: settingSections, projects: settingProjects} = settingsData;
		
		let projects = [], profile = {}
		
		const profileCollectionRef = db.collection("profile").limit(1);
		const profileSnapshot = await profileCollectionRef.get();
		
		if (!profileSnapshot.empty) {
			const profileDoc = profileSnapshot.docs[0];
			profile = {id: profileDoc.id, ...profileDoc.data()}
			const linksRef = await db.collection(`profile/${profileDoc.id}/links`).get();
			const displayImageRef = await db.collection(`profile/${profileDoc.id}/displayPicture`).limit(1).get();
			const links = linksRef.docs.map(link => {
				return {id: link.id, ...link.data()}
			})
			
			profile.links = await Promise.all(links);
			profile.displayPicture = displayImageRef?.docs[0]?.data() ?? null;
		}
		
		projects = await getProjects(db, true);
		
		
		const docs = ["experiences", "educations", "certifications", "skills", "testimonials", "services", "blogs"]
		const docRes = async (doc) => {
			const docRef = db.collection(doc);
			const docSnap = await docRef.orderBy("createdAt", "asc").get();
			if (!docSnap.empty) {
				return docSnap.docs.reverse().map(collection => {
					
					const data = collection.data()
					
					Object.keys(data).forEach((item) => {
						if (data[item] instanceof firestore.Timestamp) {
							const date = data[item].toDate()
							data[item] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
						}
					});
					
					return {id: collection.id, ...data};
				})
			}
			return []
		}
		const docMapped = docs.map(async (doc) => {
			return {[doc]: await docRes(doc)}
		});
		const docMappedRes = await Promise.all(docMapped);
		const docResults = docs.reduce((acc, doc, index) => ({
			...acc, [doc]: docMappedRes[index][doc]
		}), {});
		const {experiences, educations, certifications, skills, testimonials, services, blogs} = docResults;
		
		const dribbbleShots = settingProjects?.apis?.dribbble_shots;
		let dribbbleShotsData = []
		if (!empty(dribbbleShots?.api_url)) {
			const result = await fetch(`${dribbbleShots.api_url}?access_token=${dribbbleShots?.access_token}&per_page=100`);
			dribbbleShotsData = await result.json();
		}
		
		return {
			props: {
				projects,
				profile,
				experiences,
				educations,
				certifications,
				skills,
				testimonials,
				services,
				blogs,
				dribbbleShotsData,
				settingSections,
				settingProjects
			},
			revalidate: 60
		}
		
	} catch (e) {
		console.error(e)
		return {
			props: {
				projects: [],
				profile: null,
				experiences: [],
				educations: [],
				certifications: [],
				skills: [],
				services: [],
				blogs: []
			}, // will be passed to the page component as props
		}
	}
}

export default function Home({
	                             projects = [],
	                             profile = null,
	                             experiences,
	                             educations,
	                             certifications,
	                             skills,
	                             testimonials,
	                             services,
	                             blogs,
	                             dribbbleShotsData = [],
	                             settingSections = {},
	                             settingProjects = {}
                             }) {
	
	const [currentTab, setCurrentTab] = useState('about');
	return (
			<HomeContext.Provider value={{state: {currentTab}, setCurrentTab}}>
				<Head key={"main"}>
					<title>{!empty(profile) ? profile.firstName + " " + profile.lastName : process.env.NEXT_PUBLIC_TITLE}</title>
				</Head>
				<Navbar className={"w-100"} showServices={!!services.length}/>
				<main className={main + " nav-bar-spacer"}>
					
					<Profile profile={profile}/>
					
					<div className="container overflow-hidden">
						{
							(
									() => {
										switch (currentTab) {
											case "projects":
												return (
														<ProjectsSection sectionTitle={settingSections?.projects?.title} projects={projects}
														                 settings={settingProjects} dribbbleShots={dribbbleShotsData}/>
												)
											case "services":
												return (
														<>
															{
																services.length ?
																		<ServicesSection services={services}/>
																		: null
															}
														</>
												)
											case "blogs":
												return (
														<>
															<BlogsSection blogs={blogs}></BlogsSection>
														</>
												)
											case "contact":
												return (
														<>
															<Contact email={profile?.email} phone={profile?.phoneCode + profile?.phoneNumber}/>
														</>
												)
											case "about":
											default:
												return (
														<>
															<About profile={profile}/>
															
															<ExperiencesSection className={"border-bottom mb-3"} experiences={experiences}
															                    data-aos-delay={"300"}/>
															
															<EducationsSection className={"border-bottom mb-3"} educations={educations}
															                   data-aos-delay={"400"}/>
															
															<CertificationsSection className={"border-bottom mb-3"} certifications={certifications}/>
															
															<SkillsSection className={"border-bottom mb-3"} skills={skills}/>
															
															{
																testimonials.length ?
																		<TestimonialsSection className={"border-bottom mb-3"} testimonials={testimonials}/>
																		: null
															}
															
															<SectionLayout>
																<button
																		className={"btn bg-olive text-white me-0 me-sm-3 mb-3 mb-sm-0 btn-xs-block btn-pill"}
																		onClick={() => setCurrentTab("contact")}
																>
																	Let's Talk
																</button>
																<a href={profile.cvDownloadLink} download target={"_blank"} rel="noreferrer"
																   className={"btn border-1 border-white btn-xs-block btn-pill border-olive text-olive hover:bg-olive"}>
																	Download my cv
																</a>
															</SectionLayout>
														</>
												)
											
										}
									}
							)()
						}
					</div>
				
				
				</main>
			
			</HomeContext.Provider>
	)
}
