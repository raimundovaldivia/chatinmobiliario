'use client'
import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleResetPassword } from '@/lib/cognitoActions'

const emailSchema = z.object({
    email: z.string().email({ message: 'Email no valido' }),
})

export default function ResetPasswordForm() {
    const [pending, startTransition] = useTransition()

    const form = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (values: { email: string }) => {
        console.log(values.email)
        startTransition(async () => {
            const response = await handleResetPassword(undefined, values.email)
            console.log('Email verification code response:', response)
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size='lg' type='submit' disabled={pending}>
                    {pending ? 'Enviando...' : 'Enviar'}
                </Button>
            </form>
        </Form>
    )
}
