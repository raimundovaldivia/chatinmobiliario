import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const cookieStore = cookies()

    const refreshTokenExists = cookieStore.has('refresh_token')
    console.log('refreshTokenExists:', refreshTokenExists)

    if (!refreshTokenExists) {
        console.log('Redirecting to /auth/login due to missing refresh token')
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    // Assume token exists for simplicity
    const token = cookieStore.get('refresh_token')
    console.log('Token:', token?.value)

    // Mocking response for simplification
    console.log('Revoking token...')
    const response = { ok: true } // Mocked response

    if (!response.ok) {
        console.log('Error response from revoke')
        return NextResponse.json({
            error: 'error',
            error_description: 'error_description',
        })
    }

    if (response.ok) {
        console.log('Revoke successful, deleting cookies')
        cookieStore.delete('id_token')
        cookieStore.delete('access_token')
        cookieStore.delete('refresh_token')

        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }
}
