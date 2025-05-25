'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { formatNumber, formatPercentage } from '@/lib/water-data-utils'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

interface WaterChartsProps {
  currentMonthData: any;
  monthlyData: any[];
  zoneData: any;
}

export function WaterCharts({ currentMonthData, monthlyData, zoneData }: WaterChartsProps) {
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

  const zoneDistributionData = Object.values(zoneData).map((zone: any) => ({
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Water Flow Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Water Flow Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Efficiency Trend */}
      <Card>
        <CardHeader>
          <CardTitle>System Efficiency Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `${Number(value).toFixed(1)}%`} />
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
          </div>
        </CardContent>
      </Card>

      {/* Zone Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${formatNumber(entry.value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {zoneDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Loss Percentage by Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Loss Percentage by Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneDistributionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => `${Number(value).toFixed(1)}%`} />
                <Bar dataKey="lossPercentage" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TrendChartsProps {
  monthlyData: any[];
}

export function TrendCharts({ monthlyData }: TrendChartsProps) {
  const lossAnalysisData = monthlyData.map(d => ({
    month: d.month.substring(0, 3),
    'Stage 1 Loss': d.stage1Loss,
    'Stage 2 Loss': d.stage2Loss,
  }));

  return (
    <>
      {/* Monthly Consumption Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="a1" stroke="#0088FE" name="A1 (L1)" strokeWidth={2} />
                <Line type="monotone" dataKey="a2" stroke="#00C49F" name="A2 (L2+DC)" strokeWidth={2} />
                <Line type="monotone" dataKey="a3" stroke="#FFBB28" name="A3 (L3+DC)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Loss Analysis */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Loss Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lossAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
                <Legend />
                <Bar dataKey="Stage 1 Loss" stackId="a" fill="#FF8042" />
                <Bar dataKey="Stage 2 Loss" stackId="a" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}