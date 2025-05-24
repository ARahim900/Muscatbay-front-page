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
}

export default function ConsumptionChart({ data, type = 'trend' }: ConsumptionChartProps) {
  // Process data based on type
  const chartData = useMemo(() => {
    if (type === 'trend') {
      // Monthly trend data
      const monthlyTotals = getMonthlyTotals()
      return monthlyTotals.map(({ month, total, cost }) => ({
        month: month.split('-')[0], // Short month name
        consumption: total,
        cost: cost,
        avgPerMeter: Math.round(total / data.length)
      }))
    } else if (type === 'comparison') {
      // Category comparison
      const categories: Record<string, number[]> = {}
      const months = ['November-24', 'December-24', 'January-25', 'February-25', 'March-25', 'April-25'] as const
      
      data.forEach(meter => {
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
      // Cost analysis
      const topConsumers = data
        .sort((a, b) => b.totalConsumption - a.totalConsumption)
        .slice(0, 10)
        .map(meter => ({
          name: meter.name.length > 20 ? meter.name.substring(0, 20) + '...' : meter.name,
          consumption: meter.totalConsumption,
          cost: meter.totalCost
        }))
      return topConsumers
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

  // Colors for different categories
  const categoryColors = {
    Infrastructure: '#4E4456',
    Residential: '#10b981',
    Commercial: '#f59e0b',
    'Common Areas': '#3b82f6',
    Other: '#6b7280'
  }

  if (type === 'trend') {
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

  // Cost analysis chart
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Total Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              OMR {(data.reduce((sum, m) => sum + m.totalCost, 0) / 6).toFixed(2)}
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
              OMR {Math.max(...data.map(m => m.totalCost)).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Single meter (6 months)</p>
          </CardContent>
        </Card>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="consumption" fill="#4E4456" name="Consumption (kWh)" />
            <Bar dataKey="cost" fill="#10b981" name="Cost (OMR)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
