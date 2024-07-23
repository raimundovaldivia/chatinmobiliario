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
import GoogleIcon from '@/components/icons/GoogleIcon'
import { Separator } from '../separator'
import { AtSign, KeyRound } from 'lucide-react'

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
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='email' placeholder='Tu email' startIcon={AtSign} {...field} />
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
                            <FormControl>
                                <Input type='password' placeholder='Tu contraseña' startIcon={KeyRound} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Google Sign-In Button */}

                <Button size='lg' type='submit' disabled={pending}>
                    {pending ? 'Ingresando...' : 'Ingresar'}
                </Button>
            </form>
        </Form>
    )
}
