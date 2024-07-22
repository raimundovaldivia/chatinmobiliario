import { NextRequest, NextResponse } from 'next/server'
import { authenticatedUser } from '@/utils/amplify-server-utils'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const user = await authenticatedUser({ request, response })
    const isOnIndex = request.nextUrl.pathname === '/'
    const isOnAuth = request.nextUrl.pathname.startsWith('/auth')
    const isOnSignOut = request.nextUrl.pathname === '/auth/google-sign-out'

    if (isOnSignOut) {
        // Bypass middleware for sign-out route
        return response
    }

    if (isOnIndex) {
        if (!user) return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isOnAuth) {
        if (!user) return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        return response
    } else if (user) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
