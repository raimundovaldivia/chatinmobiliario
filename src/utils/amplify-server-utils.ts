import { authConfig } from '@/app/amplify-cognito-config'
import { NextServer, createServerRunner } from '@aws-amplify/adapter-nextjs'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server'
import { cookies } from 'next/headers'

export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: authConfig,
    },
})

export async function authenticatedUser(context: NextServer.Context) {
    const cookieStore = cookies()
    return await runWithAmplifyServerContext({
        nextServerContext: context,
        operation: async contextSpec => {
            try {
                //if access token exist user = cookies if not pass
                const cookies = await cookieStore.get('access_token')

                if (cookies) {
                    const user = cookies
                    return user
                }

                // Fetch the user information using the access token
                const session = await fetchAuthSession(contextSpec)
                if (!session.tokens) {
                    return null
                }

                const user = {
                    ...(await getCurrentUser(contextSpec)),
                    isAdmin: false,
                }
                const groups = session.tokens.accessToken.payload['cognito:groups']
                user.isAdmin = Boolean(groups)

                return user
            } catch (error) {
                console.log(error)
                return null
            }
        },
    })
}
