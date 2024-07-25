import { redirect } from 'next/navigation'
import {
    signUp,
    confirmSignUp,
    autoSignIn,
    resendSignUpCode,
    signIn,
    signOut,
    resetPassword,
    confirmResetPassword,
} from 'aws-amplify/auth'
import { TLoginSchema } from './types/LoginSchema'
import { TSignUpSchema } from './types/SignUpSchema'
import { getErrorMessage } from '@/utils/get-error-message'
import { TConfirmSignupSchema } from './types/ConfirmSignupSchema'
import { TResetPasswordSchema } from './types/ResetPasswordSchema'
import { authenticatedUser } from '@/utils/amplify-server-utils'

export async function handleSignUp(prevState: string | undefined, formData: TSignUpSchema) {
    let success = false
    try {
        console.log('Starting sign-up process with formData:', formData)
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: String(formData.email),
            password: String(formData.password),
            options: {
                userAttributes: {
                    email: String(formData.email),
                    name: String(formData.name),
                    middle_name: String(formData.surname),
                },
                autoSignIn: true,
            },
        })
        console.log('Sign-up response received:', { isSignUpComplete, userId, nextStep })
        success = true
    } catch (error) {
        console.error('Sign-up error encountered:', error)
        return getErrorMessage(error)
    } finally {
        if (success) {
            console.log('Sign-up successful, redirecting to confirm-signup page')
            redirect(`/auth/confirm-signup?email=${String(formData.email)}`)
        }
    }
}
export async function handleSendEmailVerificationCode(
    prevState: { message: string; errorMessage: string },
    formData: TConfirmSignupSchema
) {
    let currentState
    try {
        await resendSignUpCode({
            username: String(formData.email),
        })
        currentState = {
            ...prevState,
            message: 'Code sent successfully',
        }
    } catch (error) {
        currentState = {
            ...prevState,
            errorMessage: getErrorMessage(error),
        }
    }

    return currentState
}
export async function handleConfirmSignUp(prevState: string | undefined, formData: TConfirmSignupSchema) {
    let success = false
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: String(formData.email),
            confirmationCode: String(formData.code),
        })
        success = true
        await autoSignIn()
        console.log('autosigin')
    } catch (error) {
        return getErrorMessage(error)
    } finally {
        if (success) {
            redirect('/auth/callback')
        }
    }
}
export async function handleSignIn(prevState: string | undefined, formData: TLoginSchema) {
    let redirectLink = '/dashboard'
    let success = false
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: String(formData.email),
            password: String(formData.password),
        })
        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
            console.log(nextStep.signInStep)
            await resendSignUpCode({
                username: String(formData.email),
            })
            redirectLink = '/auth/confirm-signup'
            success = true
        }
        success = true
    } catch (error) {
        return getErrorMessage(error)
    } finally {
        if (success) {
            console.log('Redirecting to:', redirectLink)
            redirect(redirectLink)
        }
    }
}

export async function handleResetPassword(prevState: string | undefined, email: string) {
    let statues = false
    try {
        await resetPassword({ username: String(email) })
        statues = true
    } catch (error) {
        return getErrorMessage(error)
    } finally {
        if (statues) {
            redirect(`/auth/reset-password/confirm?email=${email}`)
        }
    }
}
export async function handleConfirmResetPassword(prevState: string | undefined, formData: TResetPasswordSchema) {
    try {
        await confirmResetPassword({
            username: String(formData.email),
            confirmationCode: String(formData.code),
            newPassword: String(formData.newPassword),
        })
    } catch (error) {
        return getErrorMessage(error)
    }
    redirect('/auth/login')
}

export async function handleSignOut() {
    let success = false
    try {
        await signOut()
        success = true
    } catch (error) {
        console.log('error')
    } finally {
        if (!success) {
            redirect('/auth/signout')
        }
    }
}
