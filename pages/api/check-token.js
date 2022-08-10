import {errorRes, successRes} from "../../helpers/jsonResponse";
import {auth} from "../../config/firebaseAdmin";

export default async function handler(req, res) {
	
	switch (req.method) {
		case "GET": {
			try {
				const user = await auth.verifyIdToken(req.query.token)
				successRes(res, {user})
			} catch (err) {
				errorRes(res, err.message, 401)
			}
			break
		}
		
		default : {
			errorRes(res, `Method '${req.method}' Not Allowed`, 405)
		}
	}
}