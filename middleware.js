import { NextResponse } from 'next/server'

export async function middleware(request, event) {
	const token = request.cookies.get('token')
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