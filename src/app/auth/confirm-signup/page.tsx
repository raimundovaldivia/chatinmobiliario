import ConfirmSignUpForm from '@/components/ui/auth/confirm-signup-form'
import React from 'react'

export default function ConfirmSignUp() {
    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <ConfirmSignUpForm />
            </div>
        </div>
    )
}
