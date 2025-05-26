'use client'

import { useState, useMemo } from 'react'
import { Search, Zap, DollarSign, TrendingUp, TrendingDown, Building2, Filter, CalendarDays, Activity, Eye, Settings, ChevronRight, Info, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getDashboardStats, RATE_PER_KWH } from '@/data/electricity-data-enhanced'
import { 
  MonthlyConsumptionChart, 
  CategoryDistributionChart, 
  FacilityTypeChart, 
  CostAnalysisChart, 
  EfficiencyMetricsChart 
} from '@/components/electricity-system/enhanced-charts'

// Modern KPI Card Component with proper context
function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  period, 
  description,
  gradient = "from-blue-500 to-purple-600",
  iconColor = "text-white"
}: {
  title: string
  value: string | number
  subtitle: string
  icon: any
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  period: string
  description: string
  gradient?: string
  iconColor?: string
}) {
  const Icon = icon
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <div className="space-y-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium text-[#4E4456] dark:text-gray-200">
                    {title}
                  </CardTitle>
                  <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-help" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-xs text-muted-foreground font-medium">
            {period}
          </p>
        </div>
        
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-[#4E4456] dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{subtitle}</p>
            
            {trend && trendValue && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                <TrendIcon className="h-3 w-3" />
                {trendValue}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ElectricitySystemEnhanced() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Get dashboard statistics
  const dashboardStats = useMemo(() => getDashboardStats(), [])

  // Period options
  const periods = [
    { value: 'current', label: 'Current Month (April 2025)' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'quarter', label: 'Q1 2025' },
    { value: 'ytd', label: 'Year to Date' }
  ]

  // Category options
  const categories = [
    { value: 'all', label: 'All Categories' },
    ...dashboardStats.categories.map(cat => ({ value: cat.category, label: cat.category }))
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4E4456] to-purple-600 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#4E4456] dark:text-white">Electricity System</h1>
                <p className="text-xs text-muted-foreground">Muscat Bay Operations</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 space-y-8">
        {/* Period and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#4E4456] dark:text-white">Dashboard Overview</h2>
            <p className="text-muted-foreground">Monitor and analyze electricity consumption across all facilities</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[200px]">
                <CalendarDays className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map(period => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Consumption"
            value={dashboardStats.totalConsumption.toLocaleString()}
            subtitle="kWh consumed"
            period="Last 6 Months (Nov 2024 - Apr 2025)"
            description="Total electricity consumption across all facilities including infrastructure, residential, and commercial areas"
            icon={Zap}
            trend="up"
            trendValue="+12.3%"
            gradient="from-blue-500 to-cyan-600"
          />
          
          <KPICard
            title="Total Cost"
            value={`${dashboardStats.totalCost.toFixed(2)} OMR`}
            subtitle={`@ ${RATE_PER_KWH} OMR/kWh`}
            period="Last 6 Months (Nov 2024 - Apr 2025)"
            description="Total electricity cost based on Muscat Bay tariff rate of 0.025 OMR per kWh"
            icon={DollarSign}
            trend="up"
            trendValue="+8.7%"
            gradient="from-green-500 to-emerald-600"
          />
          
          <KPICard
            title="Current Month"
            value={dashboardStats.currentMonth.toLocaleString()}
            subtitle="kWh (April 2025)"
            period="Current Period"
            description="Electricity consumption for the current month (April 2025) across all active meters"
            icon={Activity}
            trend={dashboardStats.monthlyGrowth > 0 ? "up" : "down"}
            trendValue={`${dashboardStats.monthlyGrowth > 0 ? '+' : ''}${dashboardStats.monthlyGrowth}%`}
            gradient="from-purple-500 to-pink-600"
          />
          
          <KPICard
            title="Active Meters"
            value={dashboardStats.activeMeters}
            subtitle={`of ${dashboardStats.totalMeters} total`}
            period="System Status"
            description="Number of electricity meters currently active and reporting consumption data"
            icon={Building2}
            trend="stable"
            trendValue="100%"
            gradient="from-orange-500 to-red-600"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyConsumptionChart data={dashboardStats.monthlyTotals} />
          <CategoryDistributionChart data={dashboardStats.categories} />
        </div>

        {/* Secondary Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FacilityTypeChart data={dashboardStats.facilityTypes} />
          <EfficiencyMetricsChart data={dashboardStats} />
        </div>

        {/* Top Consumers and Quick Stats */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CostAnalysisChart 
              monthlyData={dashboardStats.monthlyTotals} 
              categoryData={dashboardStats.categories} 
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Consumers */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#4E4456]">Top Consumers</CardTitle>
                <CardDescription>Highest electricity usage in the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardStats.topConsumers.map((consumer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500' :
                        'bg-gradient-to-r from-blue-400 to-purple-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#4E4456] dark:text-white truncate max-w-[120px]">
                          {consumer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{consumer.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{consumer.consumption.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">kWh</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#4E4456]">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardStats.categories.slice(0, 4).map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                      }`} />
                      <span className="text-sm text-[#4E4456] dark:text-white">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{category.percentage}%</p>
                      <p className="text-xs text-muted-foreground">{category.count} meters</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consumption">Consumption</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#4E4456]">Facility Types Overview</CardTitle>
                  <CardDescription>Consumption by facility type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardStats.facilityTypes.slice(0, 6).map((facility, index) => (
                      <div key={facility.facilityType} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div>
                          <p className="font-medium text-sm">{facility.facilityType}</p>
                          <p className="text-xs text-muted-foreground">{facility.count} meters • Avg: {facility.averageConsumption.toFixed(0)} kWh</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{facility.total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">kWh ({facility.percentage}%)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#4E4456]">System Health</CardTitle>
                  <CardDescription>Overall system performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Efficiency</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 w-4/5" />
                        </div>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Quality</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 w-full" />
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cost Optimization</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 w-3/5" />
                        </div>
                        <span className="text-sm font-medium">67%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-[#4E4456]">Detailed Consumption Data</CardTitle>
                    <CardDescription>Comprehensive electricity usage across all meters</CardDescription>
                  </div>
                  <Button>
                    <ChevronRight className="h-4 w-4 ml-2" />
                    View All Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search meters, accounts, locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
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
                  
                  <div className="text-center py-12 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enhanced data table component will be implemented here</p>
                    <p className="text-sm">Featuring sortable columns, filtering, and detailed meter information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <CostAnalysisChart 
                monthlyData={dashboardStats.monthlyTotals} 
                categoryData={dashboardStats.categories} 
              />
              <EfficiencyMetricsChart data={dashboardStats} />
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#4E4456]">Report Generation</CardTitle>
                <CardDescription>Generate comprehensive electricity consumption reports</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-[#4E4456] opacity-50" />
                <p className="text-muted-foreground">Advanced reporting features coming soon</p>
                <p className="text-sm text-muted-foreground">PDF exports, scheduled reports, and custom analytics</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
