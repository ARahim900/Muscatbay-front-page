'use client'

import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Color scheme based on #4E4456
const colors = {
  primary: '#4E4456',
  secondary: '#6B5B7B',
  accent: '#8B7BA3',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  purple: '#8B5CF6',
  gradient: ['#4E4456', '#6B5B7B', '#8B7BA3', '#10B981', '#3B82F6', '#8B5CF6']
}

// Custom tooltip component
function CustomTooltip({ active, payload, label, formatter }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-[#4E4456] dark:text-white mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {pld.name}: {formatter ? formatter(pld.value, pld.name) : pld.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// Monthly Consumption Trend Chart
export function MonthlyConsumptionChart({ data }: { data: any[] }) {
  const chartData = useMemo(() => {
    return data.map(item => ({
      month: item.formatted?.month || item.month,
      consumption: item.total,
      cost: item.cost,
      formattedConsumption: `${item.total.toLocaleString()} kWh`,
      formattedCost: `${item.cost.toFixed(2)} OMR`
    }))
  }, [data])

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4E4456]">Monthly Consumption Trend</CardTitle>
        <CardDescription>6-month electricity usage pattern with cost analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.success} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.success} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              content={<CustomTooltip formatter={(value: number, name: string) => 
                name === 'consumption' ? `${value.toLocaleString()} kWh` : `${value.toFixed(2)} OMR`
              } />}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke={colors.primary}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#consumptionGradient)"
              name="Consumption (kWh)"
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke={colors.success}
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#costGradient)"
              name="Cost (OMR)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Category Distribution Pie Chart
export function CategoryDistributionChart({ data }: { data: any[] }) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      name: item.category,
      value: item.total,
      percentage: parseFloat(item.percentage),
      cost: item.cost,
      count: item.count,
      color: colors.gradient[index % colors.gradient.length]
    }))
  }, [data])

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
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
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4E4456]">Category Distribution</CardTitle>
        <CardDescription>Consumption breakdown by facility category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} />}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-[#4E4456]">Category Breakdown</h4>
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.count} meters</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{item.percentage}%</p>
                  <p className="text-xs text-muted-foreground">{item.value.toLocaleString()} kWh</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Facility Type Comparison Bar Chart
export function FacilityTypeChart({ data }: { data: any[] }) {
  const chartData = useMemo(() => {
    return data.slice(0, 8).map((item, index) => ({
      name: item.facilityType.length > 15 ? item.facilityType.substring(0, 15) + '...' : item.facilityType,
      fullName: item.facilityType,
      consumption: item.total,
      cost: item.cost,
      count: item.count,
      average: item.averageConsumption,
      color: colors.gradient[index % colors.gradient.length]
    }))
  }, [data])

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4E4456]">Facility Type Analysis</CardTitle>
        <CardDescription>Consumption comparison by facility type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              content={<CustomTooltip formatter={(value: number, name: string) => {
                if (name === 'consumption') return `${value.toLocaleString()} kWh`
                if (name === 'cost') return `${value.toFixed(2)} OMR`
                if (name === 'average') return `${value.toFixed(0)} kWh/meter`
                return value
              }} />}
            />
            <Legend />
            <Bar 
              dataKey="consumption" 
              fill={colors.primary} 
              name="Total Consumption (kWh)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="average" 
              fill={colors.info} 
              name="Avg per Meter (kWh)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Cost Analysis Chart
export function CostAnalysisChart({ monthlyData, categoryData }: { monthlyData: any[], categoryData: any[] }) {
  const combinedData = useMemo(() => {
    return monthlyData.map(month => {
      const categoryBreakdown = categoryData.reduce((acc, cat) => {
        acc[cat.category.replace(/\s+/g, '')] = (cat.cost / 6) // Assuming 6 months average
        return acc
      }, {})
      
      return {
        month: month.formatted?.month || month.month,
        totalCost: month.cost,
        ...categoryBreakdown
      }
    })
  }, [monthlyData, categoryData])

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-[#4E4456]">Cost Analysis</CardTitle>
            <CardDescription>Monthly cost breakdown by category</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Rate: 0.025 OMR/kWh
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: colors.primary }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip 
              content={<CustomTooltip formatter={(value: number) => `${value.toFixed(2)} OMR`} />}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke={colors.primary}
              strokeWidth={3}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
              name="Total Cost (OMR)"
            />
            {categoryData.slice(0, 3).map((cat, index) => (
              <Line
                key={cat.category}
                type="monotone"
                dataKey={cat.category.replace(/\s+/g, '')}
                stroke={colors.gradient[index + 1]}
                strokeWidth={2}
                dot={{ fill: colors.gradient[index + 1], strokeWidth: 2, r: 4 }}
                name={`${cat.category} (OMR)`}
                strokeDasharray={index > 0 ? "5 5" : ""}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Efficiency Metrics Chart
export function EfficiencyMetricsChart({ data }: { data: any }) {
  const efficiencyData = [
    { name: 'System Efficiency', value: 82, target: 85, color: colors.success },
    { name: 'Data Quality', value: 100, target: 95, color: colors.info },
    { name: 'Cost Optimization', value: 67, target: 80, color: colors.warning },
    { name: 'Energy Conservation', value: 73, target: 75, color: colors.purple }
  ]

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4E4456]">System Performance</CardTitle>
        <CardDescription>Key efficiency and performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={efficiencyData} layout="horizontal" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: colors.primary }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12, fill: colors.primary }}
              width={80}
            />
            <Tooltip 
              content={<CustomTooltip formatter={(value: number, name: string) => 
                name === 'value' ? `${value}%` : `Target: ${value}%`
              } />}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {efficiencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar dataKey="target" radius={[0, 2, 2, 0]} opacity={0.3}>
              {efficiencyData.map((entry, index) => (
                <Cell key={`target-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          {efficiencyData.map((metric, index) => (
            <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: metric.color }}
                />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">{metric.value}%</p>
                <p className="text-xs text-muted-foreground">Target: {metric.target}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
