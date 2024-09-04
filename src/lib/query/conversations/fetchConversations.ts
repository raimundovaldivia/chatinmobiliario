'use server'

import getIdToken from '@/utils/functions/getIdToken'
import { API_URL } from '@/utils/constants/globals/apiUrl'

export async function fetchConversations(id: string, page: number = 1, limit: number = 10) {
    const idToken = await getIdToken()
    console.log(idToken)
    console.log(id)

    try {
        const response = await fetch(`${API_URL}/conversations/${id}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch conversations')
        }

        return data
    } catch (error) {
        console.error('Error fetching conversations:', error)
        return { conversations: [], page: 1, totalPages: 1, totalConversations: 0 }
    }
}
