import { signInWithRedirect } from 'aws-amplify/auth'

export async function signInWithGoogle() {
    try {
        console.log('paso')
        await signInWithRedirect({
            provider: 'Google',
        })
    } catch (error) {
        console.error('Error signing in with Google:', error)
    }
}
