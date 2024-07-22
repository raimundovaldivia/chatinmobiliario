'use client'
import { Button } from '@/components/ui/button'
import { handleSignOut } from '@/lib/cognitoActions'
import Link from 'next/link'
import { useTransition } from 'react'

export default function Home() {
    const [pending, startTransition] = useTransition()
    function handleSignOutSubmit() {
        const initialState = { message: '', errorMessage: '' }
        startTransition(async () => {
            const response = await handleSignOut()
        })
    }

    return (
        <div>
            <Button onClick={handleSignOutSubmit}>Sign Out </Button>
            <form action='/auth/signout' method='GET'>
                <Link href='/auth/signout'>
                    <button type='submit' className='underline text-sm text-gray-600 hover:text-gray-500'>
                        Signout Gmail
                    </button>
                </Link>
            </form>
        </div>
    )
}
