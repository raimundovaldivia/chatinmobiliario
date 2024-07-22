'use client'

import React, { useTransition } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TLoginSchema } from '@/lib/types/LoginSchema'
import { loginSchema } from '@/lib/schemas/login'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { handleSignIn } from '@/lib/cognitoActions'
// Import Link from Next.js if needed
import Link from 'next/link'

export default function LoginForm() {
    const [pending, startTransition] = useTransition()
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(values: TLoginSchema) {
        startTransition(async () => {
            const response = await handleSignIn(undefined, values)
            console.log('Sign-in response:', response)
        })
    }

    return (
        <Form {...form}>
            <form className='flex flex-col justify-between gap-8 min-w-[450px]' onSubmit={form.handleSubmit(onSubmit)}>
                <h1>Chat Inmobiliario</h1>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Google Sign-In Button */}

                <Link
                    href='/auth/google-sign-in'
                    className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg'
                >
                    {' '}
                    Ingresa con Google
                    <svg className='w-5 h-5 ml-2' viewBox='0 0 48 48'>
                        <path
                            fill='#4285F4'
                            d='M24 9.5c3.58 0 5.93 1.61 7.3 2.96l5.41-5.41C33.47 4.29 29.08 2 24 2 14.85 2 7.19 7.79 4.1 15.27l6.84 5.31C12.2 16.19 17.61 9.5 24 9.5z'
                        />
                        <path
                            fill='#34A853'
                            d='M46.7 24.14c0-1.41-.12-2.83-.36-4.24H24v8.48h12.82c-.56 3.04-2.25 5.61-4.86 7.38l6.6 5.13C42.69 37.59 46.7 31.44 46.7 24.14z'
                        />
                        <path
                            fill='#FBBC05'
                            d='M10.94 28.47C10.36 26.64 10 24.63 10 22.5c0-2.14.36-4.15.94-6.01L4.1 11.18C1.5 15.76 0 20.97 0 26.5c0 5.53 1.5 10.74 4.1 15.32l6.84-5.31z'
                        />
                        <path
                            fill='#EA4335'
                            d='M24 47c6.48 0 11.89-2.16 15.84-5.83l-6.6-5.13C30.7 38.7 27.6 40 24 40c-6.39 0-11.8-6.69-13.04-12.06l-6.84 5.31C7.19 40.21 14.85 46 24 46z'
                        />
                    </svg>
                </Link>

                <Button size='lg' type='submit' disabled={pending}>
                    {pending ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </form>
        </Form>
    )
}
