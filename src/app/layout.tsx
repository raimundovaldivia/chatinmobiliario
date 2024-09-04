import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AmplifyClientSideConfig from '@/app/amplify-cognito-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Chat Inmobiliario',
    description: 'Chat Inmobiliario',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased overflow-y-hidden`}>
                <>
                    <AmplifyClientSideConfig />
                    {children}
                </>
            </body>
        </html>
    )
}
