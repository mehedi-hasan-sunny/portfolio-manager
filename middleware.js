import { NextResponse } from 'next/server'
import Auth from "./actions/auth";

export async function middleware(request) {
	const token = request.cookies.get('token')
	// const auth = new Auth();
	// const isAuthValid = await auth.isAuthValid(token);
	// console.log(isAuthValid, "isAuthValid")
	// console.log("middleware token", token)
	if (token) {
		return NextResponse.next()
	}
	return redirect(request, "/login", true)
}

function redirect(request, url, redirectFrom = false) {
	const redirectUrl = new URL(url, request.nextUrl)
	if(redirectFrom)
		redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
	return NextResponse.redirect(redirectUrl)
}

export const config = {
	matcher: ["/admin/:path*"]
}