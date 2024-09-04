import TopNavigation from '@/components/ui/topnavigation'

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='flex flex-col'>
            <div className='border-b'>
                <TopNavigation />
            </div>
            <div>
                <main>{children}</main>
            </div>
        </div>
    )
}
