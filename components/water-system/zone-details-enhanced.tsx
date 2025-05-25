'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowUpIcon, ArrowDownIcon, Droplets, AlertTriangle, Activity, MapPin,
  TrendingUp, TrendingDown, BarChart3, Search, Calendar, Filter,
  Building2, Users, Gauge, CircleOff
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ZoneDetailsProps {
  data: any[]
}

const ZoneDetailsEnhanced: React.FC<ZoneDetailsProps> = ({ data }) => {
  const [selectedZone, setSelectedZone] = useState('Zone 01 (FM)')
  const [selectedMonth, setSelectedMonth] = useState('Apr-25')
  const [searchTerm, setSearchTerm] = useState('')

  // Enhanced zone mappings based on the master database structure
  const zoneConfig = {
    'Zone 01 (FM)': {
      name: 'Zone 01 (FM)',
      description: 'Zone 01 (FM) meters',
      bulkMeterLabel: 'Zone FM (01) Bulk',
      zoneFilter: 'FM',
      color: '#10B981',
      icon: <Building2 className="h-4 w-4" />
    },
    'Zone 03(A)': {
      name: 'Zone 03(A)',
      description: 'Zone 03(A) meters',
      bulkMeterLabel: 'Zone 03(A) Bulk',
      zoneFilter: '03(A)',
      color: '#F59E0B',
      icon: <Users className="h-4 w-4" />
    },
    'Zone 03(B)': {
      name: 'Zone 03(B)',
      description: 'Zone 03(B) meters',
      bulkMeterLabel: 'Zone 03(B) Bulk',
      zoneFilter: '03(B)',
      color: '#EF4444',
      icon: <Building2 className="h-4 w-4" />
    },
    'Zone 05': {
      name: 'Zone 05',
      description: 'Zone 05 meters',
      bulkMeterLabel: 'Zone 05 Bulk',
      zoneFilter: '05',
      color: '#8B5CF6',
      icon: <Gauge className="h-4 w-4" />
    },
    'Zone 08': {
      name: 'Zone 08',
      description: 'Zone 08 meters',
      bulkMeterLabel: 'Zone 08 Bulk',
      zoneFilter: '08',
      color: '#EC4899',
      icon: <Users className="h-4 w-4" />
    },
    'Main BULK': {
      name: 'Main BULK',
      description: 'Zones Bulk and all DC meters',
      bulkMeterLabel: 'L1 Main Supply',
      zoneFilter: 'Main',
      color: '#3B82F6',
      icon: <Droplets className="h-4 w-4" />
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
    const config = zoneConfig[zone]
    
    if (zone === 'Main BULK') {
      // For Main BULK, get L1 meter reading
      const mainBulk = data.find(m => m['Meter Label'] === config.bulkMeterLabel)
      bulkSupply = mainBulk?.[month] || 0
      
      // Sum all L2 and DC meters
      data.forEach(meter => {
        if (meter.Level === 'L2' || meter.Level === 'DC') {
          individualSum += meter[month] || 0
        }
      })
    } else {
      // Get bulk meter reading for specific zone
      const bulkMeter = data.find(m => m['Meter Label'] === config.bulkMeterLabel)
      bulkSupply = bulkMeter?.[month] || 0
      
      // Sum individual meters for this zone (L3 meters with matching zone)
      data.forEach(meter => {
        if (meter.Level === 'L3' && meter.Zone === config.zoneFilter) {
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
    const config = zoneConfig[selectedZone]
    
    if (selectedZone === 'Main BULK') {
      // Show all L2 and DC meters
      meters = data.filter(meter => meter.Level === 'L2' || meter.Level === 'DC')
    } else {
      // Show L3 meters for specific zone
      meters = data.filter(meter => 
        meter.Level === 'L3' && meter.Zone === config.zoneFilter
      )
    }
    
    // Apply search filter
    if (searchTerm) {
      meters = meters.filter(meter => 
        meter['Meter Label']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meter['pro']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Get meter type badge color
  const getTypeBadgeClass = (type: string) => {
    const typeClasses = {
      'Bulk': 'bg-blue-100 text-blue-800',
      'IRR_Services': 'bg-green-100 text-green-800',
      'Residential_Villa': 'bg-orange-100 text-orange-800',
      'Residential_Apartment': 'bg-yellow-100 text-yellow-800',
      'Retail': 'bg-pink-100 text-pink-800',
      'Building_Common': 'bg-indigo-100 text-indigo-800',
      'DC': 'bg-purple-100 text-purple-800',
      'D_Building_Common': 'bg-gray-100 text-gray-800',
      'MB_Common': 'bg-teal-100 text-teal-800',
      'Commercial': 'bg-red-100 text-red-800'
    }
    return typeClasses[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header with Smart Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Zone Analysis Dashboard</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Smart Filters:</span>
            </div>
            
            {/* Zone Filter */}
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-[180px] bg-gray-50">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(zoneConfig).map(zone => (
                  <SelectItem key={zone} value={zone}>
                    <div className="flex items-center gap-2">
                      {zoneConfig[zone].icon}
                      <span>{zone}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Month Filter */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[140px] bg-gray-50">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map(month => (
                  <SelectItem key={month} value={month}>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{month}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
          {zoneConfig[selectedZone]?.icon}
          {zoneConfig[selectedZone]?.description}
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Zone Bulk Supply Card */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Zone Bulk Supply
            </CardTitle>
            <div className="p-2 bg-blue-500 rounded-full">
              <Droplets className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{currentMetrics.bulkSupply.toLocaleString()} m³</div>
            <div className="flex items-center mt-2">
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

        {/* Sum of Individual Meters Card */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sum of Individual
            </CardTitle>
            <div className="p-2 bg-green-500 rounded-full">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{currentMetrics.individualSum.toLocaleString()} m³</div>
            <p className="text-xs text-gray-500 mt-2">
              {individualMeters.length} active meters
            </p>
          </CardContent>
        </Card>

        {/* Loss (Difference) Card */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Loss (Difference)
            </CardTitle>
            <div className="p-2 bg-red-500 rounded-full">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {currentMetrics.loss.toLocaleString()} m³
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-red-600">
                {currentMetrics.lossPercentage.toFixed(1)}% of supply
              </span>
              <div className="flex items-center">
                <CircleOff className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-xs text-gray-500">NRW</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Trends Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Consumption Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} tick={{fontSize: 11}} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Line
                  type="monotone"
                  dataKey="bulkSupply"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Bulk Supply (m³)"
                />
                <Line
                  type="monotone"
                  dataKey="individualSum"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Individual Sum (m³)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loss Analysis Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Loss Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} tick={{fontSize: 11}} />
                <YAxis yAxisId="left" tick={{fontSize: 11}} />
                <YAxis yAxisId="right" orientation="right" tick={{fontSize: 11}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Loss (m³)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="lossPercentage"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  name="Loss %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Individual Meters Table - Modern Design */}
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              Individual Meter Details
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-700 text-sm">Meter Label</th>
                  <th className="text-left p-4 font-medium text-gray-700 text-sm">Account #</th>
                  <th className="text-left p-4 font-medium text-gray-700 text-sm">Type</th>
                  <th className="text-left p-4 font-medium text-gray-700 text-sm">Zone</th>
                  <th className="text-right p-4 font-medium text-gray-700 text-sm">{selectedMonth} Reading</th>
                  <th className="text-right p-4 font-medium text-gray-700 text-sm">% of Total</th>
                  <th className="text-center p-4 font-medium text-gray-700 text-sm">Trend</th>
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
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{meter['Meter Label'] || '-'}</div>
                        {meter['Parent Meter'] && (
                          <div className="text-xs text-gray-500 mt-1">Parent: {meter['Parent Meter']}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{meter['pro'] || '-'}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClass(meter.Type || meter.Level)}`}>
                          {meter.Type || meter.Level}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{meter.Zone || '-'}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-gray-900">{reading.toLocaleString()}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${Math.min(100, percentage)}%`,
                                backgroundColor: zoneConfig[selectedZone]?.color || '#3b82f6'
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-12 text-right">{percentage}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          {trend > 0 ? (
                            <div className="flex items-center text-green-600">
                              <ArrowUpIcon className="h-4 w-4" />
                              <span className="text-xs ml-1 font-medium">+{trend}</span>
                            </div>
                          ) : trend < 0 ? (
                            <div className="flex items-center text-red-600">
                              <ArrowDownIcon className="h-4 w-4" />
                              <span className="text-xs ml-1 font-medium">{trend}</span>
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
              <div className="text-center py-12 text-gray-500">
                <CircleOff className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No meters found</p>
                <p className="text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
          
          {/* Table Footer with Summary */}
          {individualMeters.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">
                  Showing <span className="font-medium text-gray-900">{individualMeters.length}</span> meters
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-gray-600">
                    Total Reading: <span className="font-medium text-gray-900">{currentMetrics.individualSum.toLocaleString()} m³</span>
                  </div>
                  <div className="text-gray-600">
                    Average: <span className="font-medium text-gray-900">
                      {Math.round(currentMetrics.individualSum / individualMeters.length).toLocaleString()} m³
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ZoneDetailsEnhanced