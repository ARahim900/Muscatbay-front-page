'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ElectricityMeter, getCategoryTotals, RATE_PER_KWH } from '@/data/electricity-data'

interface CategoryBreakdownProps {
  data: ElectricityMeter[]
}

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  // Process data for pie chart
  const chartData = useMemo(() => {
    const categoryTotals = getCategoryTotals()
    return categoryTotals.map(({ category, total, cost }) => ({
      name: category,
      value: total,
      cost: cost,
      percentage: ((total / data.reduce((sum, m) => sum + m.totalConsumption, 0)) * 100).toFixed(1)
    }))
  }, [data])

  // Colors for categories
  const COLORS = {
    Infrastructure: '#4E4456',
    Residential: '#10b981',
    Commercial: '#f59e0b',
    'Common Areas': '#3b82f6',
    Other: '#6b7280'
  }

  // Custom label
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">Consumption: {data.value.toLocaleString()} kWh</p>
          <p className="text-sm">Cost: OMR {data.payload.cost.toFixed(2)}</p>
          <p className="text-sm">Percentage: {data.payload.percentage}%</p>
        </div>
      )
    }
    return null
  }

  // Get top consumers by category
  const getTopConsumersByCategory = (category: string) => {
    return data
      .filter(m => m.category === category)
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .slice(0, 3)
  }

  return (
    <div className="space-y-4">
      {/* Pie Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Details */}
      <div className="space-y-3">
        {chartData.map((category) => {
          const topConsumers = getTopConsumersByCategory(category.name)
          return (
            <Card key={category.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[category.name as keyof typeof COLORS] || '#8884d8' }}
                  />
                  <span className="font-semibold">{category.name}</span>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{category.percentage}%</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.value.toLocaleString()} kWh
                  </p>
                </div>
              </div>
              
              {/* Top consumers in this category */}
              {topConsumers.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Top consumers:</p>
                  <div className="space-y-1">
                    {topConsumers.map((consumer, index) => (
                      <div key={consumer.id} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {index + 1}. {consumer.name.substring(0, 30)}...
                        </span>
                        <span className="font-medium">
                          {consumer.totalConsumption.toLocaleString()} kWh
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total Consumption</p>
          <p className="text-xl font-bold">
            {data.reduce((sum, m) => sum + m.totalConsumption, 0).toLocaleString()} kWh
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Cost (6 months)</p>
          <p className="text-xl font-bold">
            OMR {data.reduce((sum, m) => sum + m.totalCost, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
