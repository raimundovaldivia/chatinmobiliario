import { fetchAuthSession } from 'aws-amplify/auth'

export async function fetchGoogleUserAttributes() {
    try {
        const attributes = await (await fetchAuthSession()).tokens?.idToken?.payload

        if (!attributes) {
            throw new Error('No user attributes found')
        }

        const email = String(attributes.email || '')
        const surname =
            typeof attributes.family_name === 'string' ? attributes.family_name : String(attributes.family_name || '')
        let name = typeof attributes.name === 'string' ? attributes.name : String(attributes.name || '')

        if (typeof name === 'string' && typeof surname === 'string') {
            name = name.replace(surname, '').trim()
        }

        const formattedData = {
            email: email,
            name: name,
            surname: surname,
            password: '',
            confirmPassword: '',
        }

        return formattedData
    } catch (error) {
        console.error('Error fetching user attributes:', error)
        return null
    }
}
