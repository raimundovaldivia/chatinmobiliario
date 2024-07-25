'use client'
import 'aws-amplify/auth/enable-oauth-listener'
import { useEffect, useState } from 'react'
import { Hub } from 'aws-amplify/utils'
import { AuthUser, getCurrentUser } from 'aws-amplify/auth'
import { LoadingSpinner } from '@/components/ui/spinner'

export default function SignInCallback() {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [customState, setCustomState] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            console.log('Auth event received:', payload.event)
            switch (payload.event) {
                case 'signInWithRedirect':
                    getUser()
                    console.log('User signed in with redirect')
                    break
                case 'signInWithRedirect_failure':
                    setError('An error has occurred during the OAuth flow.')
                    console.error('Sign in with redirect failed')
                    break
                case 'customOAuthState':
                    setCustomState(payload.data) // this is the customState provided on signInWithRedirect function
                    console.log('Custom OAuth state received:', payload.data)
                    break
                default:
                    console.log('Unhandled auth event:', payload.event)
            }
        })

        console.log('Initializing getUser call')
        getUser()

        return () => {
            console.log('Unsubscribing from auth events')
            unsubscribe()
        }
    }, [])

    const getUser = async (): Promise<void> => {
        try {
            console.log('Attempting to get current user')
            const currentUser = await getCurrentUser()
            setUser(currentUser)
            console.log('Current user:', currentUser)
            if (currentUser) {
                window.location.href = '/dashboard'
            }
        } catch (error) {
            console.error('Error getting current user:', error)
            console.log('Not signed in')
        }
    }

    return (
        <div>
            <LoadingSpinner />
        </div>
    )
}
