import React, { useEffect, useState } from 'react'
import InboxLead from './sidebar/InboxLead'
import { Button } from '../button'
import FilterIcon from '@/components/icons/FilterIcon'
import { Input } from '../input'
import Text from '../text'
import { fetchLeads } from '@/lib/query/leads/fetchLeads' // Import your fetchLeads function
import { measureMemory } from 'vm'

interface InboxSidebarProps {
    setPhone: React.Dispatch<React.SetStateAction<string>> // Type for setPhone
    setLeadId: React.Dispatch<React.SetStateAction<string>>
}

export default function InboxSidebar({ setPhone, setLeadId }: InboxSidebarProps) {
    const [inboxMessages, setInboxMessages] = useState<{ phone: string; lastMessage: string; id: string }[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLeads() {
            setLoading(true)
            const data = await fetchLeads(1, 10, searchQuery) // Fetch the leads
            const leads = data.leads.map((lead: any) => ({
                id: lead.id,
                phone: lead.phone,
                lastMessage:
                    lead.conversations.length > 0
                        ? new Date(lead.conversations[0].sent_at).toLocaleString()
                        : 'No messages',
            }))
            setInboxMessages(leads)
            setLoading(false)
        }

        loadLeads() // Load leads when the component mounts or searchQuery changes
    }, [searchQuery])

    return (
        <div className='flex flex-col gap-3 py-3 h-[660px]'>
            <div className='flex flex-row items-center justify-between px-3'>
                <Text as='h1' size='xl' weight='bold'>
                    Inbox
                </Text>

                <div className='flex space-x-2 '>
                    <Button variant='outline' className='border rounded-lg'>
                        Tus mensajes
                    </Button>
                    <Button variant='outline' className='border rounded-lg'>
                        Mensaje AI
                    </Button>
                </div>
            </div>

            <div className='flex flex-row items-center px-3'>
                <Input
                    placeholder='Filtrar propiedad...'
                    className='flex-grow'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div className='px-5'>
                    <FilterIcon />
                </div>
            </div>

            <div className='flex flex-col gap-2 overflow-y-auto max-h-[620px]'>
                {loading ? (
                    <Text>Loading...</Text>
                ) : inboxMessages.length > 0 ? (
                    inboxMessages.map(message => (
                        <InboxLead
                            key={message.id}
                            phone={message.phone}
                            lastMessage={message.lastMessage}
                            onClick={() => {
                                setPhone(message.phone)
                                setLeadId(message.id)
                            }} // Set the phone and lead ID when clicked
                        />
                    ))
                ) : (
                    <Text>No leads found.</Text>
                )}
            </div>
        </div>
    )
}
