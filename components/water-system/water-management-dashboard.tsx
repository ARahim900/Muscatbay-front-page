'use client'

import { useState, useEffect } from 'react'

// Water data from the HTML dashboard
const waterData = {
  'Jan-24': { L1: 32803, L2: 11964, DC: 16725, L3: 8955 },
  'Feb-24': { L1: 27996, L2: 10292, DC: 14781, L3: 7120 },
  'Mar-24': { L1: 23860, L2: 11087, DC: 12920, L3: 6706 },
  'Apr-24': { L1: 31869, L2: 13380, DC: 15333, L3: 8251 },
  'May-24': { L1: 30737, L2: 11785, DC: 16304, L3: 7388 },
  'Jun-24': { L1: 41953, L2: 15699, DC: 18927, L3: 8938 },
  'Jul-24': { L1: 35166, L2: 18370, DC: 16319, L3: 9642 },
  'Aug-24': { L1: 35420, L2: 15292, DC: 16306, L3: 8634 },
  'Sep-24': { L1: 41341, L2: 14173, DC: 17640, L3: 8064 },
  'Oct-24': { L1: 31519, L2: 13588, DC: 20937, L3: 9570 },
  'Nov-24': { L1: 35290, L2: 11203, DC: 17501, L3: 8891 },
  'Dec-24': { L1: 36733, L2: 15095, DC: 16014, L3: 9545 },
  'Jan-25': { L1: 32580, L2: 15327, DC: 19998, L3: 7900 },
  'Feb-25': { L1: 44043, L2: 14716, DC: 21095, L3: 7274 },
  'Mar-25': { L1: 34915, L2: 15290, DC: 24275, L3: 7989 },
  'Apr-25': { L1: 46039, L2: 15031, DC: 30832, L3: 8140 }
}

// Zone data (simplified for this component)
const detailedZoneData = {
  'Zone_01_(FM)': {
    name: 'Zone 01 (FM)',
    'Apr-25': { bulk: 1880, individual: 1629, loss: 251 },
    'Mar-25': { bulk: 1880, individual: 1817, loss: 63 },
    'Feb-25': { bulk: 1740, individual: 1648, loss: 92 },
    'Jan-25': { bulk: 2008, individual: 1898, loss: 110 }
  },
  'Zone_03_(A)': {
    name: 'Zone 03A',
    'Apr-25': { bulk: 4041, individual: 2168, loss: 1873 },
    'Mar-25': { bulk: 3591, individual: 1929, loss: 1662 },
    'Feb-25': { bulk: 4273, individual: 2548, loss: 1725 },
    'Jan-25': { bulk: 4235, individual: 2486, loss: 1749 }
  },
  'Zone_03_(B)': {
    name: 'Zone 03B',
    'Apr-25': { bulk: 2157, individual: 2168, loss: -11 },
    'Mar-25': { bulk: 3331, individual: 1470, loss: 1861 },
    'Feb-25': { bulk: 2962, individual: 1854, loss: 1108 },
    'Jan-25': { bulk: 3256, individual: 2063, loss: 1193 }
  },
  'Zone_05': {
    name: 'Zone 05',
    'Apr-25': { bulk: 3737, individual: 1625, loss: 2112 },
    'Mar-25': { bulk: 3862, individual: 1184, loss: 2678 },
    'Feb-25': { bulk: 4231, individual: 1864, loss: 2367 },
    'Jan-25': { bulk: 4267, individual: 1827, loss: 2440 }
  },
  'Zone_08': {
    name: 'Zone 08',
    'Apr-25': { bulk: 3203, individual: 1053, loss: 2150 },
    'Mar-25': { bulk: 2605, individual: 2356, loss: 249 },
    'Feb-25': { bulk: 1498, individual: 1275, loss: 223 },
    'Jan-25': { bulk: 1547, individual: 1349, loss: 198 }
  },
  'Zone_VS': {
    name: 'Village Square',
    'Apr-25': { bulk: 13, individual: 15, loss: -2 },
    'Mar-25': { bulk: 21, individual: 54, loss: -33 },
    'Feb-25': { bulk: 12, individual: 25, loss: -13 },
    'Jan-25': { bulk: 14, individual: 33, loss: -19 }
  }
}

