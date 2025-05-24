'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Contractor } from '@/data/contractor-data'

interface MonthlyChartProps {
  data: Contractor[]
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  // Calculate monthly aggregates
  const monthlyData = useMemo(() => {
    const months = [
      { name: 'Jan', key: 'JANUARY' },
      { name: 'Feb', key: 'FEBRUARY' },
      { name: 'Mar', key: 'MAR' },
      { name: 'Apr', key: 'APR' },
      { name: 'May', key: 'MAY' },
      { name: 'Jun', key: 'JUNE' },
      { name: 'Jul', key: 'JULY' },
      { name: 'Aug', key: 'AUGUST' },
      { name: 'Sep', key: 'SEPTEMBER' },
      { name: 'Oct', key: 'OCTOBER' },
      { name: 'Nov', key: 'NOVEMBER' },
      { name: 'Dec', key: 'DECEMBER' },
    ]

    return months.map(month => {
      const total = data.reduce((sum, contractor) => {
        return sum + (contractor[month.key as keyof Contractor] as number || 0)
      }, 0)

      const activeContractors = data.filter(contractor => 
        (contractor[month.key as keyof Contractor] as number) > 0
      ).length

      const average = activeContractors > 0 ? total / activeContractors : 0

      return {
        month: month.name,
        total: Math.abs(total), // Handle negative values
        activeContractors,
        average: Math.round(average),
      }
    })
  }, [data])

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Tabs defaultValue="total" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="total">Total Usage</TabsTrigger>
        <TabsTrigger value="contractors">Active Contractors</TabsTrigger>
        <TabsTrigger value="average">Average Usage</TabsTrigger>
      </TabsList>

      <TabsContent value="total" className="mt-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" fill="#4E4456" name="Total Usage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="contractors" className="mt-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="activeContractors" 
                stroke="#4E4456" 
                strokeWidth={2}
                name="Active Contractors"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="average" className="mt-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Average Usage per Contractor"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
