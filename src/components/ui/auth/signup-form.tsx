import React from 'react'
import { Button } from '../button'
import { Input } from '../input'

export default function SignUpForm() {
    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <form className='flex flex-col justify-between gap-6 min-w-[450px]'>
                    <h1>Chat Inmobiliario</h1>
                    <Input label='Email' />
                    <Input label='Contraseña' />
                    <Input label='Confirmar Contraseña' />
                    <Button size='lg'>Enviar</Button>
                </form>
            </div>
        </div>
    )
}
