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
                <Button size='lg' type='submit' disabled={pending}>
                    {pending ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </form>
        </Form>
    )
}
