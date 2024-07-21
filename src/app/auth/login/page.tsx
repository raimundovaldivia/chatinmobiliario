'use client'
import LoginForm from '@/components/ui/auth/login-form'
import { Button } from '@/components/ui/button'
import { handleSignOut } from '@/lib/cognitoActions'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    function onSubmit() {
        return handleSignOut()
    }
    return (
        <div className='flex justify-center'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <LoginForm />{' '}
                <div className='flex flex-row justify-center pt-5'>
                    <Link href='/auth/login' className='rounded-lg text-m text-black'>
                        Olvidaste tu Contraseña?
                    </Link>
                </div>{' '}
                <div className='flex flex-row justify-center pt-5'>
                    <h1 className='text-m'>{'No tienes una cuenta?'}</h1>
                    <Link href='/auth/signup' className='rounded-lg px-3 text-m text-black'>
                        Registrate
                    </Link>
                </div>
                <Button onClick={onSubmit}>Log Out</Button>
            </div>
        </div>
    )
}
