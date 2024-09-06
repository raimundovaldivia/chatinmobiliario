import { useEffect, useState } from 'react'

const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        const socket = new WebSocket(url)

        socket.onopen = () => {
            console.log('Connected to WebSocket server')
        }

        socket.onmessage = event => {
            setMessages(prevMessages => [...prevMessages, event.data])
        }

        socket.onerror = error => {
            console.error('WebSocket Error:', error)
        }

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server')
        }

        setWs(socket)

        return () => {
            socket.close()
        }
    }, [url])

    const sendMessage = (message: string) => {
        if (ws) {
            ws.send(message)
        }
    }

    return { messages, sendMessage }
}

export default useWebSocket
