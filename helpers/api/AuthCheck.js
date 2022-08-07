import {auth} from "../../firebaseDb/firebaseAdmin";
import {empty} from "../common";
import {errorRes} from "../jsonResponse";

export const ValidateToken = async ({req, res}) => {
	if (req?.headers?.token) {
		try{
			const user = await auth.verifyIdToken(req.headers.token);
			if (empty(user?.uid)) {
				return errorRes(res, "Unauthorized", 401)
			}
			else if(user?.errorInfo){
				return errorRes(res, user?.errorInfo.message, 401)
			}
			return true;
		}
		catch (e) {
			return errorRes(res, e.errorInfo.message, 403)
		}
	} else {
		return errorRes(res, "Unauthorized", 401)
	}
}