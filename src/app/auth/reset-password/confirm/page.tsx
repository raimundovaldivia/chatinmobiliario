import ConfirmResetPasswordForm from '@/components/ui/auth/reset-password/confirm'
import React from 'react'

export default function ConfirmResetPassword() {
    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='m-0 absolute top-1/2 transform -translate-y-1/2'>
                <ConfirmResetPasswordForm />
            </div>
        </div>
    )
}
