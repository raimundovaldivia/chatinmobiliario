'use server'

import { cookies } from 'next/headers'

export default async function getIdToken() {
    const cookieStore = cookies()
    const allcookies = await cookieStore.getAll()
    const idTokenCookie = allcookies.find(cookie => cookie.name.includes('.idToken'))
    const idToken = idTokenCookie ? idTokenCookie.value : null
    return idToken
}
