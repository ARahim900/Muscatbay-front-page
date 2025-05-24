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
import { ChevronLeft, ChevronRight, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ElectricityMeter, RATE_PER_KWH } from '@/data/electricity-data'
import Link from 'next/link'

interface ElectricityTableProps {
  meters: ElectricityMeter[]
}

export default function ElectricityTable({ meters }: ElectricityTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = Math.ceil(meters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMeters = meters.slice(startIndex, endIndex)

  // Get trend icon
  const getTrendIcon = (meter: ElectricityMeter) => {
    const current = meter.consumption['April-25']
    const previous = meter.consumption['March-25']
    
    if (current > previous * 1.1) return <TrendingUp className="h-4 w-4 text-red-600" />
    if (current < previous * 0.9) return <TrendingDown className="h-4 w-4 text-green-600" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  // Get consumption level badge
  const getConsumptionBadge = (total: number) => {
    if (total > 50000) return <Badge variant="destructive">Very High</Badge>
    if (total > 20000) return <Badge variant="default" className="bg-orange-600">High</Badge>
    if (total > 10000) return <Badge variant="secondary">Medium</Badge>
    if (total > 1000) return <Badge variant="outline">Low</Badge>
    return <Badge variant="outline" className="text-gray-500">Minimal</Badge>
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account No.</TableHead>
              <TableHead className="text-right">Nov-24</TableHead>
              <TableHead className="text-right">Dec-24</TableHead>
              <TableHead className="text-right">Jan-25</TableHead>
              <TableHead className="text-right">Feb-25</TableHead>
              <TableHead className="text-right">Mar-25</TableHead>
              <TableHead className="text-right">Apr-25</TableHead>
              <TableHead className="text-right">Total (kWh)</TableHead>
              <TableHead className="text-right">Cost (OMR)</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMeters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={15} className="text-center py-8 text-muted-foreground">
                  No meters found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              currentMeters.map((meter) => (
                <TableRow key={meter.id}>
                  <TableCell className="font-medium">{meter.unitNumber}</TableCell>
                  <TableCell>{meter.name}</TableCell>
                  <TableCell>{meter.category}</TableCell>
                  <TableCell>{meter.accountNo}</TableCell>
                  <TableCell className="text-right">{meter.consumption['November-24'].toLocaleString()}</TableCell>
                  <TableCell className="text-right">{meter.consumption['December-24'].toLocaleString()}</TableCell>
                  <TableCell className="text-right">{meter.consumption['January-25'].toLocaleString()}</TableCell>
                  <TableCell className="text-right">{meter.consumption['February-25'].toLocaleString()}</TableCell>
                  <TableCell className="text-right">{meter.consumption['March-25'].toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">{meter.consumption['April-25'].toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold">{meter.totalConsumption.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold">{meter.totalCost.toFixed(2)}</TableCell>
                  <TableCell>{getConsumptionBadge(meter.totalConsumption)}</TableCell>
                  <TableCell>{getTrendIcon(meter)}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/electricity-system/meter/${meter.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, meters.length)} of {meters.length} meters
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
