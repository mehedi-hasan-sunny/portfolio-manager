import Head from 'next/head'
import {container, main} from '../styles/Home.module.css'
import Profile from "../components/Profile";
import {useState} from "react";
import db from "../firebaseDb/firebaseAdmin";
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

export async function getStaticProps(context) {
	// const {req, res} = context;
	// console.log("kjhgffghjkljhfghj")
	// setCookie('test', 'value', {req, res, maxAge: 60 * 6 * 24});
	// console.log(getCookie('test'))
	//
	try {
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
		const collectionRef = db.collection("projects");
		const snapshots = await collectionRef.get();
		if (!snapshots.empty) {
			projects = snapshots.docs.map(async project => {
				const linksRef = await db.collection(`projects/${project.id}/links`).get();
				const links = linksRef.docs.map(link => {
					return {id: link.id, ...link.data()}
				})
				
				const imagesRef = await db.collection(`projects/${project.id}/images`).get();
				const images = imagesRef.docs.map(image => {
					return {id: image.id, ...image.data()}
				})
				
				return {id: project.id, ...project.data(), links: links, images: images};
			});
		}
		
		projects = await Promise.all(projects);
		
		
		const docs = ["experiences", "educations", "certifications", "skills", "testimonials", "services"]
		const docRes = async (doc) => {
			const docRef = db.collection(doc);
			const docSnap = await docRef.get();
			if (!docSnap.empty) {
				return docSnap.docs.reverse().map(collection => {
					return {id: collection.id, ...collection.data()};
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
		const {experiences, educations, certifications, skills, testimonials, services} = docResults
		
		
		return {
			props: {projects, profile, experiences, educations, certifications, docResults, skills, testimonials, services},
			revalidate: 60
		}
		
	} catch (e) {
		console.log(e)
		return {
			props: {projects: [], profile: null, experiences: [], educations: [], certifications: [], skills: []}, // will be passed to the page component as props
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
	                             services
                             }) {
	
	const [currentTab, setCurrentTab] = useState('about');
	return (
			<HomeContext.Provider value={{state: {currentTab}, setCurrentTab}}>
				<Head key={"main"}>
					<title>{!empty(profile) ? profile.firstName + " " + profile.lastName : process.env.NEXT_PUBLIC_TITLE}</title>
				</Head>
				<Navbar className={"w-100"}/>
				<main className={main + " nav-bar-spacer"}>
					
					<Profile profile={profile}/>
					
					<div className="container overflow-hidden">
						{
							(
									() => {
										switch (currentTab) {
											case "projects":
												return (
														<>
															<ProjectsSection projects={projects}/>
														</>
												)
											case "services":
												return (
														<>
															<ServicesSection services={services}/>
														</>
												)
											case "blogs":
												return (
														<>
															<div className={"d-flex align-center justify-center"}
															     style={{minHeight: "10rem"}}>
																<h4>Coming Soon</h4>
															</div>
														</>
												)
											case "contact":
												return (
														<>
															<Contact email={profile?.email} phone={profile?.phoneCode+profile?.phoneNumber}/>
														</>
												)
											case "about":
											default:
												return (
														<>
															<About profile={profile}/>
															
															<ExperiencesSection className={"border-bottom mb-3"} experiences={experiences}/>
															
															<EducationsSection className={"border-bottom mb-3"} educations={educations}/>
															
															<CertificationsSection className={"border-bottom mb-3"} certifications={certifications}/>
															
															<SkillsSection className={"border-bottom mb-3"} skills={skills}/>
															
															<TestimonialsSection className={"border-bottom mb-3"} testimonials={testimonials}/>
															
															<SectionLayout>
																<button className={"btn bg-olive text-white me-0 me-sm-3 mb-3 mb-sm-0 btn-xs-block"}>
																	Let's Talk
																</button>
																<button className={"btn bg-cream text-dark btn-xs-block"}>
																	Download my cv
																</button>
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
