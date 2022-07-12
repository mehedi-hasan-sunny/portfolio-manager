import {errorRes, successRes} from "../../helpers/jsonResponse";
import nodemailer from "nodemailer"
import {empty} from "../../helpers/common";

export default function handler(req, res) {
	
	switch (req.method) {
		case "POST": {
			try {
				if(empty(req.body.name.trim()) || empty(req.body.email.trim()) || empty(req.body.subject.trim()) || empty(req.body.message.trim()) )
				{
					return errorRes(res, "Validation failed.", 422 )
				}
				
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.MAIL_FROM,
						pass: process.env.MAIL_PASSWORD
					}
				});
				
				const html = `<!DOCTYPE html>
					<html lang="en">
						<head>
						    <meta charset="UTF-8">
						    <title>Email</title>
						</head>
						<body>
							<p>${req.body.message}</p>
							<p>
							    <strong>Email by:</strong> ${req.body.name}
							    <br>
							    <strong>Email from:</strong> ${req.body.email}
							</p>
						</body>
					</html>`
				
				transporter.sendMail(
						{
							html: html,
							from: process.env.MAIL_FROM,
							to: process.env.MAIL_TO ?? process.env.MAIL_FROM,
							subject: req.body.subject,
							replyTo: req.body.email
						}, function (err, info) {
							if (err) {
								return errorRes(res, err)
							}
							return successRes(res, {message: "Email sent."})
						}
				)
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