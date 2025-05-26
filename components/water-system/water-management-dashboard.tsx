"use client"

import { useState } from "react"

const WaterManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("daily")
  const [selectedZone, setSelectedZone] = useState("all")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "distribution", label: "Distribution" },
    { id: "lossAnalysis", label: "Loss Analysis" },
    { id: "alerts", label: "Alerts" },
  ]

  const kpiData = [
    { label: "Total Water Distributed", value: "1,250,000", unit: "L", trend: "+5%", icon: "water", color: "#4E4456" },
    { label: "Water Loss Volume", value: "150,000", unit: "L", trend: "-3%", icon: "leak", color: "#4E4456" },
    { label: "Average Pressure", value: "3.2", unit: "bar", trend: "+1%", icon: "pressure", color: "#4E4456" },
    { label: "Customer Satisfaction", value: "92", unit: "%", trend: "+2%", icon: "happy", color: "#4E4456" },
  ]

  const sampleChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Water Distribution",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#4E4456",
        tension: 0.1,
      },
    ],
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
  }

  const handleZoneChange = (zone) => {
    setSelectedZone(zone)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#4E4456] to-[#6E5E76] text-white p-8 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4E4456] to-[#6E5E76] rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
              💧
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Water Management System</h1>
              <p className="text-blue-100 mt-2">Real-time water distribution monitoring and loss analysis dashboard</p>
            </div>
          </div>
          <div>
            <button className="bg-white text-[#4E4456] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
              Download Report
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="mr-2">Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="px-4 py-2 bg-[#4E4456] text-white rounded-lg border-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <span className="mr-2">Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => handleZoneChange(e.target.value)}
              className="px-4 py-2 bg-[#4E4456] text-white rounded-lg border-none"
            >
              <option value="all">All Zones</option>
              <option value="zone1">Zone 1</option>
              <option value="zone2">Zone 2</option>
              <option value="zone3">Zone 3</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mb-4">
          <ul className="flex space-x-4">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  activeTab === tab.id
                    ? "text-[#4E4456] border-b-2 border-[#4E4456] bg-gray-50"
                    : "text-gray-600 hover:text-[#4E4456] hover:bg-gray-50"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#4E4456]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{kpi.label}</h3>
                  <div className="text-2xl font-bold text-[#4E4456]">
                    {kpi.value} {kpi.unit}
                  </div>
                  <div className={`text-sm ${kpi.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {kpi.trend}
                  </div>
                </div>
                <div>
                  {/* Placeholder for Icon - Replace with actual icon component */}
                  <div className="text-4xl text-gray-400">{kpi.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area based on Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456]">Overview</h2>
            {/* Water Distribution Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="text-lg font-medium mb-2 text-[#4E4456]">Water Distribution Over Time</h3>
              {/* Placeholder for Chart Component - Replace with actual chart component */}
              <img
                src="https://via.placeholder.com/800x400/FFFFFF/000000?text=Chart+Goes+Here"
                alt="Water Distribution Chart"
              />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium mb-2 text-[#4E4456]">Water Loss Rate</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#4E4456]">12%</div>
                  <div className="text-sm text-gray-500">Target: 8%</div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#4E4456] h-2 rounded-full transition-all duration-300"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-medium mb-2 text-[#4E4456]">Average Water Pressure</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#4E4456]">3.2 bar</div>
                  <div className="text-sm text-gray-500">Optimal: 2.5 - 3.5 bar</div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#4E4456] h-2 rounded-full transition-all duration-300"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "distribution" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456]">Distribution</h2>
            {/* Placeholder Content */}
            <p className="text-gray-700">Distribution data and visualizations will be displayed here.</p>
          </div>
        )}

        {activeTab === "lossAnalysis" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456]">Loss Analysis</h2>
            {/* Placeholder Content */}
            <p className="text-gray-700">Water loss analysis data and visualizations will be displayed here.</p>
          </div>
        )}

        {activeTab === "alerts" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#4E4456]">Alerts</h2>
            {/* Placeholder Content */}
            <p className="text-gray-700">Real-time alerts and notifications will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaterManagementDashboard
