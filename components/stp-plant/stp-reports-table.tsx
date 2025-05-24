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
import { ChevronLeft, ChevronRight, Eye, AlertTriangle, CheckCircle } from 'lucide-react'
import { STPReport } from '@/data/stp-reports-data'
import Link from 'next/link'

interface STPReportsTableProps {
  reports: STPReport[]
}

export default function STPReportsTable({ reports }: STPReportsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = Math.ceil(reports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReports = reports.slice(startIndex, endIndex)

  // Get efficiency percentage
  const getEfficiency = (report: STPReport) => {
    if (report.totalTreatedWater === 0) return 0
    return Math.round((report.irrigationOutput / report.totalTreatedWater) * 100)
  }

  // Get status badge
  const getStatusBadge = (report: STPReport) => {
    const hasIssues = report.leaksOrSpills || report.unusualOdors || report.safetyHazards
    const efficiency = getEfficiency(report)
    
    if (hasIssues) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Issues
      </Badge>
    }
    
    if (efficiency >= 90) {
      return <Badge variant="default" className="bg-green-600 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Optimal
      </Badge>
    }
    
    if (efficiency >= 80) {
      return <Badge variant="secondary">Normal</Badge>
    }
    
    return <Badge variant="outline">Low Efficiency</Badge>
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead className="text-right">Treated (m³)</TableHead>
              <TableHead className="text-right">Irrigation (m³)</TableHead>
              <TableHead className="text-right">Inlet (m³)</TableHead>
              <TableHead className="text-right">Tankers</TableHead>
              <TableHead className="text-right">Efficiency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  No reports found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              currentReports.map((report) => {
                const efficiency = getEfficiency(report)
                return (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.date}</TableCell>
                    <TableCell>{report.preparedBy}</TableCell>
                    <TableCell className="text-right">{report.totalTreatedWater}</TableCell>
                    <TableCell className="text-right">{report.irrigationOutput}</TableCell>
                    <TableCell className="text-right">{report.inletSewage}</TableCell>
                    <TableCell className="text-right">{report.tankers}</TableCell>
                    <TableCell className="text-right">
                      <span className={efficiency >= 90 ? 'text-green-600 font-semibold' : ''}>
                        {efficiency}%
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(report)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {report.leaksOrSpills && (
                          <Badge variant="outline" className="text-xs">Leak</Badge>
                        )}
                        {report.unusualOdors && (
                          <Badge variant="outline" className="text-xs">Odor</Badge>
                        )}
                        {report.safetyHazards && (
                          <Badge variant="outline" className="text-xs">Safety</Badge>
                        )}
                        {!report.leaksOrSpills && !report.unusualOdors && !report.safetyHazards && (
                          <span className="text-muted-foreground text-xs">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/stp-plant/report/${report.id}`}>
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
            Showing {startIndex + 1} to {Math.min(endIndex, reports.length)} of {reports.length} reports
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
