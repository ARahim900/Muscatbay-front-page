'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Building2, Droplets, TrendingDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { processWaterData, formatNumber, formatPercentage, MONTHS, ZONE_MAPPING, WaterMeterData } from '@/lib/water-data-utils'

// Dynamically import Recharts components to avoid SSR issues
const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
)
const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
)
const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
)
const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
)
const YAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
)
const CartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
)
const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
)

interface WaterGroupDetailsProps {
  waterData: WaterMeterData[];
}

const ZONE_OPTIONS = [
  { value: 'Zone 01 (FM)', key: 'Zone_01_(FM)' },
  { value: 'Zone 03(A)', key: 'Zone_03_(A)' },
  { value: 'Zone 03(B)', key: 'Zone_03_(B)' },
  { value: 'Zone 05', key: 'Zone_05' },
  { value: 'Zone 08', key: 'Zone_08' },
  { value: 'Main BULK', key: 'Main Bulk' },
];

export function WaterGroupDetails({ waterData }: WaterGroupDetailsProps) {
  const [selectedZone, setSelectedZone] = useState('Zone 01 (FM)');
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[MONTHS.length - 1]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { zoneData } = useMemo(() => 
    processWaterData(waterData), [waterData]
  );

  const currentZone = zoneData[selectedZone];
  const zoneKey = ZONE_OPTIONS.find(opt => opt.value === selectedZone)?.key || '';

  // Get zone-specific meters based on selection
  const zoneMeters = useMemo(() => {
    if (selectedZone === 'Main BULK') {
      // For Main BULK, include Zone Bulk meters and DC meters
      return waterData.filter(meter => 
        meter.Type === 'Main BULK' || 
        meter.Type === 'Zone Bulk' || 
        meter.Label === 'DC'
      );
    }
    return waterData.filter(meter => meter.Zone === zoneKey);
  }, [waterData, selectedZone, zoneKey]);

  // Calculate zone metrics for the selected month
  const zoneMetrics = useMemo(() => {
    const bulkMeter = zoneMeters.find(meter => 
      meter.Type === 'Zone Bulk' || 
      meter.Type === 'Main BULK' ||
      meter['Meter Label'].includes('Bulk')
    );
    const bulkValue = bulkMeter ? Number(bulkMeter[selectedMonth]) || 0 : 0;

    const individualMeters = zoneMeters.filter(meter => 
      meter !== bulkMeter && meter.Label !== 'L1' && meter.Label !== 'L2'
    );
    const individualTotal = individualMeters.reduce(
      (sum, meter) => sum + (Number(meter[selectedMonth]) || 0), 0
    );

    return {
      bulkValue,
      individualTotal,
      loss: bulkValue - individualTotal,
      lossPercentage: bulkValue > 0 ? ((bulkValue - individualTotal) / bulkValue) * 100 : 0
    };
  }, [zoneMeters, selectedMonth]);

  // Prepare trend data for line charts
  const trendData = useMemo(() => {
    return MONTHS.map(month => {
      const bulkMeter = zoneMeters.find(meter => 
        meter.Type === 'Zone Bulk' || 
        meter.Type === 'Main BULK' ||
        meter['Meter Label'].includes('Bulk')
      );
      const bulkValue = bulkMeter ? Number(bulkMeter[month]) || 0 : 0;

      const individualMeters = zoneMeters.filter(meter => 
        meter !== bulkMeter && meter.Label !== 'L1' && meter.Label !== 'L2'
      );
      const individualTotal = individualMeters.reduce(
        (sum, meter) => sum + (Number(meter[month]) || 0), 0
      );

      return {
        month: month.substring(0, 3),
        bulk: bulkValue,
        individual: individualTotal,
        loss: bulkValue - individualTotal
      };
    });
  }, [zoneMeters]);

  // Filter meters for table display
  const filteredMeters = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return zoneMeters.filter(meter => 
      meter['Meter Label'].toLowerCase().includes(searchLower) ||
      meter['Acct #'].toString().toLowerCase().includes(searchLower) ||
      meter.Type.toLowerCase().includes(searchLower)
    );
  }, [zoneMeters, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Group Details</h2>
        <div className="flex gap-4">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              {ZONE_OPTIONS.map(zone => (
                <SelectItem key={zone.value} value={zone.value}>
                  {zone.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zone Bulk</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(zoneMetrics.bulkValue)}</div>
            <p className="text-xs text-muted-foreground">Bulk meter reading</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sum of Individual Meters</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(zoneMetrics.individualTotal)}</div>
            <p className="text-xs text-muted-foreground">Total from all meters</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loss (Difference)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatNumber(zoneMetrics.loss)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(zoneMetrics.lossPercentage)} of bulk
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Zone Bulk Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  <Line 
                    type="monotone" 
                    dataKey="bulk" 
                    stroke="#0088FE" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Individual Meters Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  <Line 
                    type="monotone" 
                    dataKey="individual" 
                    stroke="#00C49F" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loss Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(Number(value))} />
                  <Line 
                    type="monotone" 
                    dataKey="loss" 
                    stroke="#FF8042" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Meters Table */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Meter Details</CardTitle>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search meters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meter Label</TableHead>
                  <TableHead>Account #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Parent Meter</TableHead>
                  <TableHead className="text-right">{selectedMonth}</TableHead>
                  <TableHead className="text-right">Previous Month</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeters.map((meter, index) => {
                  const currentValue = Number(meter[selectedMonth]) || 0;
                  const previousMonthIndex = MONTHS.indexOf(selectedMonth) - 1;
                  const previousMonth = previousMonthIndex >= 0 ? MONTHS[previousMonthIndex] : null;
                  const previousValue = previousMonth ? Number(meter[previousMonth]) || 0 : 0;
                  const change = currentValue - previousValue;
                  const changePercentage = previousValue > 0 ? (change / previousValue) * 100 : 0;

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{meter['Meter Label']}</TableCell>
                      <TableCell>{meter['Acct #']}</TableCell>
                      <TableCell>{meter.Type}</TableCell>
                      <TableCell>{meter['Parent Meter']}</TableCell>
                      <TableCell className="text-right">{formatNumber(currentValue)}</TableCell>
                      <TableCell className="text-right">{formatNumber(previousValue)}</TableCell>
                      <TableCell className="text-right">
                        <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {change >= 0 ? '+' : ''}{formatNumber(change)}
                          <span className="text-xs ml-1">
                            ({changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(1)}%)
                          </span>
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}