'use client'
import { Amplify, type ResourcesConfig } from 'aws-amplify'

export const authConfig: ResourcesConfig['Auth'] = {
    Cognito: {
        userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
        userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
        loginWith: {
            oauth: {
                domain: String(process.env.NEXT_PUBLIC_OAUTH_DOMAIN),
                scopes: ['email', 'openid'],
                redirectSignIn: [String(process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN)],
                redirectSignOut: [String(process.env.NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_OUT)],
                responseType: 'code',
            },
        },
    },
}

Amplify.configure(
    {
        Auth: authConfig,
    },
    { ssr: true }
)

export default function AmplifyClientSideConfig() {
    return null
}