export default function WaterManagementDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Apr-25')
  const [selectedZone, setSelectedZone] = useState('Zone_01_(FM)')
  const [activeTab, setActiveTab] = useState('overview')

  const data = waterData[selectedPeriod]
  const A = data.L1  // Main bulk
  const B = data.L2 + data.DC  // Zone bulks + Direct connections
  const C = data.L3 + data.DC  // End users + Direct connections

  const stage1Loss = A - B
  const stage2Loss = data.L2 - data.L3
  const totalLoss = A - C
  
  const stage1Percentage = (stage1Loss / A * 100).toFixed(1)
  const stage2Percentage = data.L2 > 0 ? (stage2Loss / data.L2 * 100).toFixed(1) : 0
  const totalPercentage = (totalLoss / A * 100).toFixed(1)
  const efficiency = (100 - parseFloat(totalPercentage)).toFixed(1)

  const getAlertComponent = () => {
    const totalLossPercent = parseFloat(totalPercentage)
    if (totalLossPercent < 0) {
      return (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
          ✅ System showing negative loss - possible meter calibration issue. Please verify readings.
        </div>
      )
    } else if (totalLossPercent < 20) {
      return (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
          ✅ System efficiency is excellent! Total water loss ({totalPercentage}%) is well within industry standards.
        </div>
      )
    } else if (totalLossPercent <= 30) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
          ⚠️ System efficiency needs attention. Total water loss ({totalPercentage}%) is approaching the upper limit.
        </div>
      )
    } else {
      return (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          🚨 Critical: Total water loss ({totalPercentage}%) exceeds industry standards. Immediate maintenance required.
        </div>
      )
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📊</span>
        <h2 className="text-2xl font-bold text-gray-800">System Overview - {selectedPeriod}</h2>
      </div>
      
      {getAlertComponent()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Supply Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600">
          <div className="text-center">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Total Supply (L1)</div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{A.toLocaleString()}</div>
            <div className="text-sm text-gray-500">m³</div>
          </div>
        </div>

        {/* Distribution Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600">
          <div className="text-center">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Distribution (L2+DC)</div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{B.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mb-2">m³</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{width: `${(B / A * 100)}%`}}
              ></div>
            </div>
          </div>
        </div>

        {/* Consumption Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600">
          <div className="text-center">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Consumption (L3+DC)</div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{C.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mb-2">m³</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{width: `${(C / A * 100)}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Water Loss Analysis */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">💧</span>
        <h2 className="text-2xl font-bold text-gray-800">Water Loss Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Stage 1 Loss (Trunk Main)</h3>
          <p className="text-2xl text-green-600 font-bold mb-2">{Math.abs(stage1Loss).toLocaleString()} m³</p>
          <p className="mb-2">Percentage: <strong>{Math.abs(parseFloat(stage1Percentage))}%</strong></p>
          <p className="text-gray-600 text-sm">Loss between main source and distribution points</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Stage 2 Loss (Distribution)</h3>
          <p className="text-2xl text-orange-600 font-bold mb-2">{stage2Loss.toLocaleString()} m³</p>
          <p className="mb-2">Percentage: <strong>{stage2Percentage}%</strong></p>
          <p className="text-gray-600 text-sm">Loss within zones between bulk and end users</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Total System Loss</h3>
          <p className="text-2xl text-red-600 font-bold mb-2">{totalLoss.toLocaleString()} m³</p>
          <p className="mb-2">Percentage: <strong>{totalPercentage}%</strong></p>
          <p className="text-gray-600 text-sm">Overall non-revenue water</p>
        </div>
      </div>

      {/* Distribution Hierarchy */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Water Distribution Hierarchy</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-purple-600 text-white px-6 py-4 rounded-lg text-center">
            <strong>L1 - Main Bulk (NAMA)</strong><br />
            {A.toLocaleString()} m³<br />
            <small>100% of supply</small>
          </div>
          
          <div className="text-2xl text-purple-600">↓</div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-purple-500 text-white px-6 py-4 rounded-lg text-center">
              <strong>L2 - Zone Bulks</strong><br />
              {data.L2.toLocaleString()} m³<br />
              <small>6 zones</small>
            </div>
            <div className="bg-purple-400 text-white px-6 py-4 rounded-lg text-center">
              <strong>DC - Direct Connections</strong><br />
              {data.DC.toLocaleString()} m³<br />
              <small>Hotel, Irrigation, etc.</small>
            </div>
          </div>
          
          <div className="text-2xl text-purple-600">↓</div>
          
          <div className="bg-gray-100 border-2 border-purple-600 px-6 py-4 rounded-lg text-center">
            <strong>L3 + DC - End Users</strong><br />
            {C.toLocaleString()} m³<br />
            <small>332 meters total</small>
          </div>
        </div>
      </div>
    </div>
  )

  const renderZoneTab = () => {
    const zoneData = detailedZoneData[selectedZone]?.[selectedPeriod]
    if (!zoneData) return <div>No data available for selected zone and period</div>

    const zoneLossPercentage = zoneData.bulk > 0 ? (zoneData.loss / zoneData.bulk * 100).toFixed(1) : 0

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🏘️</span>
          <h2 className="text-2xl font-bold text-gray-800">Zone Performance Analysis</h2>
        </div>

        {/* Zone Controls */}
        <div className="flex gap-4 mb-6">
          <select 
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg border-none"
          >
            {Object.keys(detailedZoneData).map(zone => (
              <option key={zone} value={zone}>{detailedZoneData[zone].name}</option>
            ))}
          </select>
        </div>

        {/* Zone KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600">
            <div className="text-center">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Zone Bulk Reading</div>
              <div className="text-3xl font-bold text-purple-600">{zoneData.bulk.toLocaleString()}</div>
              <div className="text-sm text-gray-500">m³</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-600">
            <div className="text-center">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Total Individual Consumption</div>
              <div className="text-3xl font-bold text-purple-600">{zoneData.individual.toLocaleString()}</div>
              <div className="text-sm text-gray-500">m³</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-red-600">
            <div className="text-center">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Water Loss</div>
              <div className="text-3xl font-bold text-red-600">{zoneData.loss.toLocaleString()}</div>
              <div className="text-sm text-gray-500">m³</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-red-600">
            <div className="text-center">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Loss Percentage</div>
              <div className="text-3xl font-bold text-red-600">{Math.abs(parseFloat(zoneLossPercentage))}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min(Math.abs(parseFloat(zoneLossPercentage)), 100)}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Performance Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Zone Performance Visualization - Water Distribution</h3>
          <div className="flex justify-around items-end h-80 p-5 border-b-2 border-gray-300">
            <div className="text-center">
              <div 
                className="w-20 bg-purple-600 mx-auto rounded-t-md relative transition-all duration-300"
                style={{height: '200px'}}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-bold">
                  {zoneData.bulk.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 font-bold">Bulk Reading</div>
            </div>
            <div className="text-center">
              <div 
                className="w-20 bg-purple-500 mx-auto rounded-t-md relative transition-all duration-300"
                style={{height: `${(zoneData.individual / zoneData.bulk) * 200}px`}}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-bold">
                  {zoneData.individual.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 font-bold">Individual Sum</div>
            </div>
            <div className="text-center">
              <div 
                className="w-20 bg-red-600 mx-auto rounded-t-md relative transition-all duration-300"
                style={{height: `${Math.abs(zoneData.loss / zoneData.bulk) * 200}px`}}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-bold text-red-600">
                  {zoneData.loss.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 font-bold text-red-600">Loss</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAnalysisTab = () => {
    const periods = Object.keys(waterData).reverse().slice(-4)
    const maxValue = Math.max(...periods.map(p => waterData[p].L1))

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📈</span>
          <h2 className="text-2xl font-bold text-gray-800">Trend Analysis</h2>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Water Supply Trend</h3>
          <div className="flex justify-around items-end h-80 p-5 border-b-2 border-gray-300">
            {periods.map(period => {
              const periodData = waterData[period]
              const isSelected = period === selectedPeriod
              return (
                <div key={period} className="text-center cursor-pointer" onClick={() => setSelectedPeriod(period)}>
                  <div 
                    className={`w-16 mx-auto rounded-t-md relative transition-all duration-300 ${
                      isSelected ? 'bg-purple-600' : 'bg-purple-400'
                    }`}
                    style={{height: `${(periodData.L1 / maxValue) * 250}px`}}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-bold text-xs">
                      {(periodData.L1 / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium">{period}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Efficiency and Loss Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">System Efficiency</h3>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-4">{efficiency}%</div>
              <p className="text-gray-600 mb-4">Water Delivered to End Users</p>
              <div className="w-48 bg-gray-200 rounded-full h-4 mx-auto mb-4">
                <div 
                  className="bg-purple-600 h-4 rounded-full transition-all duration-300" 
                  style={{width: `${efficiency}%`}}
                ></div>
              </div>
              <div className="flex justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-purple-600 rounded mr-2"></div>
                  <span>Delivered: <strong>{efficiency}%</strong></span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-600 rounded mr-2"></div>
                  <span>Lost: <strong>{totalPercentage}%</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Loss Breakdown by Stage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Stage 1 Loss</span>
                  <strong>{Math.abs(stage1Loss).toLocaleString()} m³</strong>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-purple-500 h-4 rounded-full transition-all duration-300" 
                    style={{width: `${Math.abs(stage1Loss) / Math.abs(totalLoss) * 100}%`}}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Stage 2 Loss</span>
                  <strong>{stage2Loss.toLocaleString()} m³</strong>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-purple-400 h-4 rounded-full transition-all duration-300" 
                    style={{width: `${Math.abs(stage2Loss) / Math.abs(totalLoss) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderConsumersTab = () => {
    const topConsumers = [
      { rank: 1, name: 'Hotel Main Building', type: 'Retail', consumption: 27676, percentage: 60.3 },
      { rank: 2, name: 'STP Building', type: 'Utility', consumption: 1200, percentage: 2.6 },
      { rank: 3, name: 'Irrigation Controller UP', type: 'IRR_Services', consumption: 1000, percentage: 2.2 },
      { rank: 4, name: 'Al Adrak Camp', type: 'Retail', consumption: 1000, percentage: 2.2 },
      { rank: 5, name: 'Al Adrak Construction', type: 'Retail', consumption: 600, percentage: 1.3 },
      { rank: 6, name: 'Irrigation Controller DOWN', type: 'IRR_Services', consumption: 411, percentage: 0.9 },
      { rank: 7, name: 'Z8-5 (Villa)', type: 'Residential', consumption: 336, percentage: 0.7 },
      { rank: 8, name: 'Building CIF/CB', type: 'Retail', consumption: 307, percentage: 0.7 },
      { rank: 9, name: 'Z3-31 (Villa)', type: 'Residential', consumption: 306, percentage: 0.7 },
      { rank: 10, name: 'Building B8', type: 'Retail', consumption: 261, percentage: 0.6 }
    ]

    const getTypeColor = (type) => {
      switch (type) {
        case 'Retail': return 'bg-blue-100 text-blue-800'
        case 'Utility': return 'bg-purple-100 text-purple-800'
        case 'IRR_Services': return 'bg-purple-100 text-purple-800'
        case 'Residential': return 'bg-green-100 text-green-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🏢</span>
          <h2 className="text-2xl font-bold text-gray-800">Top Consumers - April 2025</h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Top 10 Water Consumers</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Consumer</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Consumption (m³)</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {topConsumers.map((consumer) => (
                  <tr key={consumer.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{consumer.rank}</td>
                    <td className="py-3 px-4 font-medium">{consumer.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(consumer.type)}`}>
                        {consumer.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold">{consumer.consumption.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{consumer.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          <strong>Key Insight:</strong> The Hotel Main Building alone consumes 60.3% of total end-user consumption (27,676 m³ out of 45,863 m³). 
          This single consumer represents a critical monitoring point for the system.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
            MB
          </div>
          <div>
            <h1 className="text-4xl font-bold">Muscat Bay Water Management System</h1>
            <p className="text-purple-100 mt-2">Real-time water distribution monitoring and loss analysis dashboard</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        {/* Period Filter */}
        <div className="mb-6">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg border-none"
          >
            {Object.keys(waterData).reverse().map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 border-b-2 border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'zones', label: 'Zone Analysis' },
            { id: 'analysis', label: 'Trend Analysis' },
            { id: 'consumers', label: 'Top Consumers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'zones' && renderZoneTab()}
          {activeTab === 'analysis' && renderAnalysisTab()}
          {activeTab === 'consumers' && renderConsumersTab()}
        </div>
      </div>
    </div>
  )
}