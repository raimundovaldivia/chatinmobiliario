import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../card'

interface StatsProps {
    lastMessage: string
    phone: string
    onClick: () => void
}

export default function InboxLead({ phone, lastMessage, onClick }: StatsProps) {
    return (
        <button onClick={onClick}>
            <Card className='w-full max-w-sm border shadow-sm rounded-lg text-s '>
                <CardHeader className='flex flex-row items-center justify-between p-4 pb-0'>
                    <CardTitle className='text-base font-semibold'>{phone}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-start p-4 pt-0'>
                    <CardDescription className='text-sm text-gray-500'>{lastMessage}</CardDescription>
                </CardContent>
            </Card>
        </button>
    )
}
