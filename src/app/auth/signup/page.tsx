import GoogleLogin from '@/components/ui/auth/google-login'
import SignUpForm from '@/components/ui/auth/signup-form'
import Link from 'next/link'
import React from 'react'

export default function SignUp() {
    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                {/* <GoogleLogin label='Registrarse con Google' /> */}
                <SignUpForm />
                <div className='flex flex-row items-center justify-center pt-4'>
                    <h1 className='text-lg'>{'Ya tienes una cuenta?'}</h1>
                    <Link href='/auth/login' className='rounded-lg px-3 text-lg'>
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
