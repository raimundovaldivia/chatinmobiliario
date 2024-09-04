// components/ui/TopNavigation.tsx

import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { Button } from './button'
import ProfileIcon from '../icons/ProfileIcon'
import LogoutIcon from '../icons/LogoutIcon'
import { Input } from './input'

const TopNavigation = () => {
    return (
        <>
            <div className='flex flex-row pl-28 pr-10 text-l items-center justify-between border-b sticky top-0'>
                <div className='flex justify-between items-center'>
                    <div id='logo'>Chat Inmobiliario</div>
                    <NavigationMenu className='ml-6'>
                        <NavigationMenuList className='justify-center space-x-8 p-4 w-full transition-colors hover:text-foreground/80 text-foreground/60'>
                            <NavigationMenuItem>
                                <Link href='/properties' passHref>
                                    <NavigationMenuLink>Propiedades</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href='/inbox' passHref>
                                    <NavigationMenuLink>Chats</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href='/calendar' passHref>
                                    <NavigationMenuLink>Agenda</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className='flex  flex-row'>
                    <Input />
                    <Button variant='link'>
                        <ProfileIcon />
                    </Button>
                    <Button variant='link'>
                        <LogoutIcon />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TopNavigation
