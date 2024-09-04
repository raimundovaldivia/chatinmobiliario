import React from 'react'

type Message = {
    sender: 'user' | 'agent'
    text: string
    time: string
}

interface InboxMessageProps {
    messages: Message[]
    leadId: string
}

const InboxMessage: React.FC<InboxMessageProps> = ({ messages }) => {
    return (
        <div className='flex flex-col justify-center px-28'>
            {messages.map((message, index) => (
                <div key={index} className={`flex w-full ${!message.sender ? 'justify-start' : 'justify-end'} py-5`}>
                    <div
                        className={`w-1/2 px-4 py-2 rounded-lg ${
                            !message.sender ? 'bg-gray-200 text-black' : 'bg-green-600 text-white'
                        }`}
                    >
                        <p>{message.text}</p>
                        <p className='text-xs mt-1'>{message.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InboxMessage
