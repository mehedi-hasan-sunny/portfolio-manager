import db from "../../../../firebaseDb/firebaseAdmin";

import {errorRes, successRes} from "!/helpers/jsonResponse";

export default async function handler(req, res) {
	try {
		switch (req.method) {
			case "GET": {
				const experienceCollectionRef = db.collection("experience");
				const experienceSnap = await experienceCollectionRef.get();
				let experience = []
				if (!experienceSnap.empty) {
					experience = experienceSnap.docs.map(async experience => {
						return {id: experience.id, ...experience.data()};
					});
					experience = await Promise.all(experience)
				}
				successRes(res, experience)
				
				break
			}
			case "POST": {
				const experienceCollectionRef = db.collection("experience");
				let experience = await experienceCollectionRef.add({
					jobTitle: req.body.jobTitle.trim(),
					company: req.body.company.trim(),
					startDate: req.body.startDate,
					endDate: req.body.endDate,
					isPresent: req.body.isPresent,
					description: req.body.description.trim(),
				});
				experience = await experience.get()
				successRes(res, experience.exists ? {experience: {id: experience.id, ...experience.data()}} : null)
				
				break
			}
			default : {
				errorRes(res, `Method '${req.method}' Not Allowed`, 405)
			}
		}
	} catch (err) {
		errorRes(res, err.message)
	}
	
}
