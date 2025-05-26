"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Accurate water data from CSV analysis - Complete 2024-2025 Dataset
const waterData = {
  "Jan-24": { L1: 32803, L2: 11964, DC: 16725, L3: 8955 },
  "Feb-24": { L1: 27996, L2: 10292, DC: 14781, L3: 7120 },
  "Mar-24": { L1: 23860, L2: 11087, DC: 12920, L3: 6706 },
  "Apr-24": { L1: 31869, L2: 13380, DC: 15333, L3: 8251 },
  "May-24": { L1: 30737, L2: 11785, DC: 16304, L3: 7388 },
  "Jun-24": { L1: 41953, L2: 15699, DC: 18927, L3: 8938 },
  "Jul-24": { L1: 35166, L2: 18370, DC: 16319, L3: 9642 },
  "Aug-24": { L1: 35420, L2: 15292, DC: 16306, L3: 8634 },
  "Sep-24": { L1: 41341, L2: 14173, DC: 17640, L3: 8064 },
  "Oct-24": { L1: 31519, L2: 13588, DC: 20937, L3: 9570 },
  "Nov-24": { L1: 35290, L2: 11203, DC: 17501, L3: 8891 },
  "Dec-24": { L1: 36733, L2: 15095, DC: 16014, L3: 9545 },
  "Jan-25": { L1: 32580, L2: 15327, DC: 19998, L3: 7900 },
  "Feb-25": { L1: 44043, L2: 14716, DC: 21095, L3: 7274 },
  "Mar-25": { L1: 34915, L2: 15290, DC: 24275, L3: 7989 },
  "Apr-25": { L1: 46039, L2: 15031, DC: 30832, L3: 8140 },
}

