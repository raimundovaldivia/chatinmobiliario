'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../pagination' // Update the path to where your components are located

import { fetchProperties } from '@/lib/query/properties/fetchProperties'

interface Property {
    address: string
}

export function PropertiesTable() {
    const [properties, setProperties] = useState<Property[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('') // State for search input

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const response = await fetchProperties(currentPage, 10, searchQuery)
                const propertiesData: Property[] = response.locations.map((location: string) => ({
                    address: location,
                }))
                setProperties(propertiesData)
                setTotalPages(response.totalPages)
            } catch (error) {
                console.error('Failed to fetch properties:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [currentPage, searchQuery]) // Re-run effect when searchQuery or currentPage changes

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div>
            {/* <div className='flex flex-row items-center gap-2'>
                <div className='w-64'>
                    <Input
                        type='text'
                        placeholder='Search by address'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ marginBottom: '20px', padding: '8px', width: '100%' }} // Basic styling
                    />
                </div>
                <FilterIcon />
            </div> */}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Próxima Visita</TableHead>
                        <TableHead>Consultas</TableHead>
                        <TableHead>Visitas</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                <div className='spinner'>Loading...</div>
                            </TableCell>
                        </TableRow>
                    ) : properties.length > 0 ? (
                        properties.map((property, index) => (
                            <TableRow key={index}>
                                <TableCell>{property.address}</TableCell>
                                <TableCell>/* Próxima Visita Data */</TableCell>
                                <TableCell>/* Consultas Data */</TableCell>
                                <TableCell>/* Visitas Data */</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                No properties found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationPrevious onClick={handlePreviousPage} />
                    {totalPages == currentPage && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationLink>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationLink>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage == 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    <PaginationNext onClick={handleNextPage} />
                </PaginationContent>
            </Pagination>
        </div>
    )
}
