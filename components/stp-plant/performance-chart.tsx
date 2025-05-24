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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { STPReport } from '@/data/stp-reports-data'

interface PerformanceChartProps {
  data: STPReport[]
  type?: 'daily' | 'weekly' | 'monthly'
}

export default function PerformanceChart({ data, type = 'daily' }: PerformanceChartProps) {
  // Process data based on type
  const chartData = useMemo(() => {
    if (type === 'daily') {
      // Show last 30 days
      return data.slice(-30).map(report => ({
        date: report.date.split('/').slice(0, 2).join('/'),
        treated: report.totalTreatedWater,
        irrigation: report.irrigationOutput,
        inlet: report.inletSewage,
        efficiency: Math.round((report.irrigationOutput / report.totalTreatedWater) * 100)
      }))
    } else if (type === 'weekly') {
      // Show last 7 days
      return data.slice(-7).map(report => ({
        date: report.date.split('/').slice(0, 2).join('/'),
        treated: report.totalTreatedWater,
        irrigation: report.irrigationOutput,
        inlet: report.inletSewage,
        efficiency: Math.round((report.irrigationOutput / report.totalTreatedWater) * 100)
      }))
    } else {
      // Monthly aggregation
      const monthlyData: { [key: string]: any } = {}
      
      data.forEach(report => {
        const [day, month, year] = report.date.split('/')
        const monthKey = `${month}/${year}`
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            date: monthKey,
            treated: 0,
            irrigation: 0,
            inlet: 0,
            count: 0
          }
        }
        
        monthlyData[monthKey].treated += report.totalTreatedWater
        monthlyData[monthKey].irrigation += report.irrigationOutput
        monthlyData[monthKey].inlet += report.inletSewage
        monthlyData[monthKey].count++
      })
      
      return Object.values(monthlyData).map((month: any) => ({
        date: month.date,
        treated: Math.round(month.treated / month.count),
        irrigation: Math.round(month.irrigation / month.count),
        inlet: Math.round(month.inlet / month.count),
        efficiency: Math.round((month.irrigation / month.treated) * 100)
      }))
    }
  }, [data, type])

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
              {entry.name === 'Efficiency' ? '%' : ' m³'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const avgTreated = Math.round(
      chartData.reduce((sum, d) => sum + d.treated, 0) / chartData.length
    )
    const avgEfficiency = Math.round(
      chartData.reduce((sum, d) => sum + d.efficiency, 0) / chartData.length
    )
    const totalProcessed = chartData.reduce((sum, d) => sum + d.treated, 0)
    
    return { avgTreated, avgEfficiency, totalProcessed }
  }, [chartData])

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Avg Daily Production</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.avgTreated} m³</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Avg Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.avgEfficiency}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Total Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalProcessed.toLocaleString()} m³</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="production" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="mt-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="treated" 
                  stackId="1"
                  stroke="#4E4456" 
                  fill="#4E4456" 
                  name="Treated Water"
                />
                <Area 
                  type="monotone" 
                  dataKey="irrigation" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  name="Irrigation Output"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="mt-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Efficiency %"
                />
                <Line 
                  type="monotone" 
                  dataKey="treated" 
                  stroke="#4E4456" 
                  strokeWidth={2}
                  name="Treated Water"
                  yAxisId="right"
                />
                <YAxis yAxisId="right" orientation="right" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="inlet" fill="#94a3b8" name="Inlet Sewage" />
                <Bar dataKey="treated" fill="#4E4456" name="Treated Water" />
                <Bar dataKey="irrigation" fill="#10b981" name="Irrigation Output" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
