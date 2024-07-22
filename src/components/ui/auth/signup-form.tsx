'use client'
import React, { useTransition } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { handleSignUp } from '@/lib/cognitoActions'
import { TSignUpSchema } from '@/lib/types/SignUpSchema'
import { signUpSchema } from '@/lib/schemas/signup'

export default function LoginForm() {
    const [pending, startTransition] = useTransition()
    const form = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values: TSignUpSchema) {
        startTransition(async () => {
            const response = await handleSignUp(undefined, values)
            console.log('Sign-up response:', response)
        })
    }

    return (
        <Form {...form}>
            <form className='flex flex-col justify-between gap-6 min-w-[450px]' onSubmit={form.handleSubmit(onSubmit)}>
                <h1>Chat Inmobiliario</h1>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomber</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='surname'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input type='tex' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size='lg' type='submit' disabled={pending}>
                    {pending ? 'Ingresando...' : 'Enviar'}
                </Button>
            </form>
        </Form>
    )
}