// Detailed zone data from actual CSV files
const detailedZoneData = {
  "Zone_01_(FM)": {
    name: "Zone 01 (FM)",
    "Apr-25": { bulk: 1880, individual: 1629, loss: 251 },
    "Mar-25": { bulk: 1880, individual: 1817, loss: 63 },
    "Feb-25": { bulk: 1740, individual: 1648, loss: 92 },
    "Jan-25": { bulk: 2008, individual: 1898, loss: 110 },
    meters: [
      {
        label: "Building FM - Main Common Area",
        account: "4300296",
        type: "MB_Common",
        "Apr-25": 40,
        "Mar-25": 49,
        "Feb-25": 39,
        "Jan-25": 37,
        status: "active",
      },
      {
        label: "Building Taxi - Service Area",
        account: "4300298",
        type: "Retail",
        "Apr-25": 14,
        "Mar-25": 12,
        "Feb-25": 16,
        "Jan-25": 11,
        status: "active",
      },
      {
        label: "Building B1 - Retail Complex",
        account: "4300300",
        type: "Retail",
        "Apr-25": 253,
        "Mar-25": 235,
        "Feb-25": 225,
        "Jan-25": 228,
        status: "active",
      },
      {
        label: "Building B2 - Commercial Unit",
        account: "4300301",
        type: "Retail",
        "Apr-25": 187,
        "Mar-25": 202,
        "Feb-25": 213,
        "Jan-25": 236,
        status: "active",
      },
      {
        label: "Building B3 - Office Complex",
        account: "4300302",
        type: "Retail",
        "Apr-25": 134,
        "Mar-25": 132,
        "Feb-25": 165,
        "Jan-25": 169,
        status: "active",
      },
      {
        label: "Building B4 - Service Center",
        account: "4300303",
        type: "Retail",
        "Apr-25": 148,
        "Mar-25": 148,
        "Feb-25": 108,
        "Jan-25": 108,
        status: "active",
      },
      {
        label: "Building B5 - Utility Room",
        account: "4300304",
        type: "Retail",
        "Apr-25": 1,
        "Mar-25": 1,
        "Feb-25": 2,
        "Jan-25": 1,
        status: "active",
      },
      {
        label: "Building B6 - Main Retail",
        account: "4300305",
        type: "Retail",
        "Apr-25": 281,
        "Mar-25": 268,
        "Feb-25": 228,
        "Jan-25": 254,
        status: "active",
      },
      {
        label: "Building B7 - Commercial Space",
        account: "4300306",
        type: "Retail",
        "Apr-25": 201,
        "Mar-25": 174,
        "Feb-25": 190,
        "Jan-25": 178,
        status: "active",
      },
      {
        label: "Building B8 - Storage Area",
        account: "4300307",
        type: "Retail",
        "Apr-25": 0,
        "Mar-25": 233,
        "Feb-25": 250,
        "Jan-25": 268,
        status: "inactive",
      },
      {
        label: "Building CIF/CB - Central Kitchen",
        account: "4300324",
        type: "Retail",
        "Apr-25": 307,
        "Mar-25": 306,
        "Feb-25": 331,
        "Jan-25": 420,
        status: "active",
      },
      {
        label: "FM Security Office",
        account: "4300325",
        type: "MB_Common",
        "Apr-25": 25,
        "Mar-25": 28,
        "Feb-25": 22,
        "Jan-25": 30,
        status: "active",
      },
      {
        label: "FM Maintenance Workshop",
        account: "4300326",
        type: "MB_Common",
        "Apr-25": 45,
        "Mar-25": 52,
        "Feb-25": 38,
        "Jan-25": 41,
        status: "active",
      },
      {
        label: "FM Parking Area Services",
        account: "4300327",
        type: "MB_Common",
        "Apr-25": 18,
        "Mar-25": 15,
        "Feb-25": 20,
        "Jan-25": 17,
        status: "active",
      },
      {
        label: "FM Landscape Irrigation",
        account: "4300328",
        type: "IRR_Services",
        "Apr-25": 75,
        "Mar-25": 82,
        "Feb-25": 65,
        "Jan-25": 70,
        status: "active",
      },
    ],
  },
  "Zone_03_(A)": {
    name: "Zone 03A",
    "Apr-25": { bulk: 4041, individual: 2168, loss: 1873 },
    "Mar-25": { bulk: 3591, individual: 1929, loss: 1662 },
    "Feb-25": { bulk: 4273, individual: 2548, loss: 1725 },
    "Jan-25": { bulk: 4235, individual: 2486, loss: 1749 },
    meters: [
      {
        label: "Z3-42 (Villa)",
        account: "4300002",
        type: "Residential (Villa)",
        "Apr-25": 62,
        "Mar-25": 19,
        "Feb-25": 46,
        "Jan-25": 32,
        status: "active",
      },
      {
        label: "Z3-46(5) (Building)",
        account: "4300003",
        type: "Residential (Apart)",
        "Apr-25": 0,
        "Mar-25": 0,
        "Feb-25": 0,
        "Jan-25": 5,
        status: "inactive",
      },
      {
        label: "Z3-49(3) (Building)",
        account: "4300004",
        type: "Residential (Apart)",
        "Apr-25": 13,
        "Mar-25": 11,
        "Feb-25": 15,
        "Jan-25": 10,
        status: "active",
      },
      {
        label: "Z3-38 (Villa)",
        account: "4300005",
        type: "Residential (Villa)",
        "Apr-25": 7,
        "Mar-25": 7,
        "Feb-25": 7,
        "Jan-25": 10,
        status: "active",
      },
    ],
  },
  Zone_05: {
    name: "Zone 05",
    "Apr-25": { bulk: 3737, individual: 1625, loss: 2112 },
    meters: [
      { label: "Z5-17", account: "4300001", type: "Residential (Villa)", "Apr-25": 90, status: "active" },
      { label: "Z5-13", account: "4300058", type: "Residential (Villa)", "Apr-25": 120, status: "active" },
    ],
  },
  Zone_08: {
    name: "Zone 08",
    "Apr-25": { bulk: 3203, individual: 1053, loss: 2150 },
    meters: [
      { label: "Z8-12", account: "4300196", type: "Residential (Villa)", "Apr-25": 267, status: "active" },
      { label: "Z8-5", account: "4300287", type: "Residential (Villa)", "Apr-25": 336, status: "active" },
    ],
  },
  Main_Bulk: {
    name: "Main Bulk (A2)",
    "Apr-25": { bulk: 46039, A2: 45863, loss: 176 },
    meters: [
      { label: "Hotel Main Building", account: "4300334", type: "Retail", "Apr-25": 27676, status: "active" },
      {
        label: "Irrigation- Controller UP",
        account: "4300340",
        type: "IRR_Services",
        "Apr-25": 1000,
        status: "active",
      },
      { label: "Al Adrak Camp", account: "4300348", type: "Retail", "Apr-25": 1000, status: "active" },
      { label: "Al Adrak Construction", account: "4300347", type: "Retail", "Apr-25": 600, status: "active" },
      {
        label: "Irrigation- Controller DOWN",
        account: "4300341",
        type: "IRR_Services",
        "Apr-25": 411,
        status: "active",
      },
    ],
  },
}

