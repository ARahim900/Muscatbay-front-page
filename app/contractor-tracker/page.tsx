'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import ContractorTable from '@/components/contractor-tracker/contractor-table'
import MonthlyChart from '@/components/contractor-tracker/monthly-chart'
import { contractorData } from '@/data/contractor-data'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContractorTracker() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZone, setSelectedZone] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('all')

  // Calculate statistics
  const stats = useMemo(() => {
    const totalContractors = contractorData.length
    const activeContractors = contractorData.filter(c => 
      c.JANUARY > 0 || c.FEBRUARY > 0 || c.MAR > 0 || c.APR > 0 || c.MAY > 0
    ).length
    
    const totalRevenue = contractorData.reduce((sum, c) => {
      return sum + (c.JANUARY || 0) + (c.FEBRUARY || 0) + (c.MAR || 0) + (c.APR || 0) + (c.MAY || 0)
    }, 0)

    const avgPerContractor = totalRevenue / activeContractors

    return {
      totalContractors,
      activeContractors,
      totalRevenue,
      avgPerContractor
    }
  }, [])

  // Filter contractors
  const filteredContractors = useMemo(() => {
    return contractorData.filter(contractor => {
      const matchesSearch = contractor.CUSTOMER_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contractor.ACCOUNT_NUMBER.toString().includes(searchTerm) ||
                          contractor.BADGE_NUMBER.includes(searchTerm)
      
      const matchesZone = selectedZone === 'all' || contractor.ADDRESS.startsWith(selectedZone)
      
      return matchesSearch && matchesZone
    })
  }, [searchTerm, selectedZone])

  // Get unique zones
  const zones = useMemo(() => {
    const zoneSet = new Set(contractorData.map(c => c.ADDRESS.split(' ')[0]))
    return Array.from(zoneSet).sort()
  }, [])

  // Export data
  const handleExport = () => {
    const csv = [
      ['Account Number', 'Customer Name', 'Badge Number', 'Address', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Total'],
      ...filteredContractors.map(c => [
        c.ACCOUNT_NUMBER,
        c.CUSTOMER_NAME,
        c.BADGE_NUMBER,
        c.ADDRESS,
        c.JANUARY || 0,
        c.FEBRUARY || 0,
        c.MAR || 0,
        c.APR || 0,
        c.MAY || 0,
        (c.JANUARY || 0) + (c.FEBRUARY || 0) + (c.MAR || 0) + (c.APR || 0) + (c.MAY || 0)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contractor-data-${new Date().toISOString().split('T')[0]}.csv`
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
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">Contractor Tracker</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContractors}</div>
              <p className="text-xs text-muted-foreground">
                Registered in system
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeContractors}</div>
              <p className="text-xs text-muted-foreground">
                With activity in 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Year to date
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average per Contractor</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.avgPerContractor).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Active contractors only
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Usage Trends</CardTitle>
            <CardDescription>
              Aggregated usage data across all contractors for 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyChart data={contractorData} />
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contractor List</CardTitle>
              <Badge variant="secondary">{filteredContractors.length} contractors</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, account, or badge number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map(zone => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <ContractorTable contractors={filteredContractors} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
