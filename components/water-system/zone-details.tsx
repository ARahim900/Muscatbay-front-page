'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowUpIcon, ArrowDownIcon, Droplets, AlertTriangle, Activity, MapPin,
  TrendingUp, TrendingDown, BarChart3, Search, Calendar, Filter
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ZoneDetailsProps {
  data: any[]
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ data }) => {
  const [selectedZone, setSelectedZone] = useState('Main BULK')
  const [selectedMonth, setSelectedMonth] = useState('Apr-25')
  const [searchTerm, setSearchTerm] = useState('')

  // Define zone mappings based on the master database structure
  const zoneConfig = {
    'Main BULK': {
      name: 'Main BULK',
      description: 'Zones Bulk and all DC meters',
      bulkMeters: ['C43659'], // Main Bulk (NAMA)
      individualMeters: 'L2+DC',
      color: '#3B82F6'
    },
    'Zone 01 (FM)': {
      name: 'Zone 01 (FM)',
      description: 'Zone 01 (FM) meters',
      bulkMeters: ['4300346'], // ZONE FM ( BULK ZONE FM )
      individualMeters: ['Zone_01_(FM)'],
      color: '#10B981'
    },
    'Zone 03(A)': {
      name: 'Zone 03(A)',
      description: 'Zone 03(A) meters',
      bulkMeters: ['4300343'], // ZONE 3A (Bulk Zone 3A)
      individualMeters: ['Zone_03_(A)'],
      color: '#F59E0B'
    },
    'Zone 03(B)': {
      name: 'Zone 03(B)',
      description: 'Zone 03(B) meters',
      bulkMeters: ['4300344'], // ZONE 3B (Bulk Zone 3B)
      individualMeters: ['Zone_03_(B)'],
      color: '#EF4444'
    },
    'Zone 05': {
      name: 'Zone 05',
      description: 'Zone 05 meters',
      bulkMeters: ['4300345'], // ZONE 5 (Bulk Zone 5)
      individualMeters: ['Zone_05'],
      color: '#8B5CF6'
    },
    'Zone 08': {
      name: 'Zone 08',
      description: 'Zone 08 meters',
      bulkMeters: ['4300342'], // ZONE 8 (Bulk Zone 8)
      individualMeters: ['Zone_08'],
      color: '#EC4899'
    }
  }

  // Get available months from data
  const availableMonths = useMemo(() => {
    const months = []
    const sampleMeter = data[0]
    if (sampleMeter) {
      Object.keys(sampleMeter).forEach(key => {
        if (key.includes('-')) {
          months.push(key)
        }
      })
    }
    return months
  }, [data])

  // Calculate zone metrics
  const calculateZoneMetrics = (zone: string, month: string) => {
    let bulkSupply = 0
    let individualSum = 0
    
    if (zone === 'Main BULK') {
      // For Main BULK, get L1 meter reading
      const mainBulk = data.find(m => m['Acct #'] === 'C43659')
      bulkSupply = mainBulk?.[month] || 0
      
      // Sum all L2 and DC meters
      data.forEach(meter => {
        if (meter.Label === 'L2' || meter.Label === 'DC') {
          individualSum += meter[month] || 0
        }
      })
    } else {
      const config = zoneConfig[zone]
      
      // Get bulk meter reading
      config.bulkMeters.forEach(bulkMeterAcct => {
        const meter = data.find(m => m['Acct #'] === bulkMeterAcct)
        bulkSupply += meter?.[month] || 0
      })
      
      // Sum individual meters for this zone
      data.forEach(meter => {
        if (meter.Label === 'L3' && config.individualMeters.includes(meter.Zone)) {
          individualSum += meter[month] || 0
        }
      })
    }
    
    const loss = bulkSupply - individualSum
    const lossPercentage = bulkSupply > 0 ? (loss / bulkSupply) * 100 : 0
    
    return {
      bulkSupply,
      individualSum,
      loss,
      lossPercentage
    }
  }

  // Get current metrics
  const currentMetrics = useMemo(() => {
    return calculateZoneMetrics(selectedZone, selectedMonth)
  }, [selectedZone, selectedMonth, data])

  // Get historical data for charts
  const historicalData = useMemo(() => {
    return availableMonths.map(month => {
      const metrics = calculateZoneMetrics(selectedZone, month)
      return {
        month: month,
        bulkSupply: metrics.bulkSupply,
        individualSum: metrics.individualSum,
        loss: metrics.loss,
        lossPercentage: parseFloat(metrics.lossPercentage.toFixed(1))
      }
    })
  }, [selectedZone, availableMonths, data])

  // Get individual meters for selected zone
  const individualMeters = useMemo(() => {
    let meters = []
    
    if (selectedZone === 'Main BULK') {
      // Show all L2 and DC meters
      meters = data.filter(meter => meter.Label === 'L2' || meter.Label === 'DC')
    } else {
      // Show L3 meters for specific zone
      const config = zoneConfig[selectedZone]
      meters = data.filter(meter => 
        meter.Label === 'L3' && config.individualMeters.includes(meter.Zone)
      )
    }
    
    // Apply search filter
    if (searchTerm) {
      meters = meters.filter(meter => 
        meter['Meter Label']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meter['Acct #']?.includes(searchTerm) ||
        meter.Type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return meters
  }, [data, selectedZone, searchTerm])

  // Calculate change from previous month
  const calculateChange = () => {
    const currentIndex = availableMonths.indexOf(selectedMonth)
    if (currentIndex > 0) {
      const prevMonth = availableMonths[currentIndex - 1]
      const prevMetrics = calculateZoneMetrics(selectedZone, prevMonth)
      const change = ((currentMetrics.bulkSupply - prevMetrics.bulkSupply) / prevMetrics.bulkSupply) * 100
      return change
    }
    return 0
  }

  const change = calculateChange()

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {entry.name.includes('%') ? '%' : 'm³'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Zone Analysis Dashboard</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filters:</span>
            </div>
            
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(zoneConfig).map(zone => (
                  <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">{zoneConfig[selectedZone]?.description}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Zone Bulk Supply
            </CardTitle>
            <Droplets className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.bulkSupply.toLocaleString()} m³</div>
            <div className="flex items-center mt-1">
              {change > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+{change.toFixed(1)}%</span>
                </>
              ) : change < 0 ? (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs text-red-500">{change.toFixed(1)}%</span>
                </>
              ) : (
                <span className="text-xs text-gray-500">No change</span>
              )}
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sum of Individual Meters
            </CardTitle>
            <Activity className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.individualSum.toLocaleString()} m³</div>
            <p className="text-xs text-gray-500 mt-1">
              {individualMeters.length} active meters
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Loss (Difference)
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {currentMetrics.loss.toLocaleString()} m³
            </div>
            <p className="text-xs text-red-600">
              {currentMetrics.lossPercentage.toFixed(1)}% of supply
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Consumption Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bulkSupply"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Bulk Supply (m³)"
                />
                <Line
                  type="monotone"
                  dataKey="individualSum"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Individual Sum (m³)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Loss Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Loss (m³)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="lossPercentage"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Loss %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Individual Meters Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Individual Meter Details</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-700">Meter Label</th>
                  <th className="text-left p-3 font-medium text-gray-700">Account #</th>
                  <th className="text-left p-3 font-medium text-gray-700">Type</th>
                  <th className="text-left p-3 font-medium text-gray-700">Zone</th>
                  <th className="text-right p-3 font-medium text-gray-700">{selectedMonth} Reading</th>
                  <th className="text-right p-3 font-medium text-gray-700">% of Total</th>
                  <th className="text-center p-3 font-medium text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {individualMeters.map((meter, index) => {
                  const reading = meter[selectedMonth] || 0
                  const percentage = currentMetrics.individualSum > 0 
                    ? (reading / currentMetrics.individualSum * 100).toFixed(1) 
                    : 0
                  
                  // Get previous month reading for trend
                  const currentIndex = availableMonths.indexOf(selectedMonth)
                  const prevReading = currentIndex > 0 ? meter[availableMonths[currentIndex - 1]] || 0 : 0
                  const trend = reading - prevReading
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium">{meter['Meter Label'] || '-'}</td>
                      <td className="p-3 text-gray-600">{meter['Acct #'] || '-'}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          meter.Type === 'Zone Bulk' ? 'bg-blue-100 text-blue-800' :
                          meter.Label === 'DC' ? 'bg-purple-100 text-purple-800' :
                          meter.Type === 'IRR_Servies' ? 'bg-green-100 text-green-800' :
                          meter.Type === 'Residential (Villa)' ? 'bg-orange-100 text-orange-800' :
                          meter.Type === 'Residential (Apart)' ? 'bg-yellow-100 text-yellow-800' :
                          meter.Type === 'Retail' ? 'bg-pink-100 text-pink-800' :
                          meter.Type === 'MB_Common' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {meter.Type || meter.Label}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{meter.Zone || '-'}</td>
                      <td className="p-3 text-right font-medium">{reading.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min(100, percentage)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-12 text-right">{percentage}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center">
                          {trend > 0 ? (
                            <div className="flex items-center text-green-600">
                              <ArrowUpIcon className="h-4 w-4" />
                              <span className="text-xs ml-1">+{trend}</span>
                            </div>
                          ) : trend < 0 ? (
                            <div className="flex items-center text-red-600">
                              <ArrowDownIcon className="h-4 w-4" />
                              <span className="text-xs ml-1">{trend}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {individualMeters.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No meters found matching your search criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ZoneDetails
