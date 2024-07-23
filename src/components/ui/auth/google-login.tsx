import React from 'react'
import Link from 'next/link'
import GoogleIcon from '@/components/icons/GoogleIcon'
import { Separator } from '../separator'

export default function GoogleLogin({ label }: { label: string }) {
    return (
        <div>
            <Link
                href='/auth/google-sign-in'
                className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg'
            >
                {' '}
                <div className='pr-4'>
                    <GoogleIcon size={30} />
                </div>
                {label}
            </Link>
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
