import { redirect } from 'next/navigation'
import { signUp, confirmSignUp, autoSignIn, resendSignUpCode, signIn, signOut } from 'aws-amplify/auth'
import { TLoginSchema } from './types/LoginSchema'
import { TSignUpSchema } from './types/SignUpSchema'
import { getErrorMessage } from '@/utils/get-error-message'

import { TConfirmSignupSchema } from './types/ConfirmSignupSchema'

export async function handleSignUp(prevState: string | undefined, formData: TSignUpSchema) {
    let success = false
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: String(formData.email),
            password: String(formData.password),
            options: {
                userAttributes: {
                    email: String(formData.email),
                    name: String(formData.name),
                    middle_name: String(formData.surname),
                },
                // optional
                autoSignIn: true,
            },
        })
        success = true
    } catch (error) {
        return getErrorMessage(error)
    } finally {
        if (success) {
            redirect('/auth/confirm-signup')
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
    } catch (error) {
        return getErrorMessage(error)
    } finally {
        if (success) {
            redirect('/dashboard')
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

export async function handleSignOut() {
    let success = false
    try {
        await signOut()
        success = true
    } catch (error) {
        console.log(getErrorMessage(error))
    } finally {
        if (success) {
            redirect('/auth/login')
        }
    }
}
