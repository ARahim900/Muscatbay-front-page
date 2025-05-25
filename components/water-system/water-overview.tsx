'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import { processWaterData, formatNumber, formatPercentage, MONTHS, WaterMeterData } from '@/lib/water-data-utils'
import { ChartWrapper } from './chart-wrapper'

// Lazy load charts
import dynamic from 'next/dynamic'

const WaterCharts = dynamic(
  () => import('./water-charts').then(mod => mod.WaterCharts),
  { 
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
);

const TrendCharts = dynamic(
  () => import('./water-charts').then(mod => mod.TrendCharts),
  { 
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 rounded animate-pulse" />
        </CardContent>
      </Card>
    )
  }
);

interface WaterOverviewProps {
  waterData: WaterMeterData[];
}

export function WaterOverview({ waterData }: WaterOverviewProps) {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[MONTHS.length - 1]);
  
  const { monthlyData, zoneData } = useMemo(() => {
    try {
      return processWaterData(waterData);
    } catch (error) {
      console.error('Error processing water data:', error);
      return { monthlyData: [], zoneData: {} };
    }
  }, [waterData]);

  const currentMonthData = monthlyData.find(d => d.month === selectedMonth) || monthlyData[monthlyData.length - 1] || {
    month: selectedMonth,
    l1: 0,
    l2: 0,
    l3: 0,
    dc: 0,
    a1: 0,
    a2: 0,
    a3: 0,
    stage1Loss: 0,
    stage2Loss: 0,
    totalLoss: 0
  };

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
              {currentMonthData.l1 > 0 ? formatPercentage((currentMonthData.stage1Loss / currentMonthData.l1) * 100) : '0.0%'} of total
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
              {currentMonthData.l2 > 0 ? formatPercentage((currentMonthData.stage2Loss / currentMonthData.l2) * 100) : '0.0%'} of L2
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
              {currentMonthData.l1 > 0 ? formatPercentage((currentMonthData.totalLoss / currentMonthData.l1) * 100) : '0.0%'} of total input
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <ChartWrapper>
        <WaterCharts 
          currentMonthData={currentMonthData}
          monthlyData={monthlyData}
          zoneData={zoneData}
        />
      </ChartWrapper>

      {/* Trend Charts */}
      <ChartWrapper>
        <TrendCharts monthlyData={monthlyData} />
      </ChartWrapper>
    </div>
  );
}