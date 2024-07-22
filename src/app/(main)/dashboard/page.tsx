'use client'
import { Button } from '@/components/ui/button'
import { signOutAll } from '@/lib/signOutAll'
import { useTransition } from 'react'

export default function Home() {
    const [pending, startTransition] = useTransition()

    function handleSignOutSubmit() {
        startTransition(async () => {
            await signOutAll()
        })
    }

    return (
        <div>
            <Button onClick={handleSignOutSubmit}>Sign Out</Button>
        </div>
    )
}
