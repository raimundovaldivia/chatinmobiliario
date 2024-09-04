// src/app/api/verify-user/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/mutations/createUser'

export async function POST(request: NextRequest) {
    try {
        const formattedData = await request.json()
        if (!formattedData) {
            throw new Error('User data is null')
        }
        // await createUser(formattedData)
    } catch (error) {
        console.error('Error during authentication:', error)
        return NextResponse.redirect('/error')
    }
}
