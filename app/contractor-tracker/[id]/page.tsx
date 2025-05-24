'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, FileText, Calendar, TrendingUp, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { contractorData } from '@/data/contractor-data'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function ContractorDetail() {
  const params = useParams()
  const accountNumber = parseInt(params.id as string)
  
  const contractor = contractorData.find(c => c.ACCOUNT_NUMBER === accountNumber)

  if (!contractor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Contractor Not Found</CardTitle>
            <CardDescription>
              The contractor with account number {accountNumber} was not found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contractor-tracker">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Contractor List
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Prepare monthly data for charts
  const monthlyData = [
    { month: 'Jan', usage: contractor.JANUARY },
    { month: 'Feb', usage: contractor.FEBRUARY },
    { month: 'Mar', usage: contractor.MAR },
    { month: 'Apr', usage: contractor.APR },
    { month: 'May', usage: contractor.MAY },
    { month: 'Jun', usage: contractor.JUNE },
    { month: 'Jul', usage: contractor.JULY },
    { month: 'Aug', usage: contractor.AUGUST },
    { month: 'Sep', usage: contractor.SEPTEMBER },
    { month: 'Oct', usage: contractor.OCTOBER },
    { month: 'Nov', usage: contractor.NOVEMBER },
    { month: 'Dec', usage: contractor.DECEMBER },
  ]

  const totalUsage = monthlyData.reduce((sum, month) => sum + month.usage, 0)
  const avgMonthlyUsage = Math.round(totalUsage / 12)
  const activeMonths = monthlyData.filter(m => m.usage > 0).length

  // Export contractor data
  const handleExport = () => {
    const data = `Contractor Report
================
Account Number: ${contractor.ACCOUNT_NUMBER}
Name: ${contractor.CUSTOMER_NAME}
Badge: ${contractor.BADGE_NUMBER}
Address: ${contractor.ADDRESS}

Monthly Usage:
${monthlyData.map(m => `${m.month}: ${m.usage}`).join('\n')}

Total Usage: ${totalUsage}
Average Monthly: ${avgMonthlyUsage}
Active Months: ${activeMonths}`

    const blob = new Blob([data], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contractor-${contractor.ACCOUNT_NUMBER}-report.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/contractor-tracker" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Contractors</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">Contractor Details</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Contractor Info Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#4E4456] mb-2">
                {contractor.CUSTOMER_NAME}
              </h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Account: {contractor.ACCOUNT_NUMBER}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Badge: {contractor.BADGE_NUMBER}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {contractor.ADDRESS}
                </span>
              </div>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Year to date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgMonthlyUsage.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Months</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeMonths}</div>
              <p className="text-xs text-muted-foreground">Out of 12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={totalUsage > 0 ? 'bg-green-600' : ''}>
                {totalUsage > 0 ? 'Active' : 'Inactive'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Usage Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Analysis</CardTitle>
            <CardDescription>Monthly usage patterns for {contractor.CUSTOMER_NAME}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar" className="w-full">
              <TabsList>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="line">Line Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="bar" className="mt-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#4E4456" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="line" className="mt-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="usage" stroke="#4E4456" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
