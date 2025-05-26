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
import { muscatBayColors, chartColors, gradients } from '@/lib/design-system'

// Modern KPI Card Component with complete color palette
function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  period, 
  description,
  colorScheme = "primary",
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
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'light' | 'neutral' | 'support'
  iconColor?: string
}) {
  const Icon = icon
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity

  const colorConfig = {
    primary: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.secondary[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.primary[50]} 0%, ${muscatBayColors.secondary[50]} 100%)`,
      iconBg: muscatBayColors.primary[500]
    },
    secondary: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.secondary[500]} 0%, ${muscatBayColors.accent[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.secondary[50]} 0%, ${muscatBayColors.accent[50]} 100%)`,
      iconBg: muscatBayColors.secondary[500]
    },
    accent: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.accent[500]} 0%, ${muscatBayColors.light[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.accent[50]} 0%, ${muscatBayColors.light[50]} 100%)`,
      iconBg: muscatBayColors.accent[500]
    },
    light: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.light[500]} 0%, ${muscatBayColors.neutral[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.light[50]} 0%, ${muscatBayColors.neutral[50]} 100%)`,
      iconBg: muscatBayColors.light[500]
    },
    neutral: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.neutral[500]} 0%, ${muscatBayColors.support[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.neutral[50]} 0%, ${muscatBayColors.support[50]} 100%)`,
      iconBg: muscatBayColors.neutral[500]
    },
    support: {
      gradient: `linear-gradient(135deg, ${muscatBayColors.support[500]} 0%, ${muscatBayColors.primary[500]} 100%)`,
      bgGradient: `linear-gradient(135deg, ${muscatBayColors.support[50]} 0%, ${muscatBayColors.primary[50]} 100%)`,
      iconBg: muscatBayColors.support[500]
    }
  }

  const config = colorConfig[colorScheme]

  return (
    <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{ background: config.gradient }}
      />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <div className="space-y-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <CardTitle 
                    className="text-sm font-medium dark:text-gray-200"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    {title}
                  </CardTitle>
                  <Info 
                    className="h-3 w-3 cursor-help transition-colors"
                    style={{ color: muscatBayColors.secondary[400] }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs bg-white border shadow-lg">
                <p className="text-xs" style={{ color: muscatBayColors.primary[500] }}>
                  {description}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p 
            className="text-xs font-medium"
            style={{ color: muscatBayColors.secondary[500] }}
          >
            {period}
          </p>
        </div>
        
        <div 
          className="h-12 w-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
          style={{ background: config.gradient }}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-2">
          <div 
            className="text-2xl font-bold dark:text-white"
            style={{ color: muscatBayColors.primary[500] }}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          <div className="flex items-center justify-between">
            <p 
              className="text-xs"
              style={{ color: muscatBayColors.secondary[500] }}
            >
              {subtitle}
            </p>
            
            {trend && trendValue && (
              <div 
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
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
    <div 
      className="min-h-screen"
      style={{ 
        background: `linear-gradient(135deg, ${muscatBayColors.primary[25]} 0%, ${muscatBayColors.accent[25]} 30%, ${muscatBayColors.light[25]} 60%, ${muscatBayColors.neutral[25]} 100%)`
      }}
    >
      {/* Modern Header with brand colors */}
      <header 
        className="sticky top-0 z-50 w-full border-b border-white/20 backdrop-blur-xl shadow-sm"
        style={{ 
          background: `linear-gradient(90deg, ${muscatBayColors.primary[500]}95 0%, ${muscatBayColors.secondary[500]}95 50%, ${muscatBayColors.accent[500]}95 100%)`
        }}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(135deg, ${muscatBayColors.light[500]} 0%, ${muscatBayColors.accent[500]} 100%)` }}
              >
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Electricity System</h1>
                <p className="text-xs text-white/80">Muscat Bay Operations</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="px-3 py-1 text-white border-white/30 bg-white/10 backdrop-blur-sm"
            >
              <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm" className="hidden sm:flex text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20">
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
            <h2 
              className="text-3xl font-bold dark:text-white"
              style={{ color: muscatBayColors.primary[500] }}
            >
              Dashboard Overview
            </h2>
            <p style={{ color: muscatBayColors.secondary[500] }}>
              Monitor and analyze electricity consumption across all facilities
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger 
                className="w-[200px] border-2 shadow-lg"
                style={{ borderColor: muscatBayColors.accent[300] }}
              >
                <CalendarDays 
                  className="h-4 w-4 mr-2" 
                  style={{ color: muscatBayColors.accent[500] }}
                />
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

        {/* Enhanced KPI Cards with different color schemes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Consumption"
            value={dashboardStats.totalConsumption.toLocaleString()}
            subtitle="kWh consumed"
            period="Last 6 Months (Nov 2024 - Apr 2025)"
            description="Total electricity consumption across all facilities including infrastructure, residential, and commercial areas"
            icon={Zap}
            trend="up"
            trendValue="+12.3%"
            colorScheme="primary"
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
            colorScheme="accent"
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
            colorScheme="light"
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
            colorScheme="neutral"
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

        {/* Top Consumers and Analysis */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CostAnalysisChart 
              monthlyData={dashboardStats.monthlyTotals} 
              categoryData={dashboardStats.categories} 
            />
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Top Consumers with brand colors */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: gradients.support }}
              />
              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: muscatBayColors.support[500] }}
                  />
                  <CardTitle 
                    className="text-lg font-semibold"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    Top Consumers
                  </CardTitle>
                </div>
                <CardDescription style={{ color: muscatBayColors.secondary[500] }}>
                  Highest electricity usage in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {dashboardStats.topConsumers.map((consumer, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-105"
                    style={{ 
                      background: `linear-gradient(135deg, ${chartColors[index % chartColors.length]}15, ${chartColors[index % chartColors.length]}05)`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p 
                          className="font-medium text-sm dark:text-white truncate max-w-[120px]"
                          style={{ color: muscatBayColors.primary[500] }}
                        >
                          {consumer.name}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: muscatBayColors.secondary[500] }}
                        >
                          {consumer.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p 
                        className="font-semibold text-sm"
                        style={{ color: muscatBayColors.primary[500] }}
                      >
                        {consumer.consumption.toLocaleString()}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: muscatBayColors.secondary[500] }}
                      >
                        kWh
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats with brand colors */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: gradients.neutral }}
              />
              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: muscatBayColors.neutral[500] }}
                  />
                  <CardTitle 
                    className="text-lg font-semibold"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    Quick Stats
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {dashboardStats.categories.slice(0, 4).map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full shadow-sm" 
                        style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      />
                      <span 
                        className="text-sm dark:text-white"
                        style={{ color: muscatBayColors.primary[500] }}
                      >
                        {category.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p 
                        className="text-sm font-medium"
                        style={{ color: muscatBayColors.primary[500] }}
                      >
                        {category.percentage}%
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: muscatBayColors.secondary[500] }}
                      >
                        {category.count} meters
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList 
            className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 p-2 rounded-xl shadow-lg"
            style={{ backgroundColor: muscatBayColors.primary[50] }}
          >
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-500 data-[state=active]:to-secondary-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="consumption"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-500 data-[state=active]:to-light-500 data-[state=active]:text-white"
            >
              Consumption
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neutral-500 data-[state=active]:to-support-500 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-support-500 data-[state=active]:to-primary-500 data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ background: gradients.primary }}
                />
                <CardHeader className="relative">
                  <CardTitle 
                    className="text-lg font-semibold"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    Facility Types Overview
                  </CardTitle>
                  <CardDescription style={{ color: muscatBayColors.secondary[500] }}>
                    Consumption by facility type
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    {dashboardStats.facilityTypes.slice(0, 6).map((facility, index) => (
                      <div 
                        key={facility.facilityType} 
                        className="flex items-center justify-between p-4 border rounded-xl transition-all duration-200 hover:scale-105"
                        style={{ 
                          borderColor: chartColors[index % chartColors.length],
                          background: `${chartColors[index % chartColors.length]}10`
                        }}
                      >
                        <div>
                          <p 
                            className="font-medium text-sm"
                            style={{ color: muscatBayColors.primary[500] }}
                          >
                            {facility.facilityType}
                          </p>
                          <p 
                            className="text-xs"
                            style={{ color: muscatBayColors.secondary[500] }}
                          >
                            {facility.count} meters • Avg: {facility.averageConsumption.toFixed(0)} kWh
                          </p>
                        </div>
                        <div className="text-right">
                          <p 
                            className="font-semibold"
                            style={{ color: muscatBayColors.primary[500] }}
                          >
                            {facility.total.toLocaleString()}
                          </p>
                          <p 
                            className="text-xs"
                            style={{ color: muscatBayColors.secondary[500] }}
                          >
                            kWh ({facility.percentage}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ background: gradients.accent }}
                />
                <CardHeader className="relative">
                  <CardTitle 
                    className="text-lg font-semibold"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    System Health
                  </CardTitle>
                  <CardDescription style={{ color: muscatBayColors.secondary[500] }}>
                    Overall system performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-6">
                    {[
                      { name: 'System Efficiency', value: 82, color: muscatBayColors.primary[500] },
                      { name: 'Data Quality', value: 100, color: muscatBayColors.accent[500] },
                      { name: 'Cost Optimization', value: 67, color: muscatBayColors.light[500] },
                    ].map((metric, index) => (
                      <div key={metric.name} className="flex items-center justify-between">
                        <span 
                          className="text-sm"
                          style={{ color: muscatBayColors.primary[500] }}
                        >
                          {metric.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-500"
                              style={{ 
                                backgroundColor: metric.color,
                                width: `${metric.value}%`
                              }}
                            />
                          </div>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: muscatBayColors.primary[500] }}
                          >
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-6">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: gradients.secondary }}
              />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle 
                      className="text-lg font-semibold"
                      style={{ color: muscatBayColors.primary[500] }}
                    >
                      Detailed Consumption Data
                    </CardTitle>
                    <CardDescription style={{ color: muscatBayColors.secondary[500] }}>
                      Comprehensive electricity usage across all meters
                    </CardDescription>
                  </div>
                  <Button 
                    className="shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${muscatBayColors.accent[500]} 0%, ${muscatBayColors.light[500]} 100%)`,
                      border: 'none'
                    }}
                  >
                    <ChevronRight className="h-4 w-4 ml-2" />
                    View All Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search 
                        className="absolute left-2 top-2.5 h-4 w-4"
                        style={{ color: muscatBayColors.secondary[400] }}
                      />
                      <Input
                        placeholder="Search meters, accounts, locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 border-2 shadow-lg"
                        style={{ borderColor: muscatBayColors.accent[300] }}
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger 
                        className="w-[180px] border-2 shadow-lg"
                        style={{ borderColor: muscatBayColors.light[300] }}
                      >
                        <Filter 
                          className="h-4 w-4 mr-2"
                          style={{ color: muscatBayColors.light[500] }}
                        />
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
                  
                  <div className="text-center py-12">
                    <Building2 
                      className="h-12 w-12 mx-auto mb-4 opacity-50"
                      style={{ color: muscatBayColors.primary[500] }}
                    />
                    <p style={{ color: muscatBayColors.primary[500] }}>
                      Enhanced data table component will be implemented here
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: muscatBayColors.secondary[500] }}
                    >
                      Featuring sortable columns, filtering, and detailed meter information
                    </p>
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
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: gradients.hero }}
              />
              <CardHeader className="relative">
                <CardTitle 
                  className="text-lg font-semibold"
                  style={{ color: muscatBayColors.primary[500] }}
                >
                  Report Generation
                </CardTitle>
                <CardDescription style={{ color: muscatBayColors.secondary[500] }}>
                  Generate comprehensive electricity consumption reports
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12 relative">
                <MapPin 
                  className="h-12 w-12 mx-auto mb-4 opacity-50"
                  style={{ color: muscatBayColors.primary[500] }}
                />
                <p style={{ color: muscatBayColors.primary[500] }}>
                  Advanced reporting features coming soon
                </p>
                <p 
                  className="text-sm"
                  style={{ color: muscatBayColors.secondary[500] }}
                >
                  PDF exports, scheduled reports, and custom analytics
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
