'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Download, Droplets, AlertTriangle, CheckCircle, Activity } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import STPReportsTable from '@/components/stp-plant/stp-reports-table'
import PerformanceChart from '@/components/stp-plant/performance-chart'
import EquipmentStatus from '@/components/stp-plant/equipment-status'
import { stpReportsData } from '@/data/stp-reports-data'

export default function STPPlant() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('all')

  // Calculate statistics
  const stats = useMemo(() => {
    const totalReports = stpReportsData.length
    const totalTreatedWater = stpReportsData.reduce((sum, r) => 
      sum + (r.totalTreatedWater || 0), 0
    )
    const totalIrrigationOutput = stpReportsData.reduce((sum, r) => 
      sum + (r.irrigationOutput || 0), 0
    )
    const avgDailyProduction = Math.round(totalTreatedWater / totalReports)
    
    // Check for issues
    const reportsWithIssues = stpReportsData.filter(r => 
      r.leaksOrSpills || r.unusualOdors || r.safetyHazards
    ).length

    return {
      totalReports,
      totalTreatedWater,
      totalIrrigationOutput,
      avgDailyProduction,
      reportsWithIssues,
      operationalEfficiency: Math.round((totalIrrigationOutput / totalTreatedWater) * 100)
    }
  }, [])

  // Filter reports
  const filteredReports = useMemo(() => {
    return stpReportsData.filter(report => {
      const matchesSearch = 
        report.preparedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.date.includes(searchTerm)
      
      if (selectedMonth === 'all') return matchesSearch
      
      const reportMonth = report.date.split('/')[1]
      return matchesSearch && reportMonth === selectedMonth
    })
  }, [searchTerm, selectedMonth])

  // Export data
  const handleExport = () => {
    const headers = [
      'Date', 'Prepared By', 'Total Treated Water', 'Irrigation Output', 
      'Inlet Sewage', 'Tankers', 'Issues'
    ]
    
    const rows = filteredReports.map(r => [
      r.date,
      r.preparedBy,
      r.totalTreatedWater,
      r.irrigationOutput,
      r.inletSewage,
      r.tankers,
      (r.leaksOrSpills || r.unusualOdors || r.safetyHazards) ? 'Yes' : 'No'
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stp-reports-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">STP Plant Management</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
              <p className="text-xs text-muted-foreground">Daily reports</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Treated</CardTitle>
              <Droplets className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTreatedWater.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">m³ water treated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Irrigation Output</CardTitle>
              <Droplets className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIrrigationOutput.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">m³ to irrigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgDailyProduction}</div>
              <p className="text-xs text-muted-foreground">m³ per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.operationalEfficiency}%</div>
              <p className="text-xs text-muted-foreground">Output/Input ratio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Reported</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reportsWithIssues}</div>
              <p className="text-xs text-muted-foreground">Reports with issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Daily Reports</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Status</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Production Trend</CardTitle>
                  <CardDescription>
                    Water treatment production over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart data={stpReportsData} type="weekly" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Equipment Status</CardTitle>
                  <CardDescription>
                    Latest equipment operational status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EquipmentStatus reports={stpReportsData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Daily Operation Reports</CardTitle>
                  <Badge variant="secondary">{filteredReports.length} reports</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by operator or date..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button onClick={handleExport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <STPReportsTable reports={filteredReports} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <EquipmentStatus reports={stpReportsData} detailed={true} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Monthly production and efficiency trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={stpReportsData} type="monthly" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
