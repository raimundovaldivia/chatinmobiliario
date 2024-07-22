// app/api/auth/callback/route.ts

import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import 'aws-amplify/auth/enable-oauth-listener'

const { GOOGLE_COGNITO_DOMAIN, GOOGLE_COGNITO_CLIENT_ID, GOOGLE_COGNITO_APP_CLIENT_SECRET } = process.env

export async function GET(request: NextRequest) {
    try {
        console.log('GET request received')
        const origin = request.nextUrl.origin
        const searchParams = request.nextUrl.searchParams
        const code = searchParams.get('code')

        if (!code) {
            const error = searchParams.get('error')
            console.log('Error: No code provided,', error)
            return NextResponse.json({ error: error || 'Unknown error' })
        }

        console.log('Authorization code received:', code)

        const authorizationHeader = `Basic ${Buffer.from(
            `${GOOGLE_COGNITO_CLIENT_ID}:${GOOGLE_COGNITO_APP_CLIENT_SECRET}`
        ).toString('base64')}`

        console.log('Authorization header generated:', authorizationHeader)

        const requestBody = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: GOOGLE_COGNITO_CLIENT_ID as string,
            code: code,
            redirect_uri: `${origin}/auth/callback`,
        })

        console.log('Request body for token:', requestBody.toString())

        // Get tokens
        const res = await fetch(`${GOOGLE_COGNITO_DOMAIN}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: authorizationHeader,
            },
            body: requestBody,
        })

        const data = await res.json()

        console.log('Response from token endpoint:', data)

        if (!res.ok) {
            console.log('Error fetching tokens:', data)
            return NextResponse.json({
                error: data.error,
                error_description: data.error_description,
            })
        }

        console.log('Tokens received:', data)

        // Store tokens in cookies
        const cookieStore = cookies()
        cookieStore.set('id_token', data.id_token)
        cookieStore.set('access_token', data.access_token)
        cookieStore.set('refresh_token', data.refresh_token)

        console.log('Tokens stored in cookies')

        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    } catch (error) {
        console.log('Error during callback processing:', error)
        return NextResponse.json({ error })
    }
}
