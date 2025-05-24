'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, Zap, TrendingUp, Home, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { electricityData, RATE_PER_KWH } from '@/data/electricity-data'
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

export default function MeterDetail() {
  const params = useParams()
  const meterId = parseInt(params.id as string)
  
  const meter = electricityData.find(m => m.id === meterId)

  if (!meter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Meter Not Found</CardTitle>
            <CardDescription>
              The meter with ID {meterId} was not found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/electricity-system">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Electricity System
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Prepare monthly data for charts
  const monthlyData = [
    { month: 'Nov', consumption: meter.consumption['November-24'], cost: meter.consumption['November-24'] * RATE_PER_KWH },
    { month: 'Dec', consumption: meter.consumption['December-24'], cost: meter.consumption['December-24'] * RATE_PER_KWH },
    { month: 'Jan', consumption: meter.consumption['January-25'], cost: meter.consumption['January-25'] * RATE_PER_KWH },
    { month: 'Feb', consumption: meter.consumption['February-25'], cost: meter.consumption['February-25'] * RATE_PER_KWH },
    { month: 'Mar', consumption: meter.consumption['March-25'], cost: meter.consumption['March-25'] * RATE_PER_KWH },
    { month: 'Apr', consumption: meter.consumption['April-25'], cost: meter.consumption['April-25'] * RATE_PER_KWH },
  ]

  const avgMonthlyConsumption = Math.round(meter.totalConsumption / 6)
  const avgMonthlyCost = meter.totalCost / 6

  // Calculate growth
  const growth = ((meter.consumption['April-25'] - meter.consumption['March-25']) / meter.consumption['March-25'] * 100).toFixed(1)

  // Export data
  const handleExport = () => {
    const data = `Electricity Meter Report
========================
Meter Details
-------------
Name: ${meter.name}
Unit Number: ${meter.unitNumber}
Account Number: ${meter.accountNo}
Category: ${meter.category}
Zone: ${meter.zone}

Monthly Consumption (kWh)
-------------------------
November 2024: ${meter.consumption['November-24'].toLocaleString()}
December 2024: ${meter.consumption['December-24'].toLocaleString()}
January 2025: ${meter.consumption['January-25'].toLocaleString()}
February 2025: ${meter.consumption['February-25'].toLocaleString()}
March 2025: ${meter.consumption['March-25'].toLocaleString()}
April 2025: ${meter.consumption['April-25'].toLocaleString()}

Summary
-------
Total Consumption (6 months): ${meter.totalConsumption.toLocaleString()} kWh
Total Cost: OMR ${meter.totalCost.toFixed(2)}
Average Monthly Consumption: ${avgMonthlyConsumption.toLocaleString()} kWh
Average Monthly Cost: OMR ${avgMonthlyCost.toFixed(2)}
Rate: OMR ${RATE_PER_KWH} per kWh`

    const blob = new Blob([data], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meter-${meter.accountNo}-report.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/electricity-system" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Electricity System</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">Meter Details</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Meter Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#4E4456] mb-2">
                {meter.name}
              </h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  {meter.unitNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Account: {meter.accountNo}
                </span>
                <Badge>{meter.category}</Badge>
              </div>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{meter.totalConsumption.toLocaleString()} kWh</div>
              <p className="text-xs text-muted-foreground">6 months total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">OMR {meter.totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">@ {RATE_PER_KWH}/kWh</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgMonthlyConsumption.toLocaleString()} kWh</div>
              <p className="text-xs text-muted-foreground">OMR {avgMonthlyCost.toFixed(2)}/month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{growth}%</div>
              <p className="text-xs text-muted-foreground">vs previous month</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Charts */}
        <Tabs defaultValue="consumption" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consumption">Consumption Trend</TabsTrigger>
            <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Monthly Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="consumption" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Consumption Trend</CardTitle>
                <CardDescription>Electricity usage over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="consumption" 
                        stroke="#4E4456" 
                        strokeWidth={2}
                        name="Consumption (kWh)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cost" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Breakdown</CardTitle>
                <CardDescription>Electricity costs at OMR {RATE_PER_KWH} per kWh</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: any) => `OMR ${value.toFixed(2)}`} />
                      <Bar dataKey="cost" fill="#10b981" name="Cost (OMR)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Detailed breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => {
                    const prevMonth = index > 0 ? monthlyData[index - 1] : null
                    const change = prevMonth 
                      ? ((month.consumption - prevMonth.consumption) / prevMonth.consumption * 100).toFixed(1)
                      : 0
                    
                    return (
                      <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{month.month} 2024/25</p>
                          <p className="text-sm text-muted-foreground">
                            {month.consumption.toLocaleString()} kWh
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">OMR {month.cost.toFixed(2)}</p>
                          {prevMonth && (
                            <Badge variant={parseFloat(change) > 0 ? 'destructive' : 'secondary'}>
                              {parseFloat(change) > 0 ? '+' : ''}{change}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
