'use client'
import { Button } from '@/components/ui/button'
import { handleSignOut } from '@/lib/cognitoActions'
import React, { useTransition } from 'react'

export default function page() {
    const [pending, startTransition] = useTransition()

    function onSubmit() {
        startTransition(async () => {
            const response = await handleSignOut()
            console.log('SignOut response:', response)
        })
    }
    return <Button onClick={onSubmit}>Log Out</Button>
}
