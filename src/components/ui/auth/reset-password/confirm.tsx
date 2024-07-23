'use client'
import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleConfirmResetPassword } from '@/lib/cognitoActions'
import { TResetPasswordSchema } from '@/lib/types/ResetPasswordSchema'
import { resetPasswordSchema } from '@/lib/schemas/reset-password'
import { useSearchParams } from 'next/navigation'

export default function ConfirmResetPasswordForm() {
    const [pending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const form = useForm<TResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: email || '',
            code: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (values: TResetPasswordSchema) => {
        startTransition(async () => {
            const response = await handleConfirmResetPassword(undefined, values)
            console.log('Confirm sign-up response:', response)
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
                <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva Contraseña</FormLabel>
                            <FormControl>
                                <div>
                                    <Input type='password' {...field} />
                                </div>
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
                                <div>
                                    <Input type='password' {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='code'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Codigo</FormLabel>
                            <FormControl>
                                <div>
                                    <Input type='text' {...field} />
                                </div>
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
