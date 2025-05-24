'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { Contractor } from '@/data/contractor-data'
import Link from 'next/link'

interface ContractorTableProps {
  contractors: Contractor[]
}

export default function ContractorTable({ contractors }: ContractorTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = Math.ceil(contractors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentContractors = contractors.slice(startIndex, endIndex)

  // Calculate total for each contractor
  const getContractorTotal = (contractor: Contractor) => {
    return contractor.JANUARY + contractor.FEBRUARY + contractor.MAR + 
           contractor.APR + contractor.MAY + contractor.JUNE + 
           contractor.JULY + contractor.AUGUST + contractor.SEPTEMBER + 
           contractor.OCTOBER + contractor.NOVEMBER + contractor.DECEMBER
  }

  // Get status badge
  const getStatusBadge = (total: number) => {
    if (total === 0) return <Badge variant="secondary">Inactive</Badge>
    if (total < 100) return <Badge variant="outline">Low Usage</Badge>
    if (total < 500) return <Badge>Active</Badge>
    return <Badge variant="default" className="bg-green-600">High Usage</Badge>
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Badge Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Jan</TableHead>
              <TableHead className="text-right">Feb</TableHead>
              <TableHead className="text-right">Mar</TableHead>
              <TableHead className="text-right">Apr</TableHead>
              <TableHead className="text-right">May</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentContractors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                  No contractors found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              currentContractors.map((contractor) => {
                const total = getContractorTotal(contractor)
                return (
                  <TableRow key={contractor.ACCOUNT_NUMBER}>
                    <TableCell className="font-medium">{contractor.ACCOUNT_NUMBER}</TableCell>
                    <TableCell>{contractor.CUSTOMER_NAME}</TableCell>
                    <TableCell>{contractor.BADGE_NUMBER}</TableCell>
                    <TableCell>{contractor.ADDRESS}</TableCell>
                    <TableCell className="text-right">{contractor.JANUARY || '-'}</TableCell>
                    <TableCell className="text-right">{contractor.FEBRUARY || '-'}</TableCell>
                    <TableCell className="text-right">{contractor.MAR || '-'}</TableCell>
                    <TableCell className="text-right">{contractor.APR || '-'}</TableCell>
                    <TableCell className="text-right">{contractor.MAY || '-'}</TableCell>
                    <TableCell className="text-right font-semibold">{total.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(total)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/contractor-tracker/${contractor.ACCOUNT_NUMBER}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, contractors.length)} of {contractors.length} contractors
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
