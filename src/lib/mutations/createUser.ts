'use server'

import { API_URL } from '@/utils/constants/globals/apiUrl'
import { TCreateUserSchema } from '@/lib/types/CreateUserSchema'
import { getErrormessage } from '@/utils/functions/get-error-message'

export async function createUser(formData: TCreateUserSchema) {
    try {
        const mutation = `mutation {
            createUser(input: {
                name: "${formData.name}"
                email: "${formData.email}"
            }){
                ok
            }
        }`

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ query: mutation }),
            headers: { 'Content-type': 'application/json' },
        })

        const data = await response.json()

        return {
            ...data,
            name: String(formData.name),
            surname: String(formData.surname),
            email: String(formData.email),
            password: String(formData.password),
            confirmPassword: String(formData.confirmPassword),
        }
    } catch (error) {
        return getErrormessage(error)
    }
}
