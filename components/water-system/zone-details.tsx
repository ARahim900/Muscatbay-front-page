"use client"

import { useState, useEffect } from "react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts"
import {
  Droplet,
  TrendingUp,
  TrendingDown,
  Filter,
  CalendarDays,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Map,
} from "lucide-react"

// Enhanced Card Component with gradient backgrounds
const Card = ({ title, value, unit, trend, icon, className = "", secondaryValue, secondaryUnit }) => {
  const trendColor = trend > 0 ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"
  const TrendIcon = trend > 0 ? TrendingUp : TrendingDown
  const defaultClasses = "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"

  return (
    <div
      className={`rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 border ${className || defaultClasses}`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {icon && <div className="text-indigo-500 dark:text-indigo-400">{icon}</div>}
      </div>
      <div className="flex items-baseline mb-1">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
        {unit && <span className="ml-1.5 text-lg text-gray-500 dark:text-gray-400">{unit}</span>}
      </div>
      {secondaryValue !== undefined && secondaryValue !== null && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          ({secondaryValue} {secondaryUnit})
        </p>
      )}
      {trend !== null && trend !== undefined && (
        <div className={`text-xs flex items-center ${trendColor}`}>
          <TrendIcon size={14} className="mr-1" />
          <span>
            {Math.abs(trend)}% {trend > 0 ? "Increase" : "Decrease"}
          </span>
          <span className="ml-1 text-gray-400 dark:text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  )
}

// Zone mapping configuration
const ZONE_MAPPING = {
  "Zone 01 (FM)": { dataKey: "FM", label: "Zone 01 (FM)" },
  "Zone 03(A)": { dataKey: "03(A)", label: "Zone 03(A)" },
  "Zone 03(B)": { dataKey: "03(B)", label: "Zone 03(B)" },
  "Zone 05": { dataKey: "05", label: "Zone 05" },
  "Zone 08": { dataKey: "08", label: "Zone 08" },
  "Main BULK": { dataKey: "MAIN", label: "Main BULK" },
}

// Color palette
const COLORS = {
  indigo: "#4f46e5",
  sky: "#0ea5e9",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  violet: "#8b5cf6",
}

export function ZoneDetails({ data, isDarkMode }) {
  const [selectedZone, setSelectedZone] = useState("Zone 01 (FM)")
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [zoneData, setZoneData] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const [individualMeters, setIndividualMeters] = useState([])

  // Initialize period
  useEffect(() => {
    if (data && data.periods && data.periods.length > 0 && !selectedPeriod) {
      setSelectedPeriod(data.periods[data.periods.length - 1])
    }
  }, [data, selectedPeriod])

  // Process zone data when zone or period changes
  useEffect(() => {
    if (!data || !selectedPeriod || !selectedZone) return

    const zoneConfig = ZONE_MAPPING[selectedZone]
    const currentStats = data.stats[selectedPeriod]
    
    if (!currentStats) return

    // Handle Main BULK specially
    if (selectedZone === "Main BULK") {
      // Main BULK includes all Zone Bulk meters and DC meters
      const l1Meter = data.meters.find(m => m.label === "L1")
      const l2Meters = data.meters.filter(m => m.label === "L2")
      const dcMeters = data.meters.filter(m => m.label === "DC")
      
      const zoneBulkSum = l2Meters.reduce((sum, m) => sum + (m.readings[selectedPeriod] || 0), 0)
      const dcSum = dcMeters.reduce((sum, m) => sum + (m.readings[selectedPeriod] || 0), 0)
      const totalL2 = zoneBulkSum + dcSum
      const l1Supply = l1Meter ? l1Meter.readings[selectedPeriod] || 0 : 0
      const loss = l1Supply - totalL2
      const lossPercent = l1Supply > 0 ? (loss / l1Supply) * 100 : 0

      setZoneData({
        bulk: l1Supply,
        individual: totalL2,
        loss: loss,
        lossPercent: lossPercent
      })

      // Get all L2 and DC meters as individual meters
      const meters = [...l2Meters, ...dcMeters].map(m => ({
        label: m.meterLabel,
        type: m.label === "L2" ? "Zone Bulk" : "Direct Connection",
        reading: m.readings[selectedPeriod] || 0,
        zone: m.zone || "Direct",
        acctNum: m.acctNum || "N/A"
      })).sort((a, b) => b.reading - a.reading)

      setIndividualMeters(meters)
    } else {
      // Regular zone processing
      const zoneKey = zoneConfig.dataKey
      const zoneBulkMeter = data.meters.find(m => 
        m.label === "L2" && m.zone && (
          m.zone === selectedZone || 
          m.zone.includes(zoneKey) ||
          (zoneKey === "FM" && m.zone.includes("FM"))
        )
      )
      
      if (!zoneBulkMeter) {
        setZoneData(null)
        setIndividualMeters([])
        return
      }

      const zoneBulkReading = zoneBulkMeter.readings[selectedPeriod] || 0
      
      // Find individual meters for this zone
      const zoneIndividualMeters = data.meters.filter(m => 
        (m.label === "L3" || m.label === "DC") && 
        m.zone && (
          m.zone === selectedZone || 
          m.zone.includes(zoneKey) ||
          (zoneKey === "FM" && m.zone.includes("FM"))
        )
      )
      
      const individualSum = zoneIndividualMeters.reduce((sum, m) => 
        sum + (m.readings[selectedPeriod] || 0), 0
      )
      
      const loss = zoneBulkReading - individualSum
      const lossPercent = zoneBulkReading > 0 ? (loss / zoneBulkReading) * 100 : 0

      setZoneData({
        bulk: zoneBulkReading,
        individual: individualSum,
        loss: loss,
        lossPercent: lossPercent
      })

      // Prepare individual meters data
      const meters = zoneIndividualMeters.map(m => ({
        label: m.meterLabel,
        type: m.type || "Unknown",
        reading: m.readings[selectedPeriod] || 0,
        zone: m.zone,
        acctNum: m.acctNum || "N/A"
      })).sort((a, b) => b.reading - a.reading)

      setIndividualMeters(meters)
    }

    // Prepare historical data
    const historicalData = data.periods.map(period => {
      if (selectedZone === "Main BULK") {
        const stats = data.stats[period]
        return {
          name: period,
          bulk: stats?.l1Supply || 0,
          individual: stats?.l2Volume || 0,
          loss: stats?.stage1LossPercent || 0
        }
      } else {
        const zoneKey = zoneConfig.dataKey
        const zoneBulkMeter = data.meters.find(m => 
          m.label === "L2" && m.zone && (
            m.zone === selectedZone || 
            m.zone.includes(zoneKey) ||
            (zoneKey === "FM" && m.zone.includes("FM"))
          )
        )
        
        if (!zoneBulkMeter) return { name: period, bulk: 0, individual: 0, loss: 0 }

        const bulk = zoneBulkMeter.readings[period] || 0
        const zoneIndividualMeters = data.meters.filter(m => 
          (m.label === "L3" || m.label === "DC") && 
          m.zone && (
            m.zone === selectedZone || 
            m.zone.includes(zoneKey) ||
            (zoneKey === "FM" && m.zone.includes("FM"))
          )
        )
        const individual = zoneIndividualMeters.reduce((sum, m) => 
          sum + (m.readings[period] || 0), 0
        )
        const lossPercent = bulk > 0 ? ((bulk - individual) / bulk) * 100 : 0

        return {
          name: period,
          bulk: bulk,
          individual: individual,
          loss: lossPercent
        }
      }
    })

    setHistoricalData(historicalData)
  }, [data, selectedZone, selectedPeriod])

  // Calculate trends
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return null
    return ((current - previous) / previous) * 100
  }

  const previousPeriodIndex = data?.periods?.indexOf(selectedPeriod) - 1
  const previousPeriod = previousPeriodIndex >= 0 ? data.periods[previousPeriodIndex] : null
  
  let bulkTrend = null
  let individualTrend = null
  let lossTrend = null

  if (previousPeriod && historicalData.length > 0) {
    const currentData = historicalData.find(d => d.name === selectedPeriod)
    const previousData = historicalData.find(d => d.name === previousPeriod)
    
    if (currentData && previousData) {
      bulkTrend = calculateTrend(currentData.bulk, previousData.bulk)
      individualTrend = calculateTrend(currentData.individual, previousData.individual)
      lossTrend = calculateTrend(currentData.loss, previousData.loss)
    }
  }

  const formatNumber = (num) => num?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "0"

  // Chart styling helper
  const getChartBaseProps = () => ({
    axisTextColor: isDarkMode ? "#9ca3af" : "#4b5563",
    gridColor: isDarkMode ? "rgba(55, 65, 81, 0.5)" : "rgba(229, 231, 235, 0.8)",
    tooltipStyle: {
      contentStyle: {
        borderRadius: "8px",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: isDarkMode ? "rgba(31, 41, 55, 0.95)" : "rgba(255, 255, 255, 0.95)",
      },
      itemStyle: {
        fontSize: 12,
        color: isDarkMode ? "#d1d5db" : "#4b5563",
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: "5px",
        color: isDarkMode ? "#f3f4f6" : "#4b5563",
      },
    },
    legendStyle: {
      fontSize: "12px",
      color: isDarkMode ? "#d1d5db" : "#4b5563",
    },
  })

  if (!data || !selectedPeriod) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading zone data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Zone Details Analysis</h2>
          
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Zone Selector */}
            <div className="relative">
              <Map
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-gray-700 pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 dark:text-gray-200"
                aria-label="Select Zone"
              >
                {Object.keys(ZONE_MAPPING).map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
              <Filter
                size={14}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Period Selector */}
            <div className="relative">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-gray-700 pl-9 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 dark:text-gray-200"
                aria-label="Select Period"
              >
                {data.periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
              <Filter
                size={14}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      {zoneData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title={selectedZone === "Main BULK" ? "L1: Main Supply" : "Zone Bulk Supply"}
            value={formatNumber(zoneData.bulk)}
            unit="m³"
            trend={bulkTrend}
            icon={<Droplet size={20} />}
            className="border-blue-200 dark:border-blue-700 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30"
          />
          <Card
            title={selectedZone === "Main BULK" ? "L2+DC: Zone/Direct" : "Sum of Individual Meters"}
            value={formatNumber(zoneData.individual)}
            unit="m³"
            trend={individualTrend}
            icon={<CheckCircle size={20} />}
            className="border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/30"
          />
          <Card
            title="Loss (Difference)"
            value={zoneData.lossPercent.toFixed(1)}
            unit="%"
            secondaryValue={formatNumber(zoneData.loss)}
            secondaryUnit="m³"
            trend={lossTrend}
            icon={<AlertTriangle size={20} />}
            className="bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700"
          />
        </div>
      )}

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          {selectedZone} Historical Performance
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historicalData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={getChartBaseProps().gridColor} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: getChartBaseProps().axisTextColor }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Volume (m³)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 12, fill: getChartBaseProps().axisTextColor },
                }}
                tick={{ fontSize: 11, fill: getChartBaseProps().axisTextColor }}
                tickFormatter={formatNumber}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Loss (%)",
                  angle: 90,
                  position: "insideRight",
                  style: { textAnchor: "middle", fontSize: 12, fill: getChartBaseProps().axisTextColor },
                }}
                domain={[0, "dataMax + 10"]}
                tick={{ fontSize: 11, fill: getChartBaseProps().axisTextColor }}
                tickFormatter={(v) => `${v}%`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={getChartBaseProps().tooltipStyle.contentStyle}
                itemStyle={getChartBaseProps().tooltipStyle.itemStyle}
                labelStyle={getChartBaseProps().tooltipStyle.labelStyle}
                formatter={(value, name) => {
                  if (name === "Loss (%)") return [`${value}%`, name]
                  return [`${formatNumber(value)} m³`, name]
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={getChartBaseProps().legendStyle} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bulk"
                name="Bulk Supply (m³)"
                stroke={COLORS.indigo}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="individual"
                name="Individual Sum (m³)"
                stroke={COLORS.emerald}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="loss"
                name="Loss (%)"
                stroke={COLORS.rose}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Meters Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Individual Meters - {selectedZone}
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {["#", "Meter Label", "Account #", "Type", "Zone", "Reading (m³)", "% of Total"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {individualMeters.length > 0 ? (
              individualMeters.map((meter, index) => (
                <tr
                  key={`${meter.label}-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {meter.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {meter.acctNum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                      {meter.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {meter.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatNumber(meter.reading)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {zoneData && zoneData.individual > 0
                      ? ((meter.reading / zoneData.individual) * 100).toFixed(1)
                      : "0.0"}
                    %
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No meters found for this zone.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
