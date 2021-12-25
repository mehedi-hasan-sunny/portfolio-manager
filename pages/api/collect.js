import {errorRes, successRes} from "!/helpers/jsonResponse";

const {user: User, project: Project, image: Image, link: Link, linkCategory: LinkCategory} = require("!/models");

export default async function handler(req, res) {
	
	switch (req.method) {
		
		case "GET": {
			try {
				const profile = await User.findByPk(1, {
					include: [{
						model: Link,
						as: 'links',
						include: [
							{
								model: LinkCategory,
								as: "linkCategory"
							}
						],
					}]
				});
				
				const projects = await Project.findAll(
						{
							include: [
								{
									model: Image,
									where: {
										isThumbnail: false
									},
									order: ['id', "ASC"],
									as: 'images'
								},
								{
									model: Image,
									where: {
										isThumbnail: true
									},
									limit: 1,
									as: 'thumbnail'
								},
								{
									model: Link,
									as: 'links',
									order: ['id', "ASC"],
									include: [
										{
											model: LinkCategory,
											as: "linkCategory"
										}
									],
								}
							],
							order: [
								[
									'id',
									'DESC'
								]
							]
						}
				);
				successRes(res, {profile, projects})
			} catch (err) {
				errorRes(res, err.message)
			}
			break
		}
		
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}
