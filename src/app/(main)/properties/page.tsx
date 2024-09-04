import ChatIcon from '@/components/icons/ChatIcon'
import FilterIcon from '@/components/icons/FilterIcon'
import NewLeadIcon from '@/components/icons/NewLeadIcon'
import HomeIcon from '@/components/icons/PropertyIcon'
import { Input } from '@/components/ui/input'
import PropertiesPagination from '@/components/ui/properties/PropertiesPagination'
import PropertiesStats from '@/components/ui/properties/PropertiesStats'
import { PropertiesTable } from '@/components/ui/properties/PropertiesTable'

export default function PropertiesPage() {
    return (
        <div className='flex flex-col items-center p-10'>
            <div className='w-full max-w-7xl space-y-5'>
                <div className='flex flex-row justify-center space-x-3'>
                    <PropertiesStats
                        title='Nuevos Leads'
                        description='Ultimas 48 horas'
                        value={10}
                        IconComponent={NewLeadIcon}
                    />
                    <PropertiesStats
                        title='Mensajes'
                        description='Ultimas 48 horas'
                        value={500}
                        IconComponent={ChatIcon}
                    />
                    <PropertiesStats
                        title='Propiedad Más Popular'
                        description='Ultimas 48 horas'
                        value='Presidente Kennedy 7031'
                        IconComponent={HomeIcon}
                    />
                </div>
                <PropertiesTable />
            </div>
        </div>
    )
}
