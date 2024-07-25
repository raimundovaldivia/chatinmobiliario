import React from 'react'
import { Separator } from '../separator'
import { Button } from '../button'
import { signInWithGoogle } from '@/lib/authActions'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Hub } from 'aws-amplify/utils'

export default function GoogleLogin({ label }: { label: string }) {
    return (
        <div>
            <Button onClick={signInWithGoogle}>{label}</Button>
            <div className='flex flex-row justify-center items-center my-6'>
                <div className='flex-grow'>
                    <Separator />
                </div>
                <div className='text-gray-400 text-l mx-2'>o</div>
                <div className='flex-grow'>
                    <Separator />
                </div>
            </div>
        </div>
    )
}
