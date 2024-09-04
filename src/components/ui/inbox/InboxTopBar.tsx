import React from 'react'
import Text from '../text'
import { Button } from '../button'
import ChatIcon from '@/components/icons/ChatIcon'
import { Badge } from '../badge'

interface InboxSidebarProps {
    phone: string
}

export default function InboxTopBar({ phone }: InboxSidebarProps) {
    return (
        <div className='flex flex-col w-full px-10 py-3'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-2'>
                    <Text size='xl' weight='regular'>
                        {phone}
                    </Text>
                    <ChatIcon />
                </div>
                <div className='flex items-center space-x-4'>
                    <Button variant='link'>Ver detalles propiedad</Button>
                    <Button variant='link'>Agendar visita</Button>
                </div>
            </div>
        </div>
    )
}
