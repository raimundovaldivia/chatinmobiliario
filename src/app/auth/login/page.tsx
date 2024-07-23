'use client'
import GoogleLogin from '@/components/ui/auth/google-login'
import LoginForm from '@/components/ui/auth/login-form'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        <div className='flex justify-center'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <GoogleLogin label='Ingresar con Google' />
                <LoginForm />
                <div className='flex flex-row justify-center pt-5'>
                    <Link href='/auth/reset-password/submit' className='rounded-lg text-m text-black'>
                        Olvidaste tu Contraseña?
                    </Link>
                </div>{' '}
                <div className='flex flex-row justify-center pt-5'>
                    <h1 className='text-m'>{'No tienes una cuenta?'}</h1>
                    <Link href='/auth/signup' className='rounded-lg px-3 text-m text-black'>
                        Registrate
                    </Link>
                </div>
            </div>
        </div>
    )
}
