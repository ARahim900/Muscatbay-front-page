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

  // Get facility type badge color
  const getFacilityTypeBadge = (facilityType: string) => {
    const colors: Record<string, string> = {
      'Pumping Stations': 'bg-red-100 text-red-700',
      'Lifting Stations': 'bg-orange-100 text-orange-700',
      'Beach Well': 'bg-blue-100 text-blue-700',
      'Irrigation Tanks': 'bg-cyan-100 text-cyan-700',
      'CIF': 'bg-green-100 text-green-700',
      'MC Street Light FP': 'bg-purple-100 text-purple-700',
      'Common D Building': 'bg-pink-100 text-pink-700',
      'MC Actuator DB': 'bg-violet-100 text-violet-700',
      'Other': 'bg-gray-100 text-gray-700'
    }
    return (
      <Badge variant="outline" className={colors[facilityType] || colors['Other']}>
        {facilityType}
      </Badge>
    )
  }

  return (
    <div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[80px]">Unit</TableHead>
              <TableHead className="min-w-[200px]">Name</TableHead>
              <TableHead className="min-w-[140px]">Facility Type</TableHead>
              <TableHead className="min-w-[120px]">Category</TableHead>
              <TableHead className="min-w-[100px]">Account No.</TableHead>
              <TableHead className="text-right min-w-[80px]">Nov-24</TableHead>
              <TableHead className="text-right min-w-[80px]">Dec-24</TableHead>
              <TableHead className="text-right min-w-[80px]">Jan-25</TableHead>
              <TableHead className="text-right min-w-[80px]">Feb-25</TableHead>
              <TableHead className="text-right min-w-[80px]">Mar-25</TableHead>
              <TableHead className="text-right min-w-[80px]">Apr-25</TableHead>
              <TableHead className="text-right min-w-[100px]">Total (kWh)</TableHead>
              <TableHead className="text-right min-w-[90px]">Cost (OMR)</TableHead>
              <TableHead className="min-w-[100px]">Level</TableHead>
              <TableHead className="min-w-[60px]">Trend</TableHead>
              <TableHead className="text-right min-w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMeters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={16} className="text-center py-8 text-muted-foreground">
                  No meters found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              currentMeters.map((meter) => (
                <TableRow key={meter.id}>
                  <TableCell className="font-medium">{meter.unitNumber}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={meter.name}>
                      {meter.name}
                    </div>
                  </TableCell>
                  <TableCell>{getFacilityTypeBadge(meter.facilityType)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{meter.category}</Badge>
                  </TableCell>
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
