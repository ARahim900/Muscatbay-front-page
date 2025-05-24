'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ElectricityMeter, RATE_PER_KWH, getMonthlyTotals } from '@/data/electricity-data'

interface ConsumptionChartProps {
  data: ElectricityMeter[]
  type?: 'trend' | 'comparison' | 'cost'
  selectedMonth?: string
  selectedType?: string
}

export default function ConsumptionChart({ 
  data, 
  type = 'trend',
  selectedMonth = 'all',
  selectedType = 'all' 
}: ConsumptionChartProps) {
  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = data

    // Filter by type/category
    if (selectedType !== 'all') {
      filtered = filtered.filter(meter => meter.category === selectedType)
    }

    return filtered
  }, [data, selectedType])

  // Process data based on type
  const chartData = useMemo(() => {
    if (type === 'trend') {
      // Monthly trend data
      const months = ['November-24', 'December-24', 'January-25', 'February-25', 'March-25', 'April-25'] as const
      
      if (selectedMonth !== 'all') {
        // Show single month data by category
        const categoryData = filteredData.reduce((acc, meter) => {
          const category = meter.category
          if (!acc[category]) {
            acc[category] = {
              category,
              consumption: 0,
              cost: 0,
              count: 0
            }
          }
          acc[category].consumption += meter.consumption[selectedMonth as keyof typeof meter.consumption]
          acc[category].cost += meter.consumption[selectedMonth as keyof typeof meter.consumption] * RATE_PER_KWH
          acc[category].count += 1
          return acc
        }, {} as Record<string, any>)

        return Object.values(categoryData)
      } else {
        // Show all months trend
        return months.map(month => {
          const monthTotal = filteredData.reduce((sum, meter) => 
            sum + meter.consumption[month], 0
          )
          return {
            month: month.split('-')[0],
            consumption: monthTotal,
            cost: monthTotal * RATE_PER_KWH,
            avgPerMeter: Math.round(monthTotal / (filteredData.length || 1))
          }
        })
      }
    } else if (type === 'comparison') {
      // Category comparison
      const categories: Record<string, number[]> = {}
      const months = ['November-24', 'December-24', 'January-25', 'February-25', 'March-25', 'April-25'] as const
      
      filteredData.forEach(meter => {
        if (!categories[meter.category]) {
          categories[meter.category] = new Array(6).fill(0)
        }
        months.forEach((month, index) => {
          categories[meter.category][index] += meter.consumption[month]
        })
      })
      
      return months.map((month, index) => {
        const dataPoint: any = { month: month.split('-')[0] }
        Object.keys(categories).forEach(cat => {
          dataPoint[cat] = categories[cat][index]
        })
        return dataPoint
      })
    } else {
      // Cost analysis - FIXED with dual Y-axis
      const topConsumers = filteredData
        .sort((a, b) => b.totalConsumption - a.totalConsumption)
        .slice(0, 10)
        .map(meter => ({
          name: meter.name.length > 20 ? meter.name.substring(0, 20) + '...' : meter.name,
          fullName: meter.name,
          consumption: meter.totalConsumption,
          cost: meter.totalCost,
          category: meter.category
        }))
      return topConsumers
    }
  }, [filteredData, type, selectedMonth])

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('cost') || entry.name.includes('Cost') 
                ? `OMR ${entry.value.toFixed(2)}` 
                : `${entry.value.toLocaleString()} kWh`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom tooltip for cost analysis
  const CostAnalysisTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{data?.fullName || label}</p>
          <p className="text-xs text-muted-foreground mb-2">{data?.category}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Cost') 
                ? `OMR ${entry.value.toFixed(2)}` 
                : `${entry.value.toLocaleString()} kWh`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Colors for different categories
  const categoryColors = {
    Infrastructure: '#4E4456',
    Residential: '#10b981',
    Commercial: '#f59e0b',
    'Common Areas': '#3b82f6',
    Other: '#6b7280'
  }

  if (type === 'trend') {
    if (selectedMonth !== 'all') {
      // Bar chart for single month category breakdown
      return (
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="consumption" fill="#4E4456" name="Consumption (kWh)" />
              <Bar yAxisId="right" dataKey="cost" fill="#10b981" name="Cost (OMR)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    }

    return (
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="consumption"
              stroke="#4E4456"
              fill="#4E4456"
              fillOpacity={0.3}
              name="Total Consumption (kWh)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgPerMeter"
              stroke="#10b981"
              strokeWidth={2}
              name="Avg per Meter (kWh)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === 'comparison') {
    return (
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.keys(categoryColors).map(category => (
              <Bar
                key={category}
                dataKey={category}
                fill={categoryColors[category as keyof typeof categoryColors]}
                stackId="a"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Enhanced Cost analysis chart with dual Y-axis
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Total Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              OMR {(filteredData.reduce((sum, m) => sum + m.totalCost, 0) / 6).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Average per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Highest Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              OMR {Math.max(...(filteredData.length > 0 ? filteredData.map(m => m.totalCost) : [0])).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Single meter (6 months)</p>
          </CardContent>
        </Card>
      </div>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={140} />
            <Tooltip content={<CostAnalysisTooltip />} />
            <Legend />
            <Bar dataKey="consumption" fill="#4E4456" name="Consumption (kWh)" />
            <Bar dataKey="cost" fill="#10b981" name="Cost (OMR)" yAxisId="right" />
            <YAxis yAxisId="right" orientation="right" type="number" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alternative visualization - separate charts for better visibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Consumption Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `${value.toLocaleString()} kWh`} />
                  <Bar dataKey="consumption" fill="#4E4456" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cost Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `OMR ${value.toFixed(2)}`} />
                  <Bar dataKey="cost" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
