'use client'

import { useState, useMemo } from 'react'
import { Search, Zap, DollarSign, TrendingUp, Building2, Filter, CalendarDays } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ElectricityTable from '@/components/electricity-system/electricity-table'
import ConsumptionChart from '@/components/electricity-system/consumption-chart'
import CategoryBreakdown from '@/components/electricity-system/category-breakdown'
import { electricityData, RATE_PER_KWH } from '@/data/electricity-data'

export default function ElectricitySystem() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [analysisCategory, setAnalysisCategory] = useState('all')
  const [analysisMonth, setAnalysisMonth] = useState('all')

  // Available months
  const months = [
    { value: 'all', label: 'All Months' },
    { value: 'November-24', label: 'November 2024' },
    { value: 'December-24', label: 'December 2024' },
    { value: 'January-25', label: 'January 2025' },
    { value: 'February-25', label: 'February 2025' },
    { value: 'March-25', label: 'March 2025' },
    { value: 'April-25', label: 'April 2025' }
  ]

  // Available categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Common Areas', label: 'Common Areas' }
  ]

  // Calculate statistics
  const stats = useMemo(() => {
    // Filter data for stats if needed
    let filteredData = electricityData
    if (analysisCategory !== 'all') {
      filteredData = filteredData.filter(meter => meter.category === analysisCategory)
    }

    const totalConsumption = filteredData.reduce((sum, meter) => {
      if (analysisMonth === 'all') {
        return sum + meter.totalConsumption
      }
      return sum + meter.consumption[analysisMonth as keyof typeof meter.consumption]
    }, 0)

    const totalCost = totalConsumption * RATE_PER_KWH

    // Get current month (April-25) consumption
    const currentMonthConsumption = filteredData.reduce((sum, meter) => {
      return sum + (meter.consumption['April-25'] || 0)
    }, 0)

    const previousMonthConsumption = filteredData.reduce((sum, meter) => {
      return sum + (meter.consumption['March-25'] || 0)
    }, 0)

    const monthlyGrowth = previousMonthConsumption > 0 
      ? ((currentMonthConsumption - previousMonthConsumption) / previousMonthConsumption * 100).toFixed(1)
      : 0

    // Category breakdown
    const categoryTotals = filteredData.reduce((acc, meter) => {
      if (!acc[meter.category]) acc[meter.category] = 0
      if (analysisMonth === 'all') {
        acc[meter.category] += meter.totalConsumption
      } else {
        acc[meter.category] += meter.consumption[analysisMonth as keyof typeof meter.consumption]
      }
      return acc
    }, {} as Record<string, number>)

    return {
      totalConsumption,
      totalCost,
      currentMonthConsumption,
      monthlyGrowth,
      totalMeters: filteredData.length,
      categoryTotals
    }
  }, [analysisCategory, analysisMonth])

  // Filter meters for table
  const filteredMeters = useMemo(() => {
    return electricityData.filter(meter => {
      const matchesSearch = 
        meter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meter.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meter.unitNumber.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || meter.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">Electricity System</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConsumption.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                kWh {analysisMonth === 'all' ? '(6 months)' : `(${months.find(m => m.value === analysisMonth)?.label})`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">OMR @ {RATE_PER_KWH}/kWh</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Month</CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentMonthConsumption.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">kWh (April-25)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">vs previous month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Meters</CardTitle>
              <Building2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMeters}</div>
              <p className="text-xs text-muted-foreground">
                {analysisCategory === 'all' ? 'Active meters' : analysisCategory}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consumption">Consumption Details</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Consumption Trend</CardTitle>
                  <CardDescription>
                    6-month electricity usage pattern
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConsumptionChart data={electricityData} type="trend" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>
                    Consumption breakdown by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryBreakdown data={electricityData} />
                </CardContent>
              </Card>
            </div>

            {/* Top Consumers */}
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Consumers</CardTitle>
                <CardDescription>Highest electricity usage in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {electricityData
                    .sort((a, b) => b.totalConsumption - a.totalConsumption)
                    .slice(0, 5)
                    .map((meter, index) => (
                      <div key={meter.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{index + 1}</Badge>
                          <div>
                            <p className="font-medium">{meter.name}</p>
                            <p className="text-sm text-muted-foreground">{meter.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{meter.totalConsumption.toLocaleString()} kWh</p>
                          <p className="text-sm text-muted-foreground">
                            OMR {(meter.totalConsumption * RATE_PER_KWH).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Electricity Consumption Details</CardTitle>
                  <Badge variant="secondary">{filteredMeters.length} meters</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, account number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ElectricityTable meters={filteredMeters} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            {Object.entries(stats.categoryTotals).map(([category, total]) => (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{category}</CardTitle>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{total.toLocaleString()} kWh</p>
                      <p className="text-sm text-muted-foreground">
                        OMR {(total * RATE_PER_KWH).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {electricityData
                      .filter(meter => meter.category === category)
                      .sort((a, b) => b.totalConsumption - a.totalConsumption)
                      .slice(0, 5)
                      .map(meter => (
                        <div key={meter.id} className="flex justify-between items-center">
                          <span className="text-sm">{meter.name}</span>
                          <Badge variant="secondary">
                            {meter.totalConsumption.toLocaleString()} kWh
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Cost Analysis</CardTitle>
                    <CardDescription>
                      Detailed breakdown of electricity costs across all categories
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={analysisCategory} onValueChange={(value) => {
                      setAnalysisCategory(value)
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={analysisMonth} onValueChange={(value) => {
                      setAnalysisMonth(value)
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map(month => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ConsumptionChart 
                  data={electricityData} 
                  type="cost" 
                  selectedMonth={analysisMonth}
                  selectedType={analysisCategory}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
