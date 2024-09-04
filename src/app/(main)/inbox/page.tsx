'use client'
import React, { useState, useEffect, useTransition } from 'react'
import InboxBottomBar from '@/components/ui/inbox/InboxBottomBar'
import InboxMessage from '@/components/ui/inbox/InboxMessage'
import InboxTopBar from '@/components/ui/inbox/InboxTopBar'
import InboxSidebar from '@/components/ui/inbox/InboxSideBar'
import { fetchConversations } from '@/lib/query/conversations/fetchConversations'

const InboxPage = () => {
    const [phone, setPhone] = useState('')
    const [leadId, setLeadId] = useState('')
    const [leadMessages, setLeadMessages] = useState([])
    const [isPending, startTransition] = useTransition() // Using useTransition
    // console.log(leadMessages)

    useEffect(() => {
        if (leadId) {
            startTransition(async () => {
                const data = await fetchConversations(leadId) // Fetch the conversations

                if (data.conversations) {
                    const messages = data.conversations.map((conversation: any) => ({
                        sender: conversation.lead_message,
                        text: conversation.message,
                        time: new Date(conversation.sent_at).toLocaleString(),
                    }))
                    setLeadMessages(messages)
                }
            })
        }
    }, [leadId])

    return (
        <div className='flex'>
            <div className='border-r p-2'>
                <InboxSidebar setLeadId={setLeadId} setPhone={setPhone} />
            </div>
            <div className='flex flex-col'>
                <div className='border-b'>
                    <InboxTopBar phone={phone} />
                </div>
                <div className='flex-grow overflow-y-auto h-[380px]'>
                    {isPending ? <div>Loading conversations...</div> : <InboxMessage messages={leadMessages} />}
                </div>
                <div className='border-t m-1 pb-5'>
                    <InboxBottomBar />
                </div>
            </div>
        </div>
    )
}

export default InboxPage
