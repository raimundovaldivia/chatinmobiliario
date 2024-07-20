'use client'
import React from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()

    const handleOnClick = () => {
        console.log('clicked')
        router.push('/auth/signup')
    }

    const handleOnSubmit = () => {}

    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <form className='flex flex-col justify-between gap-8 min-w-[450px]' onSubmit={handleOnSubmit}>
                    <h1>Chat Inmobiliario</h1>
                    <Input label='Email' />
                    <Input label='Contraseña' />
                    <Button size='lg'>Ingresar</Button>
                </form>
                <div className='flex flex-row items-center justify-center pt-4'>
                    <h1 className='text-lg'>No tienes una cuenta?</h1>
                    <Button variant='link' size='lg' onClick={handleOnClick}>
                        Registrate
                    </Button>
                </div>
            </div>
        </div>
    )
}
