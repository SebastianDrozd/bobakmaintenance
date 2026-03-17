import { NextResponse } from "next/server";

 export function proxy(request){
    const hasAuthCookie = !!request.cookies.get("maintenance_auth")?.value;
    const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
    const isLoginRoute = request.nextUrl.pathname.startsWith("/login");

    if(isDashboardRoute && !hasAuthCookie){
        return NextResponse.redirect(new URL("/login",request.url));
    }
    if(isLoginRoute && hasAuthCookie){
        return NextResponse.redirect(new URL("/dashboard",request.url));
    }
    return NextResponse.next();
 }
