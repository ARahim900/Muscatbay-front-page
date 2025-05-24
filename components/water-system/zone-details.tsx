'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpIcon, ArrowDownIcon, Droplets, AlertTriangle, Activity, MapPin } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ZoneDetailsProps {
  data: any[]
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ data }) => {
  const [selectedZone, setSelectedZone] = useState('Main BULK')
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  // Define zone mappings
  const zoneConfig = {
    'Main BULK': {
      bulkMeters: ['L1 Main Supply'],
      individualMeters: 'L2+DC',
      description: 'Main Bulk Supply vs All Zone Bulk Meters + DC'
    },
    'Zone 01 (FM)': {
      bulkMeters: ['Zone FM (01) Bulk'],
      individualMeters: ['FM'],
      description: 'Zone FM Bulk Meter vs Individual FM Meters'
    },
    'Zone 03(A)': {
      bulkMeters: ['Zone 03(A) Bulk'],
      individualMeters: ['03(A)'],
      description: 'Zone 03(A) Bulk Meter vs Individual 03(A) Meters'
    },
    'Zone 03(B)': {
      bulkMeters: ['Zone 03(B) Bulk'],
      individualMeters: ['03(B)'],
      description: 'Zone 03(B) Bulk Meter vs Individual 03(B) Meters'
    },
    'Zone 05': {
      bulkMeters: ['Zone 05 Bulk'],
      individualMeters: ['05'],
      description: 'Zone 05 Bulk Meter vs Individual 05 Meters'
    },
    'Zone 08': {
      bulkMeters: ['Zone 08 Bulk'],
      individualMeters: ['08'],
      description: 'Zone 08 Bulk Meter vs Individual 08 Meters'
    }
  }

  // Calculate zone data
  const zoneData = useMemo(() => {
    const months = ['Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 
                    'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
                    'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25']
    
    return months.map((month, index) => {
      let bulkSupply = 0
      let individualSum = 0
      
      if (selectedZone === 'Main BULK') {
        // For Main BULK, use L1 vs L2+DC
        bulkSupply = data.find(m => m['Meter Label'] === 'L1 Main Supply')?.[month] || 0
        
        // Sum all L2 and DC meters
        data.forEach(meter => {
          if (meter.Level === 'L2' || meter.Type === 'DC') {
            individualSum += meter[month] || 0
          }
        })
      } else {
        // For individual zones
        const config = zoneConfig[selectedZone]
        
        // Get bulk meter reading
        config.bulkMeters.forEach(bulkMeter => {
          const meter = data.find(m => m['Meter Label'] === bulkMeter)
          bulkSupply += meter?.[month] || 0
        })
        
        // Sum individual meters for this zone
        data.forEach(meter => {
          if ((meter.Level === 'L3' || meter.Type === 'DC') && 
              config.individualMeters.includes(meter.Zone)) {
            individualSum += meter[month] || 0
          }
        })
      }
      
      const loss = bulkSupply - individualSum
      const lossPercentage = bulkSupply > 0 ? (loss / bulkSupply) * 100 : 0
      
      return {
        month,
        bulkSupply,
        individualSum,
        loss,
        lossPercentage
      }
    })
  }, [data, selectedZone])

  // Get current month data (latest)
  const currentData = zoneData[zoneData.length - 1] || {}
  
  // Get individual meters for selected zone
  const individualMeters = useMemo(() => {
    if (selectedZone === 'Main BULK') {
      // Show all L2 and DC meters
      return data.filter(meter => meter.Level === 'L2' || meter.Type === 'DC')
    } else {
      // Show L3 and DC meters for specific zone
      const config = zoneConfig[selectedZone]
      return data.filter(meter => 
        (meter.Level === 'L3' || meter.Type === 'DC') && 
        config.individualMeters.includes(meter.Zone)
      )
    }
  }, [data, selectedZone])

  // Calculate total for percentage
  const totalIndividualSum = individualMeters.reduce((sum, meter) => 
    sum + (meter['Apr-25'] || 0), 0
  )

  // Filter data by period
  const filteredData = useMemo(() => {
    if (selectedPeriod === 'all') return zoneData
    
    const monthsToShow = {
      '3months': 3,
      '6months': 6,
      '12months': 12
    }[selectedPeriod] || 12
    
    return zoneData.slice(-monthsToShow)
  }, [zoneData, selectedPeriod])

  return (
    <div className="space-y-6">
      {/* Zone Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Zone Analysis</h3>
        </div>
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Zone" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(zoneConfig).map(zone => (
              <SelectItem key={zone} value={zone}>{zone}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">{zoneConfig[selectedZone]?.description}</p>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {selectedZone === 'Main BULK' ? 'L1 Main Supply' : 'Zone Bulk Supply'}
            </CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.bulkSupply?.toLocaleString() || 0} m³</div>
            <p className="text-xs text-muted-foreground">Current month reading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {selectedZone === 'Main BULK' ? 'Sum of L2+DC' : 'Sum of Individual Meters'}
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.individualSum?.toLocaleString() || 0} m³</div>
            <p className="text-xs text-muted-foreground">Total consumption</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loss (Difference)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentData.loss?.toLocaleString() || 0} m³
            </div>
            <p className="text-xs text-red-600 dark:text-red-400">
              {currentData.lossPercentage?.toFixed(1) || 0}% of supply
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bulkSupply"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Bulk Supply (m³)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="individualSum"
                stroke="#10b981"
                strokeWidth={2}
                name="Individual Sum (m³)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lossPercentage"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Loss %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Meters Table */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Meter Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-2">Meter Label</th>
                  <th className="text-left p-2">Account #</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Zone</th>
                  <th className="text-right p-2">Apr-25 Reading</th>
                  <th className="text-right p-2">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {individualMeters.map((meter, index) => {
                  const reading = meter['Apr-25'] || 0
                  const percentage = totalIndividualSum > 0 
                    ? (reading / totalIndividualSum * 100).toFixed(1) 
                    : 0
                  
                  return (
                    <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="p-2">{meter['Meter Label']}</td>
                      <td className="p-2">{meter.pro || '-'}</td>
                      <td className="p-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${
                          meter.Type === 'DC' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          meter.Type === 'IRR_Services' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          meter.Type === 'Residential_Villa' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                          meter.Type === 'Residential_Apartment' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                          meter.Type === 'Retail' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {meter.Type}
                        </span>
                      </td>
                      <td className="p-2">{meter.Zone}</td>
                      <td className="p-2 text-right font-medium">{reading.toLocaleString()}</td>
                      <td className="p-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>{percentage}%</span>
                          {reading > 1000 ? (
                            <ArrowUpIcon className="h-3 w-3 text-red-500" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ZoneDetails
