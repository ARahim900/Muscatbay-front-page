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
import { muscatBayColors, chartColors, gradients } from '@/lib/design-system'

// Custom tooltip component with brand styling
function CustomTooltip({ active, payload, label, formatter }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl backdrop-blur-sm">
        <p className="font-semibold mb-3" style={{ color: muscatBayColors.primary[500] }}>
          {label}
        </p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <div 
              className="w-4 h-4 rounded-full shadow-sm" 
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-sm font-medium" style={{ color: muscatBayColors.secondary[500] }}>
              {pld.name}: {formatter ? formatter(pld.value, pld.name) : pld.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// Monthly Consumption Trend Chart with gradient areas
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
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: gradients.primary }}
      />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: muscatBayColors.primary[500] }}
          />
          <CardTitle className="text-lg font-semibold" style={{ color: muscatBayColors.primary[500] }}>
            Monthly Consumption Trend
          </CardTitle>
        </div>
        <CardDescription className="text-sm" style={{ color: muscatBayColors.secondary[500] }}>
          6-month electricity usage pattern with cost analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={muscatBayColors.primary[500]} stopOpacity={0.8}/>
                <stop offset="50%" stopColor={muscatBayColors.secondary[500]} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={muscatBayColors.accent[500]} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={muscatBayColors.accent[500]} stopOpacity={0.8}/>
                <stop offset="50%" stopColor={muscatBayColors.light[500]} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={muscatBayColors.neutral[500]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={muscatBayColors.neutral[200]} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
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
              stroke={muscatBayColors.primary[500]}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#consumptionGradient)"
              name="Consumption (kWh)"
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke={muscatBayColors.accent[500]}
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

// Category Distribution Pie Chart with brand colors
export function CategoryDistributionChart({ data }: { data: any[] }) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      name: item.category,
      value: item.total,
      percentage: parseFloat(item.percentage),
      cost: item.cost,
      count: item.count,
      color: chartColors[index % chartColors.length]
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
        style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
      >
        {`${percentage}%`}
      </text>
    )
  }

  return (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: gradients.secondary }}
      />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: muscatBayColors.accent[500] }}
          />
          <CardTitle className="text-lg font-semibold" style={{ color: muscatBayColors.primary[500] }}>
            Category Distribution
          </CardTitle>
        </div>
        <CardDescription className="text-sm" style={{ color: muscatBayColors.secondary[500] }}>
          Consumption breakdown by facility category
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
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
                stroke="white"
                strokeWidth={2}
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
            <h4 className="font-semibold" style={{ color: muscatBayColors.primary[500] }}>
              Category Breakdown
            </h4>
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-105" 
                   style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)` }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium text-sm" style={{ color: muscatBayColors.primary[500] }}>
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: muscatBayColors.secondary[500] }}>
                      {item.count} meters
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm" style={{ color: muscatBayColors.primary[500] }}>
                    {item.percentage}%
                  </p>
                  <p className="text-xs" style={{ color: muscatBayColors.secondary[500] }}>
                    {item.value.toLocaleString()} kWh
                  </p>
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
      color: chartColors[index % chartColors.length]
    }))
  }, [data])

  return (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: gradients.accent }}
      />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: muscatBayColors.light[500] }}
          />
          <CardTitle className="text-lg font-semibold" style={{ color: muscatBayColors.primary[500] }}>
            Facility Type Analysis
          </CardTitle>
        </div>
        <CardDescription className="text-sm" style={{ color: muscatBayColors.secondary[500] }}>
          Consumption comparison by facility type
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={muscatBayColors.neutral[200]} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
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
              fill={muscatBayColors.primary[500]}
              name="Total Consumption (kWh)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="average" 
              fill={muscatBayColors.accent[500]}
              name="Avg per Meter (kWh)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Cost Analysis Chart with multiple lines
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
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: gradients.neutral }}
      />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: muscatBayColors.neutral[500] }}
            />
            <div>
              <CardTitle className="text-lg font-semibold" style={{ color: muscatBayColors.primary[500] }}>
                Cost Analysis
              </CardTitle>
              <CardDescription className="text-sm" style={{ color: muscatBayColors.secondary[500] }}>
                Monthly cost breakdown by category
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-xs font-medium border-2"
            style={{ 
              backgroundColor: `${muscatBayColors.success[500]}15`,
              borderColor: muscatBayColors.success[500],
              color: muscatBayColors.success[600]
            }}
          >
            Rate: 0.025 OMR/kWh
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={muscatBayColors.neutral[200]} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
              axisLine={{ stroke: muscatBayColors.neutral[300] }}
            />
            <Tooltip 
              content={<CustomTooltip formatter={(value: number) => `${value.toFixed(2)} OMR`} />}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke={muscatBayColors.primary[500]}
              strokeWidth={3}
              dot={{ fill: muscatBayColors.primary[500], strokeWidth: 2, r: 6 }}
              name="Total Cost (OMR)"
            />
            {categoryData.slice(0, 4).map((cat, index) => (
              <Line
                key={cat.category}
                type="monotone"
                dataKey={cat.category.replace(/\s+/g, '')}
                stroke={chartColors[index + 1]}
                strokeWidth={2}
                dot={{ fill: chartColors[index + 1], strokeWidth: 2, r: 4 }}
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

// Efficiency Metrics Chart with horizontal bars
export function EfficiencyMetricsChart({ data }: { data: any }) {
  const efficiencyData = [
    { 
      name: 'System Efficiency', 
      value: 82, 
      target: 85, 
      color: muscatBayColors.primary[500],
      bgColor: `${muscatBayColors.primary[500]}15`
    },
    { 
      name: 'Data Quality', 
      value: 100, 
      target: 95, 
      color: muscatBayColors.accent[500],
      bgColor: `${muscatBayColors.accent[500]}15`
    },
    { 
      name: 'Cost Optimization', 
      value: 67, 
      target: 80, 
      color: muscatBayColors.light[500],
      bgColor: `${muscatBayColors.light[500]}15`
    },
    { 
      name: 'Energy Conservation', 
      value: 73, 
      target: 75, 
      color: muscatBayColors.neutral[500],
      bgColor: `${muscatBayColors.neutral[500]}15`
    }
  ]

  return (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ background: gradients.hero }}
      />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: muscatBayColors.support[500] }}
          />
          <CardTitle className="text-lg font-semibold" style={{ color: muscatBayColors.primary[500] }}>
            System Performance
          </CardTitle>
        </div>
        <CardDescription className="text-sm" style={{ color: muscatBayColors.secondary[500] }}>
          Key efficiency and performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={efficiencyData} layout="horizontal" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={muscatBayColors.neutral[200]} />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12, fill: muscatBayColors.primary[500] }}
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
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          {efficiencyData.map((metric, index) => (
            <div 
              key={metric.name} 
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: metric.bgColor }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: metric.color }}
                />
                <span className="text-sm font-medium" style={{ color: muscatBayColors.primary[500] }}>
                  {metric.name}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold" style={{ color: muscatBayColors.primary[500] }}>
                  {metric.value}%
                </p>
                <p className="text-xs" style={{ color: muscatBayColors.secondary[500] }}>
                  Target: {metric.target}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
