import { handleSignOut as cognitoSignOut } from '@/lib/cognitoActions'

export async function signOutAll() {
    // Sign out from Cognito
    await cognitoSignOut()

    // Sign out from Google
    const response = await fetch('/auth/google-sign-out', {
        method: 'GET',
    })

    if (response.redirected) {
        window.location.href = response.url
    } else if (!response.ok) {
        const data = await response.json()
        console.error('Google Sign Out Error:', data)
    }
}
