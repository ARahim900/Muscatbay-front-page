'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Droplets, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import { processWaterData, formatNumber, formatPercentage, MONTHS, WaterMeterData } from '@/lib/water-data-utils'

interface WaterOverviewProps {
  waterData: WaterMeterData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

export function WaterOverview({ waterData }: WaterOverviewProps) {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[MONTHS.length - 1]);
  
  const { monthlyData, zoneData } = useMemo(() => 
    processWaterData(waterData), [waterData]
  );

  const currentMonthData = monthlyData.find(d => d.month === selectedMonth) || monthlyData[monthlyData.length - 1];

  // Prepare data for charts
  const waterFlowData = [
    { name: 'A1 (L1)', value: currentMonthData.a1 },
    { name: 'A2 (L2+DC)', value: currentMonthData.a2 },
    { name: 'A3 (L3+DC)', value: currentMonthData.a3 },
  ];

  const efficiencyTrendData = monthlyData.map(d => ({
    month: d.month.substring(0, 3),
    efficiency: d.l1 > 0 ? ((d.l3 / d.l1) * 100) : 0,
    lossPercentage: d.l1 > 0 ? ((d.totalLoss / d.l1) * 100) : 0
  }));

  const zoneDistributionData = Object.values(zoneData).map(zone => ({
    name: zone.displayName,
    value: zone.individualMeters,
    loss: zone.loss,
    lossPercentage: zone.lossPercentage
  })).filter(zone => zone.value > 0);

  const lossAnalysisData = monthlyData.map(d => ({
    month: d.month.substring(0, 3),
    'Stage 1 Loss': d.stage1Loss,
    'Stage 2 Loss': d.stage2Loss,
    'Total Loss': d.totalLoss
  }));

  return (
    <div className="space-y-6">
      {/* Month Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Water System Overview</h2>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map(month => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A1 (L1)</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentMonthData.a1)}</div>
            <p className="text-xs text-muted-foreground">Main bulk meter reading</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A2 (L2 + DC)</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentMonthData.a2)}</div>
            <p className="text-xs text-muted-foreground">Zone bulk + Direct connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A3 (L3 + DC)</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(currentMonthData.a3)}</div>
            <p className="text-xs text-muted-foreground">Individual meters + Direct connections</p>
          </CardContent>
        </Card>
      </div>

      {/* Loss KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stage 1 Loss (L1-L2)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatNumber(currentMonthData.stage1Loss)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage((currentMonthData.stage1Loss / currentMonthData.l1) * 100)} of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stage 2 Loss (L2-L3)</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatNumber(currentMonthData.stage2Loss)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage((currentMonthData.stage2Loss / currentMonthData.l2) * 100)} of L2
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loss</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{formatNumber(currentMonthData.totalLoss)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage((currentMonthData.totalLoss / currentMonthData.l1) * 100)} of total input
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Flow Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Water Flow Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatNumber(Number(value))} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Efficiency Trend */}
        <Card>
          <CardHeader>
            <CardTitle>System Efficiency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#00C49F" 
                  name="Efficiency %"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="lossPercentage" 
                  stroke="#FF8042" 
                  name="Loss %"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={zoneDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${formatNumber(entry.value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {zoneDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loss Percentage by Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Loss Percentage by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneDistributionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Bar dataKey="lossPercentage" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Consumption Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="a1" stroke="#0088FE" name="A1 (L1)" strokeWidth={2} />
              <Line type="monotone" dataKey="a2" stroke="#00C49F" name="A2 (L2+DC)" strokeWidth={2} />
              <Line type="monotone" dataKey="a3" stroke="#FFBB28" name="A3 (L3+DC)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Loss Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Loss Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={lossAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(Number(value))} />
              <Legend />
              <Bar dataKey="Stage 1 Loss" stackId="a" fill="#FF8042" />
              <Bar dataKey="Stage 2 Loss" stackId="a" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}