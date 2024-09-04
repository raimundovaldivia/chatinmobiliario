import React from 'react'
import { Separator } from '../separator'
import { Button } from '../button'
import { signInWithGoogle } from '@/lib/authActions'
import GoogleIcon from '@/components/icons/GoogleIcon'

export default function GoogleLogin({ label }: { label: string }) {
    return (
        <>
            <Button onClick={signInWithGoogle} size='lg' variant='outline' className='w-full border-2 border-gray-300'>
                <div className='flex flex-row items-center gap-4'>
                    <GoogleIcon size={35} />
                    {label}
                </div>
            </Button>
            <div className='flex flex-row justify-center items-center my-6'>
                <div className='flex-grow'>
                    <Separator />
                </div>
                <div className='text-gray-400 text-l mx-2'>o</div>
                <div className='flex-grow'>
                    <Separator />
                </div>
            </div>
        </>
    )
}