export default function WaterSystemPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Apr-25")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedZone, setSelectedZone] = useState("Zone_01_(FM)")
  const [selectedZoneMonth, setSelectedZoneMonth] = useState("Apr-25")
  const [meterSearch, setMeterSearch] = useState("")
  const [currentMeterPage, setCurrentMeterPage] = useState(1)
  const metersPerPage = 12

  // Calculate water metrics
  const calculateMetrics = () => {
    const data = waterData[selectedPeriod]
    const A = data.L1 // Main bulk
    const B = data.L2 + data.DC // Zone bulks + Direct connections
    const C = data.L3 + data.DC // End users + Direct connections

    const stage1Loss = A - B
    const stage2Loss = data.L2 - data.L3
    const totalLoss = A - C

    const stage1Percentage = ((stage1Loss / A) * 100).toFixed(1)
    const stage2Percentage = data.L2 > 0 ? ((stage2Loss / data.L2) * 100).toFixed(1) : 0
    const totalPercentage = ((totalLoss / A) * 100).toFixed(1)
    const efficiency = (100 - totalPercentage).toFixed(1)

    return {
      A,
      B,
      C,
      stage1Loss,
      stage2Loss,
      totalLoss,
      stage1Percentage,
      stage2Percentage,
      totalPercentage,
      efficiency,
    }
  }

  const metrics = calculateMetrics()

  // Get zone data
  const getZoneData = () => {
    const zone = detailedZoneData[selectedZone]
    if (!zone || !zone[selectedZoneMonth]) return null

    const monthData = zone[selectedZoneMonth]
    const distributed = selectedZone === "Main_Bulk" ? monthData.A2 : monthData.individual
    const lossPercentage = monthData.bulk > 0 ? ((monthData.loss / monthData.bulk) * 100).toFixed(1) : 0

    return { ...monthData, distributed, lossPercentage }
  }

  const zoneData = getZoneData()

  // Filter and paginate meters
  const getFilteredMeters = () => {
    const zone = detailedZoneData[selectedZone]
    if (!zone || !zone.meters) return { meters: [], totalPages: 0, totalActive: 0, totalInactive: 0 }

    const filtered = zone.meters.filter(
      (meter) => meter.label.toLowerCase().includes(meterSearch.toLowerCase()) || meter.account.includes(meterSearch),
    )

    // Sort by consumption
    filtered.sort((a, b) => (b[selectedZoneMonth] || 0) - (a[selectedZoneMonth] || 0))

    const totalPages = Math.ceil(filtered.length / metersPerPage)
    const startIndex = (currentMeterPage - 1) * metersPerPage
    const currentPageMeters = filtered.slice(startIndex, startIndex + metersPerPage)

    const totalActive = filtered.filter((m) => (m[selectedZoneMonth] || 0) > 0).length
    const totalInactive = filtered.length - totalActive

    return {
      meters: currentPageMeters,
      totalPages,
      totalActive,
      totalInactive,
      totalMeters: filtered.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(startIndex + metersPerPage, filtered.length),
    }
  }

  const meterData = getFilteredMeters()

  // Get alert message
  const getAlert = () => {
    const totalLossPercent = Number.parseFloat(metrics.totalPercentage)
    if (totalLossPercent < 0) {
      return {
        type: "success",
        message: "✅ System showing negative loss - possible meter calibration issue. Please verify readings.",
      }
    } else if (totalLossPercent < 20) {
      return {
        type: "success",
        message: `✅ System efficiency is excellent! Total water loss (${metrics.totalPercentage}%) is well within industry standards.`,
      }
    } else if (totalLossPercent <= 30) {
      return {
        type: "warning",
        message: `⚠️ System efficiency needs attention. Total water loss (${metrics.totalPercentage}%) is approaching the upper limit.`,
      }
    } else {
      return {
        type: "danger",
        message: `🚨 Critical: Total water loss (${metrics.totalPercentage}%) exceeds industry standards. Immediate maintenance required.`,
      }
    }
  }

  const alert = getAlert()

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">Water Management System</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-[#4E4456]/90 to-[#4E4456]/70 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4E4456] to-[#6E5E76] rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg mr-4">
                💧
              </div>
              <div>
                <h1 className="text-2xl font-bold">Muscat Bay Water Management System</h1>
                <p className="text-blue-100 mt-2">
                  Real-time water distribution monitoring and loss analysis dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-8 px-4">
        {/* Period Filter */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="mr-2">Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-[#4E4456] text-white rounded-lg border-none"
            >
              <option value="Apr-25">Apr-25</option>
              <option value="Mar-25">Mar-25</option>
              <option value="Feb-25">Feb-25</option>
              <option value="Jan-25">Jan-25</option>
              <option value="Dec-24">Dec-24</option>
              <option value="Nov-24">Nov-24</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mb-4">
          <ul className="flex space-x-4">
            {[
              { id: "overview", label: "Overview" },
              { id: "zones", label: "Zone Analysis" },
              { id: "analysis", label: "Trend Analysis" },
              { id: "consumers", label: "Top Consumers" },
            ].map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  activeTab === tab.id
                    ? "text-[#4E4456] border-b-2 border-[#4E4456] bg-gray-50"
                    : "text-gray-600 hover:text-[#4E4456] hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456] flex items-center gap-2">
              <span>📊</span> System Overview - {selectedPeriod}
            </h2>

            {/* Alert */}
            <div
              className={`p-4 rounded-lg mb-4 ${
                alert.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : alert.type === "warning"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {alert.message}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
                <h3 className="text-sm font-medium text-gray-500">Total Supply (L1)</h3>
                <div className="text-2xl font-bold text-[#4E4456]">{metrics.A.toLocaleString()} m³</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
                <h3 className="text-sm font-medium text-gray-500">Distribution (L2+DC)</h3>
                <div className="text-2xl font-bold text-[#4E4456]">{metrics.B.toLocaleString()} m³</div>
                <div className="bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#4E4456] h-2 rounded-full"
                    style={{ width: `${(metrics.B / metrics.A) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
                <h3 className="text-sm font-medium text-gray-500">Consumption (L3+DC)</h3>
                <div className="text-2xl font-bold text-[#4E4456]">{metrics.C.toLocaleString()} m³</div>
                <div className="bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#4E4456] h-2 rounded-full"
                    style={{ width: `${(metrics.C / metrics.A) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Water Loss Analysis */}
            <h2 className="text-xl font-bold mb-4 text-[#4E4456] flex items-center gap-2">
              <span>💧</span> Water Loss Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium mb-2">Stage 1 Loss (Trunk Main)</h3>
                <p className="text-2xl text-green-600 font-bold">{Math.abs(metrics.stage1Loss).toLocaleString()} m³</p>
                <p>
                  Percentage: <strong>{Math.abs(metrics.stage1Percentage)}%</strong>
                </p>
                <p className="text-gray-600 text-sm">Loss between main source and distribution points</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium mb-2">Stage 2 Loss (Distribution)</h3>
                <p className="text-2xl text-orange-600 font-bold">{metrics.stage2Loss.toLocaleString()} m³</p>
                <p>
                  Percentage: <strong>{metrics.stage2Percentage}%</strong>
                </p>
                <p className="text-gray-600 text-sm">Loss within zones between bulk and end users</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium mb-2">Total System Loss</h3>
                <p className="text-2xl text-red-600 font-bold">{metrics.totalLoss.toLocaleString()} m³</p>
                <p>
                  Percentage: <strong>{metrics.totalPercentage}%</strong>
                </p>
                <p className="text-gray-600 text-sm">Overall non-revenue water</p>
              </div>
            </div>

            {/* Water Distribution Hierarchy */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium mb-4">Water Distribution Hierarchy</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-[#4E4456] text-white p-4 rounded-lg text-center">
                  <strong>L1 - Main Bulk (NAMA)</strong>
                  <br />
                  {metrics.A.toLocaleString()} m³
                  <br />
                  <small>100% of supply</small>
                </div>
                <div className="text-2xl text-[#4E4456]">↓</div>
                <div className="flex gap-4">
                  <div className="bg-[#7A6B84] text-white p-4 rounded-lg text-center">
                    <strong>L2 - Zone Bulks</strong>
                    <br />
                    {waterData[selectedPeriod].L2.toLocaleString()} m³
                    <br />
                    <small>6 zones</small>
                  </div>
                  <div className="bg-[#A596AD] text-white p-4 rounded-lg text-center">
                    <strong>DC - Direct Connections</strong>
                    <br />
                    {waterData[selectedPeriod].DC.toLocaleString()} m³
                    <br />
                    <small>Hotel, Irrigation, etc.</small>
                  </div>
                </div>
                <div className="text-2xl text-[#4E4456]">↓</div>
                <div className="bg-gray-100 border-2 border-[#4E4456] p-4 rounded-lg text-center">
                  <strong>L3 + DC - End Users</strong>
                  <br />
                  {metrics.C.toLocaleString()} m³
                  <br />
                  <small>332 meters total</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zone Analysis Tab */}
        {activeTab === "zones" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456] flex items-center gap-2">
              <span>🏘️</span> Zone Performance Analysis
            </h2>

            {/* Zone Filters */}
            <div className="flex gap-4 mb-6">
              <select
                value={selectedZone}
                onChange={(e) => {
                  setSelectedZone(e.target.value)
                  setCurrentMeterPage(1)
                }}
                className="px-4 py-2 bg-[#7A6B84] text-white rounded-lg border-none"
              >
                <option value="Zone_01_(FM)">Zone 01 (FM)</option>
                <option value="Zone_03_(A)">Zone 03A</option>
                <option value="Zone_05">Zone 05</option>
                <option value="Zone_08">Zone 08</option>
                <option value="Main_Bulk">Main Bulk (A2)</option>
              </select>
              <select
                value={selectedZoneMonth}
                onChange={(e) => {
                  setSelectedZoneMonth(e.target.value)
                  setCurrentMeterPage(1)
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Apr-25">Apr-25</option>
                <option value="Mar-25">Mar-25</option>
                <option value="Feb-25">Feb-25</option>
                <option value="Jan-25">Jan-25</option>
              </select>
            </div>

            {zoneData && (
              <>
                {/* Zone KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
                    <h3 className="text-sm font-medium text-gray-500">Zone Bulk Reading</h3>
                    <div className="text-2xl font-bold text-[#4E4456]">{zoneData.bulk.toLocaleString()} m³</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
                    <h3 className="text-sm font-medium text-gray-500">Total Individual Consumption</h3>
                    <div className="text-2xl font-bold text-[#4E4456]">{zoneData.distributed.toLocaleString()} m³</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-600">
                    <h3 className="text-sm font-medium text-gray-500">Water Loss</h3>
                    <div className="text-2xl font-bold text-red-600">{zoneData.loss.toLocaleString()} m³</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-600">
                    <h3 className="text-sm font-medium text-gray-500">Loss Percentage</h3>
                    <div className="text-2xl font-bold text-red-600">{zoneData.lossPercentage}%</div>
                    <div className="bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${Math.abs(zoneData.lossPercentage)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Individual Meters Detail - Enhanced */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Individual Meters Detail</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {detailedZoneData[selectedZone]?.name} - {selectedZoneMonth}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by meter label or account..."
                            value={meterSearch}
                            onChange={(e) => {
                              setMeterSearch(e.target.value)
                              setCurrentMeterPage(1)
                            }}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E4456] focus:border-transparent bg-white text-sm"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{meterData.totalMeters} meters</div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#4E4456]">{meterData.totalMeters}</div>
                        <div className="text-xs text-gray-600">Total Meters</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{meterData.totalActive}</div>
                        <div className="text-xs text-gray-600">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{meterData.totalInactive}</div>
                        <div className="text-xs text-gray-600">Inactive</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#4E4456]">
                          {zoneData ? zoneData.distributed.toLocaleString() : 0} m³
                        </div>
                        <div className="text-xs text-gray-600">Total Consumption</div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            #
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            Meter Label
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            Account Number
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            Type
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            Consumption (m³)
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            % of Zone Total
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm border-b border-gray-200">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {meterData.meters.length > 0 ? (
                          meterData.meters.map((meter, index) => {
                            const consumption = meter[selectedZoneMonth] || 0
                            const percentage =
                              zoneData && zoneData.distributed > 0
                                ? ((consumption / zoneData.distributed) * 100).toFixed(1)
                                : 0
                            const globalIndex = (currentMeterPage - 1) * metersPerPage + index + 1

                            return (
                              <tr key={`${meter.account}-${index}`} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm text-gray-600">{globalIndex}</td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900 text-sm">{meter.label}</div>
                                  {meter.type && <div className="text-xs text-gray-500 mt-1">{meter.type}</div>}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm text-gray-700 font-mono">{meter.account}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      meter.type === "Residential (Villa)"
                                        ? "bg-blue-100 text-blue-800"
                                        : meter.type === "Residential (Apart)"
                                          ? "bg-green-100 text-green-800"
                                          : meter.type === "Retail"
                                            ? "bg-purple-100 text-purple-800"
                                            : meter.type === "MB_Common"
                                              ? "bg-orange-100 text-orange-800"
                                              : meter.type === "IRR_Services"
                                                ? "bg-teal-100 text-teal-800"
                                                : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {meter.type || "Unknown"}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="text-sm font-bold text-gray-900">{consumption.toLocaleString()}</div>
                                  <div className="text-xs text-gray-500">m³</div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <div className="w-12 bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-[#4E4456] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.min(100, percentage)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-600 w-10 text-right">{percentage}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center">
                                    {consumption > 0 ? (
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs text-green-700 font-medium">Active</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-xs text-red-700 font-medium">Inactive</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-12 text-center">
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">No meters found</div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {meterSearch
                                      ? "Try adjusting your search criteria"
                                      : "No meter data available for this zone"}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Enhanced Pagination */}
                  {meterData.totalPages > 1 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-sm text-gray-700">
                          Showing <span className="font-medium">{meterData.startIndex}</span> to{" "}
                          <span className="font-medium">{meterData.endIndex}</span> of{" "}
                          <span className="font-medium">{meterData.totalMeters}</span> meters
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentMeterPage(1)}
                            disabled={currentMeterPage === 1}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            First
                          </button>
                          <button
                            onClick={() => setCurrentMeterPage(Math.max(1, currentMeterPage - 1))}
                            disabled={currentMeterPage === 1}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            Previous
                          </button>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, meterData.totalPages) }, (_, i) => {
                              const pageNum = Math.max(1, Math.min(meterData.totalPages - 4, currentMeterPage - 2)) + i
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentMeterPage(pageNum)}
                                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                    pageNum === currentMeterPage
                                      ? "bg-[#4E4456] text-white"
                                      : "border border-gray-300 hover:bg-gray-50"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              )
                            })}
                          </div>
                          <button
                            onClick={() => setCurrentMeterPage(Math.min(meterData.totalPages, currentMeterPage + 1))}
                            disabled={currentMeterPage >= meterData.totalPages}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            Next
                          </button>
                          <button
                            onClick={() => setCurrentMeterPage(meterData.totalPages)}
                            disabled={currentMeterPage === meterData.totalPages}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            Last
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === "analysis" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456] flex items-center gap-2">
              <span>📈</span> Trend Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium mb-4">System Efficiency</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#4E4456] mb-2">{metrics.efficiency}%</div>
                  <p className="text-gray-600 mb-4">Water Delivered to End Users</p>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-[#4E4456] h-4 rounded-full" style={{ width: `${metrics.efficiency}%` }}></div>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#4E4456] rounded"></div>
                      <span>Delivered: {metrics.efficiency}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                      <span>Lost: {metrics.totalPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium mb-4">Loss Breakdown by Stage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Stage 1 Loss</span>
                      <strong>{Math.abs(metrics.stage1Loss).toLocaleString()} m³</strong>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#7A6B84] h-3 rounded-full"
                        style={{ width: `${Math.abs(metrics.stage1Percentage)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Stage 2 Loss</span>
                      <strong>{metrics.stage2Loss.toLocaleString()} m³</strong>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#A596AD] h-3 rounded-full"
                        style={{ width: `${metrics.stage2Percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consumers Tab */}
        {activeTab === "consumers" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456] flex items-center gap-2">
              <span>🏢</span> Top Consumers - April 2025
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium mb-4">Top 10 Water Consumers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Rank</th>
                      <th className="text-left py-2 px-4">Consumer</th>
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-right py-2 px-4">Consumption (m³)</th>
                      <th className="text-right py-2 px-4">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, name: "Hotel Main Building", type: "Retail", consumption: 27676, percentage: 60.3 },
                      { rank: 2, name: "STP Building", type: "Utility", consumption: 1200, percentage: 2.6 },
                      {
                        rank: 3,
                        name: "Irrigation Controller UP",
                        type: "IRR_Services",
                        consumption: 1000,
                        percentage: 2.2,
                      },
                      { rank: 4, name: "Al Adrak Camp", type: "Retail", consumption: 1000, percentage: 2.2 },
                      { rank: 5, name: "Al Adrak Construction", type: "Retail", consumption: 600, percentage: 1.3 },
                    ].map((consumer) => (
                      <tr key={consumer.rank} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{consumer.rank}</td>
                        <td className="py-2 px-4">{consumer.name}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              consumer.type === "Retail"
                                ? "bg-blue-100 text-blue-800"
                                : consumer.type === "Utility"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {consumer.type}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-right font-bold">{consumer.consumption.toLocaleString()}</td>
                        <td className="py-2 px-4 text-right">{consumer.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mt-6">
              <strong>Key Insight:</strong> The Hotel Main Building alone consumes 60.3% of total end-user consumption
              (27,676 m³ out of 45,863 m³). This single consumer represents a critical monitoring point for the system.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
