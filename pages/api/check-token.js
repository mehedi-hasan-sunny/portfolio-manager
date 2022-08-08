import {errorRes, successRes} from "../../helpers/jsonResponse";
import {auth} from "../../firebaseDb/firebaseAdmin";

export default async function handler(req, res) {
	
	switch (req.method) {
		case "GET": {
			try {
				const user = await auth.verifyIdToken(req.query.token)
				successRes(user)
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