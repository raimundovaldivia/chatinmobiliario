import React from 'react'
import { Button } from '../button'

import { Textarea } from '../textarea'

export default function InboxBottomBar() {
    return (
        <div className='flex flex-row items-center gap-3 p-5'>
            <Textarea />
            <Button size='lg'>Enviar</Button>
        </div>
    )
}
