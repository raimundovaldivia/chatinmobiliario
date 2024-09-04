'use server'

import getIdToken from '@/utils/functions/getIdToken'
import { Property } from '@/lib/types/Property'
import { API_URL } from '@/utils/constants/globals/apiUrl'

export async function fetchProperties(page: number = 1, limit: number = 10, searchQuery = '') {
    const idToken = await getIdToken()
    console.log(idToken)

    try {
        const response = await fetch(`${API_URL}/properties?page=${page}&limit=${limit}&searchQuery=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch properties')
        }

        return data
    } catch (error) {
        console.log('Error fetching properties:', error)
        return { properties: [], page: 1, totalPages: 1 }
    }
}
