'use client'
import 'aws-amplify/auth/enable-oauth-listener'
import { useEffect, useState } from 'react'
import { getCurrentUser } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { fetchGoogleUserAttributes } from '@/lib/fetchGoogleUserAttributes'

export default function AuthCallback() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const [isRouterReady, setIsRouterReady] = useState(false)

    useEffect(() => {
        if (router) {
            setIsRouterReady(true)
        }
    }, [router])

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                await getCurrentUser()

                const formattedData = await fetchGoogleUserAttributes()

                if (!formattedData) {
                    throw new Error('User data is null')
                }

                await fetch('/api/auth/verify-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedData),
                })

                router.push('/dashboard')
            } catch (err) {
                console.error('Error during OAuth callback:', err)
                setError('Authentication failed. Please try again.')
                router.push('/error')
            }
        }

        if (isRouterReady) {
            handleAuthCallback()
        }
    }, [isRouterReady, router])

    return <div></div>
}
