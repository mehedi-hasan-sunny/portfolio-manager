import { NextResponse } from 'next/server'
import Auth from "./actions/auth";

export async function middleware(request) {
	
	const token = request.cookies.get('token')
	// const auth = new Auth();
	// const isAuthValid = await auth.isAuthValid();
	// console.log(isAuthValid, "isAuthValid")
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
	matcher: ["/api/:path*", "/admin/:path*"]
}