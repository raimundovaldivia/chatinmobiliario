import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from '../card'

interface StatsProps {
    title: string
    value: number | string
    description: string
    IconComponent: React.ComponentType
}

const PropertiesStats: React.FC<StatsProps> = ({ title, value, description, IconComponent }) => {
    return (
        <Card className='w-full border shadow-sm rounded-lg p-5'>
            <CardHeader className='flex flex-row items-center justify-between p-4'>
                <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
                <IconComponent />
            </CardHeader>
            <CardContent className='flex flex-col items-start p-4 pt-0'>
                <p className='text-2xl font-bold'>{value}</p>
                <CardDescription className='text-sm text-gray-500'>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default PropertiesStats
