// components/ui/Sidebar.tsx

import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className='h-full w-64 bg-gray-900 text-white flex flex-col'>
            <div className='p-10'>
                <h1 className='text-3xl font-bold'>Chat Inmobiliario</h1>
            </div>
            <nav className='flex-grow'>
                <ul>
                    <li className='flex items-center p-6 pl-12 hover:bg-gray-700 transition-colors'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='flex items-center p-6 pl-12 hover:bg-gray-700 transition-colors'>
                        <Link href='/about'>About</Link>
                    </li>
                    <li className='flex items-center p-6 pl-12 hover:bg-gray-700 transition-colors'>
                        <Link href='/contact'>Contact</Link>
                    </li>
                </ul>
            </nav>
            <div className='p-6'>
                <button className='w-full flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
