'use client'
import React, { useTransition } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { TConfirmSignupSchema } from '@/lib/types/ConfirmSignupSchema'
import { confirmSignupSchema } from '@/lib/schemas/confirm-signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleConfirmSignUp, handleSendEmailVerificationCode } from '@/lib/cognitoActions'
import { useSearchParams } from 'next/navigation'

export default function ConfirmSignUpForm() {
    const [pending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const form = useForm<TConfirmSignupSchema>({
        resolver: zodResolver(confirmSignupSchema),
        defaultValues: {
            email: email || '',
            code: '',
        },
    })

    const onSubmit = (values: TConfirmSignupSchema) => {
        startTransition(async () => {
            const response = await handleConfirmSignUp(undefined, values)
            console.log('Confirm sign-up response:', response)
        })
    }

    function handleSendConfirmationCode() {
        const values = form.getValues()
        const initialState = { message: '', errorMessage: '' }
        console.log(values.email)
        startTransition(async () => {
            const response = await handleSendEmailVerificationCode(initialState, values)
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
                <FormField
                    control={form.control}
                    name='code'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Codigo</FormLabel>
                            <FormControl>
                                <div className='flex space-x-2  w-full'>
                                    <div className='grow'>
                                        <Input type='text' {...field} />
                                    </div>

                                    <div className='flex-none'>
                                        <Button
                                            disabled={pending}
                                            variant='outline'
                                            onClick={handleSendConfirmationCode}
                                        >
                                            {pending ? 'Enviando...' : 'Reenviar'}
                                        </Button>
                                    </div>
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
