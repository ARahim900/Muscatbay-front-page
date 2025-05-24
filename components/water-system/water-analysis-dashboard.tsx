import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart, Scatter
} from 'recharts';
import {
  ArrowUpRight, ArrowDownRight, BarChart3,
  Calendar, Filter, ArrowRightLeft,
  RefreshCw, Database, Settings, AlertTriangle,
  Droplet, CircleOff
} from 'lucide-react';

// Main App Component
const WaterAnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMonthFilter, setActiveMonthFilter] = useState('Apr-2025');
  const [activeYearFilter, setActiveYearFilter] = useState('2025');
  const [activeZoneFilter, setActiveZoneFilter] = useState('All Zones');
  const [dataLoaded, setDataLoaded] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 800);
  }, []);

  // Render the selected tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                />;
      case 'group-details':
        return <GroupDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                />;
      case 'type-details':
        return <TypeDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                />;
      case 'loss-details':
        return <LossDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                />;
      default:
        return <OverviewSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Loading Screen */}
      {!dataLoaded ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Header */}
          <header className="bg-gradient-to-r from-[#4E4456] to-[#6E5E76] text-white shadow-lg p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <Droplet size={24} className="text-blue-200" />
                <h1 className="text-xl md:text-2xl font-bold">Water Management Analytics</h1>
              </div>
              <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
                <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1 hover:bg-white/20 transition">
                  <RefreshCw size={14} className="mr-1 md:mr-2" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </button>
                <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1 hover:bg-white/20 transition">
                  <Settings size={14} className="mr-1 md:mr-2" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Navigation Tabs */}
          <nav className="bg-white shadow-md">
            <div className="container mx-auto">
              <div className="flex overflow-x-auto whitespace-nowrap">
                <TabButton
                  icon={<BarChart3 size={18} />}
                  title="Overview"
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                />
                <TabButton
                  icon={<Database size={18} />}
                  title="Group Details"
                  active={activeTab === 'group-details'}
                  onClick={() => setActiveTab('group-details')}
                />
                <TabButton
                  icon={<RefreshCw size={18} />}
                  title="Type Details"
                  active={activeTab === 'type-details'}
                  onClick={() => setActiveTab('type-details')}
                />
                <TabButton
                  icon={<AlertTriangle size={18} />}
                  title="Loss Details"
                  active={activeTab === 'loss-details'}
                  onClick={() => setActiveTab('loss-details')}
                />
              </div>
            </div>
          </nav>

          {/* Filter Bar */}
          <div className="bg-white border-b border-gray-200 py-3">
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4 gap-2">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Filters:</span>
              </div>

              {/* Month Filter */}
              <div className="flex items-center">
                <label className="text-sm text-gray-600 mr-2">Month:</label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={activeMonthFilter}
                  onChange={(e) => setActiveMonthFilter(e.target.value)}
                >
                  <option value="Jan-2025">Jan 2025</option>
                  <option value="Feb-2025">Feb 2025</option>
                  <option value="Mar-2025">Mar 2025</option>
                  <option value="Apr-2025">Apr 2025</option>
                  <option value="Dec-2024">Dec 2024</option>
                  <option value="Nov-2024">Nov 2024</option>
                  <option value="Oct-2024">Oct 2024</option>
                  <option value="Sep-2024">Sep 2024</option>
                  <option value="Aug-2024">Aug 2024</option>
                  <option value="Jul-2024">Jul 2024</option>
                  <option value="Jun-2024">Jun 2024</option>
                  <option value="May-2024">May 2024</option>
                  <option value="Apr-2024">Apr 2024</option>
                  <option value="Mar-2024">Mar 2024</option>
                  <option value="Feb-2024">Feb 2024</option>
                  <option value="Jan-2024">Jan 2024</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center">
                <label className="text-sm text-gray-600 mr-2">Year:</label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={activeYearFilter}
                  onChange={(e) => setActiveYearFilter(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              {/* Zone Filter (Conditionally rendered based on activeTab) */}
              {(activeTab === 'overview' || activeTab === 'group-details' || activeTab === 'loss-details') && (
                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Zone:</label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    value={activeZoneFilter}
                    onChange={(e) => setActiveZoneFilter(e.target.value)}
                  >
                    <option value="All Zones">All Zones</option>
                    <option value="Zone FM">Zone FM</option>
                    <option value="Zone 03A">Zone 03A</option>
                    <option value="Zone 03B">Zone 03B</option>
                    <option value="Zone 05">Zone 05</option>
                    <option value="Zone 08">Zone 08</option>
                    <option value="Village Square">Village Square</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">
            {renderTabContent()}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
              <p className="text-sm">© {new Date().getFullYear()} Water Management System | Version 1.0.0</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({ icon, title, active, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-3 md:px-6 md:py-4 transition-colors text-sm md:text-base ${
        active ? 'text-[#4E4456] font-semibold border-b-2 border-[#4E4456]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

// KPI Card Component
const KPICard = ({ title, value, change, changeType, icon, bgGradient, unit = 'units' }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md bg-white h-48`}>
      <div className={`absolute inset-0 opacity-10 ${bgGradient}`}></div>
      <div className="p-6 relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          <div className={`p-2 rounded-full ${bgGradient}`}>
            {icon}
          </div>
        </div>
        <div>
          <div className="mt-4 flex items-baseline">
            <p className="text-4xl font-bold text-gray-800">{value}</p>
            <span className="ml-2 text-gray-500 text-sm">{unit}</span>
          </div>
          <div className="mt-4 flex items-center">
            {changeType === 'increase' ? (
              <ArrowUpRight size={18} className="text-red-500 mr-1" />
            ) : (
              <ArrowDownRight size={18} className="text-green-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
              {change}
            </span>
            <span className="text-gray-500 text-xs ml-2">vs. prev. month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#4E4456] to-[#6E5E76] text-white">
      <div className="w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl font-bold mb-4">Loading Water Management System</h2>
      <p className="text-blue-200">Preparing your dashboard...</p>
    </div>
  );
};

// ===== OVERVIEW SECTION =====
const OverviewSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter }) => {
  // Sample data for overview section
  const kpiData = {
    totalWaterSupply: {
      title: 'TOTAL WATER SUPPLY (L1)',
      value: '46,039',
      unit: 'm³',
      change: '31.9 %',
      changeType: 'increase',
      icon: <Database size={18} className="text-white" />,
      bgGradient: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    zoneDistribution: {
      title: 'ZONE DISTRIBUTION (L2)',
      value: '45,863', // Updated
      unit: 'm³',
      change: '15.9 %', // Updated
      changeType: 'increase',
      icon: <BarChart3 size={18} className="text-white" />,
      bgGradient: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    endUserConsumption: {
      title: 'END USER CONSUMPTION (L3)',
      value: '38,972', // Updated
      unit: 'm³',
      change: '20.7 %', // Updated
      changeType: 'increase',
      icon: <ArrowRightLeft size={18} className="text-white" />,
      bgGradient: "bg-gradient-to-r from-green-500 to-green-600"
    },
    totalWaterLoss: {
      title: 'TOTAL WATER LOSS',
      value: '7,067', // Updated
      unit: 'm³',
      change: '168.5 %', // Updated
      changeType: 'increase',
      icon: <AlertTriangle size={18} className="text-white" />,
      bgGradient: "bg-gradient-to-r from-red-500 to-red-600"
    },
    systemEfficiency: {
      title: 'SYSTEM EFFICIENCY',
      value: '84.7', // Updated
      unit: '%',
      change: '8.4 %', // Updated
      changeType: 'decrease', // Updated
      icon: <RefreshCw size={18} className="text-white" />,
      bgGradient: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  };

  // Data for Water Flow Distribution Bar Chart (derived from image)
  const waterFlowDistributionData = [
    { name: 'Main Supply (L1)', value: 46039 },
    { name: 'End User Consumption (L3)', value: 38972 },
    { name: 'Total Loss', value: 7067 },
  ];

  // Data for Monthly Consumption Trends
  const monthlyConsumptionData = [
    { name: 'Jan-2024', L1: 32803, L2: 28689, L3: 25680 },
    { name: 'Feb-2024', L1: 27996, L2: 25073, L3: 21901 },
    { name: 'Mar-2024', L1: 23860, L2: 24007, L3: 19626 },
    { name: 'Apr-2024', L1: 31869, L2: 28713, L3: 23584 },
    { name: 'May-2024', L1: 30737, L2: 28089, L3: 23692 },
    { name: 'Jun-2024', L1: 41953, L2: 34626, L3: 27865 },
    { name: 'Jul-2024', L1: 35166, L2: 34689, L3: 25961 },
    { name: 'Aug-2024', L1: 35420, L2: 32753, L3: 25245 },
    { name: 'Sep-2024', L1: 41341, L2: 30892, L3: 23744 },
    { name: 'Oct-2024', L1: 31519, L2: 39285, L3: 30881 },
    { name: 'Nov-2024', L1: 35290, L2: 29913, L3: 24792 },
    { name: 'Dec-2024', L1: 36733, L2: 32492, L3: 24545 },
    { name: 'Jan-2025', L1: 32580, L2: 35325, L3: 27898 },
    { name: 'Feb-2025', L1: 44043, L2: 35811, L3: 28369 },
    { name: 'Mar-2025', L1: 34915, L2: 39565, L3: 32283 },
    { name: 'Apr-2025', L1: 46039, L2: 45863, L3: 38972 }
  ];

  // Data for Loss Analysis
  const lossDataOverview = [
    { name: 'Jan-2024', Loss1: 4114, Loss2: 3009, Total: 7123 },
    { name: 'Feb-2024', Loss1: 2923, Loss2: 3172, Total: 6095 },
    { name: 'Mar-2024', Loss1: -147, Loss2: 4381, Total: 4234 },
    { name: 'Apr-2024', Loss1: 3156, Loss2: 5129, Total: 8285 },
    { name: 'May-2024', Loss1: 2648, Loss2: 4397, Total: 7045 },
    { name: 'Jun-2024', Loss1: 7327, Loss2: 6761, Total: 14088 },
    { name: 'Jul-2024', Loss1: 477, Loss2: 8728, Total: 9205 },
    { name: 'Aug-2024', Loss1: 2667, Loss2: 7508, Total: 10175 },
    { name: 'Sep-2024', Loss1: 10449, Loss2: 7148, Total: 17597 },
    { name: 'Oct-2024', Loss1: -7766, Loss2: 8404, Total: 638 },
    { name: 'Nov-2024', Loss1: 5377, Loss2: 5121, Total: 10498 },
    { name: 'Dec-2024', Loss1: 4241, Loss2: 7947, Total: 12188 },
    { name: 'Jan-2025', Loss1: -2745, Loss2: 7427, Total: 4682 },
    { name: 'Feb-2025', Loss1: 8232, Loss2: 7442, Total: 15674 },
    { name: 'Mar-2025', Loss1: -4650, Loss2: 7282, Total: 2632 },
    { name: 'Apr-2025', Loss1: 176, Loss2: 6891, Total: 7067 }
  ];

  const zoneDistributionData = [
    { name: 'Zone FM', value: 1880 },
    { name: 'Zone 03A', value: 4041 },
    { name: 'Zone 03B', value: 2157 },
    { name: 'Zone 05', value: 3737 },
    { name: 'Zone 08', value: 3203 },
    { name: 'Village Square', value: 11 }
  ];

  // Data for System Efficiency Trend Line Chart
  const systemEfficiencyTrendData = [
    { month: 'Jan-2024', efficiency: 78.3 },
    { month: 'Feb-2024', efficiency: 78.2 },
    { month: 'Mar-2024', efficiency: 82.3 },
    { month: 'Apr-2024', efficiency: 74.0 },
    { month: 'May-2024', efficiency: 77.1 },
    { month: 'Jun-2024', efficiency: 66.4 },
    { month: 'Jul-2024', efficiency: 73.8 },
    { month: 'Aug-2024', efficiency: 71.3 },
    { month: 'Sep-2024', efficiency: 57.4 },
    { month: 'Oct-2024', efficiency: 98.0 },
    { month: 'Nov-2024', efficiency: 70.2 },
    { month: 'Dec-2024', efficiency: 66.8 },
    { month: 'Jan-2025', efficiency: 85.6 },
    { month: 'Feb-2025', efficiency: 64.4 },
    { month: 'Mar-2025', efficiency: 92.5 },
    { month: 'Apr-2025', efficiency: 84.7 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#45B39D'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="L1 (Main Bulk Supply)"
          value={kpiData.totalWaterSupply.value}
          unit={kpiData.totalWaterSupply.unit}
          change={kpiData.totalWaterSupply.change}
          changeType={kpiData.totalWaterSupply.changeType}
          icon={<Database size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <KPICard
          title="L2 (Zone+DC)"
          value={kpiData.zoneDistribution.value}
          unit={kpiData.zoneDistribution.unit}
          change={kpiData.zoneDistribution.change}
          changeType={kpiData.zoneDistribution.changeType}
          icon={<BarChart3 size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-orange-500 to-orange-600"
        />
        <KPICard
          title="L3 (Individual+DC)"
          value={kpiData.endUserConsumption.value}
          unit={kpiData.endUserConsumption.unit}
          change={kpiData.endUserConsumption.change}
          changeType={kpiData.endUserConsumption.changeType}
          icon={<ArrowRightLeft size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-green-500 to-green-600"
        />
        <KPICard
          title="Stage 1 Loss (L1-L2)"
          value={kpiData.totalWaterLoss.value} // This needs to be Stage 1 Loss, not totalWaterLoss
          unit={kpiData.totalWaterLoss.unit}
          change={kpiData.totalWaterLoss.change}
          changeType={kpiData.totalWaterLoss.changeType}
          icon={<ArrowDownRight size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-red-500 to-red-600"
        />
        <KPICard
          title="Stage 2 Loss (L2-L3)"
          value={kpiData.totalWaterLoss.value} // This needs to be Stage 2 Loss, not totalWaterLoss
          unit={kpiData.totalWaterLoss.unit}
          change={kpiData.totalWaterLoss.change}
          changeType={kpiData.totalWaterLoss.changeType}
          icon={<ArrowDownRight size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <KPICard
          title="Total Loss"
          value={kpiData.totalWaterLoss.value}
          unit={kpiData.totalWaterLoss.unit}
          change={kpiData.totalWaterLoss.change}
          changeType={kpiData.totalWaterLoss.changeType}
          icon={<AlertTriangle size={18} className="text-white" />}
          bgGradient="bg-gradient-to-r from-red-600 to-red-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Flow Distribution Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Water Flow Distribution - {activeMonthFilter}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterFlowDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} m³`, 'Volume']}
                />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="Volume (m³)" radius={[4, 4, 0, 0]} /> {/* Added rounded top */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Efficiency Trend Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Efficiency Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemEfficiencyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} label={{ value: 'Efficiency %', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'Efficiency']}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Efficiency" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-sm font-semibold">Overall Efficiency: <span className="text-blue-600">84.7%</span></p>
            <p className="text-xs text-gray-500">38,972 of 46,039 m³ utilized</p>
            <p className="text-sm font-semibold mt-2">Stage 01 Loss: <span className="text-red-600">0.4%</span></p>
            <p className="text-xs text-gray-500">176 m³ lost before reaching zones</p>
            <p className="text-sm font-semibold mt-2">Stage 02 Loss: <span className="text-red-600">15.0%</span></p>
            <p className="text-xs text-gray-500">6,891 m³ lost within zones</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Consumption Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyConsumptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="L1" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="L1 (Main Bulk)" />
                <Line type="monotone" dataKey="L2" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="L2 (Zone Bulk)" />
                <Line type="monotone" dataKey="L3" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="L3 (Individual)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lossDataOverview} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="Loss1" fill="#ef4444" name="Stage 1 Loss" />
                <Bar dataKey="Loss2" fill="#8b5cf6" name="Stage 2 Loss" />
                <Line type="monotone" dataKey="Total" stroke="#f43f5e" strokeWidth={2} name="Total Loss" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Zone Distribution ({activeMonthFilter})</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {zoneDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} units`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Percentage by Zone ({activeMonthFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Zone FM', loss: 25.3 },
                  { name: 'Zone 03A', loss: 78.9 },
                  { name: 'Zone 03B', loss: 66.6 },
                  { name: 'Zone 05', loss: 59.5 },
                  { name: 'Zone 08', loss: 70.2 },
                  { name: 'VS', loss: 38.5 }
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Loss Percentage']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="loss"
                  fill="#f43f5e"
                  radius={[0, 4, 4, 0]}
                  name="Loss %"
                  label={{ position: 'right', formatter: (value) => `${value}%` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== GROUP DETAILS SECTION =====
const GroupDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter }) => {
  // Convert generic activeZoneFilter to actual zone code for data filtering
  const getZoneCode = (filter) => {
    switch(filter) {
      case 'Zone FM': return 'FM';
      case 'Zone 03A': return '03A';
      case 'Zone 03B': return '03B';
      case 'Zone 05': return '05';
      case 'Zone 08': return '08';
      case 'Village Square': return 'VS';
      default: return null;
    }
  };

  const zoneCode = activeZoneFilter !== 'All Zones' ? getZoneCode(activeZoneFilter) : null;

  // Sample meter data for the customer details table
  const meterData = [
    { id: '4300008', customer: 'Habib Ismail Ali Al Suwaid', zone: 'Zone 03B', consumption: 14 },
    { id: '4300009', customer: 'Leopold Julian Zentner & Erica Kalobwe', zone: 'Zone 03B', consumption: 48 },
    { id: '4300020', customer: 'Wahibah R H Al Mulla', zone: 'Zone 03B', consumption: 3 },
    { id: '4300025', customer: 'Britta Stefanie Gerdes & Dr. Barbara Ungeheuer', zone: 'Zone 03B', consumption: 23 },
    { id: '4300029', customer: 'Al Fadhal Mohamed Ahmed Al Harthy', zone: 'Zone 03B', consumption: 0 },
    { id: '4300042', customer: 'Nasser Abdelsalam Abdelrehiem', zone: 'Zone 03B', consumption: 5 },
    { id: '4300054', customer: 'Nekmohamed Manji & Zahara Manji', zone: 'Zone 03B', consumption: 11 },
    { id: '4300056', customer: 'Al Sayyid Abdulla Hamad Saif Al Busaidy', zone: 'Zone 03B', consumption: 7 },
    { id: '4300057', customer: 'Radhibai Thakurdas Gangwani', zone: 'Zone 03B', consumption: 46 },
    { id: '4300060', customer: 'Anwar Salim Ali Al-Mahri', zone: 'Zone 03B', consumption: 42 },
    { id: '4300062', customer: 'Vanguard Oil Tools and Services LLC', zone: 'Zone 03B', consumption: 10 },
    { id: '4300064', customer: 'Eihab Saleh Moahmed Al Yafi', zone: 'Zone 03B', consumption: 0 },
    { id: '4300065', customer: 'Fahad Al-Hamdani', zone: 'Zone FM', consumption: 25 },
    { id: '4300066', customer: 'Sara Al-Balushi', zone: 'Zone FM', consumption: 18 },
    { id: '4300067', customer: 'Ahmed Al-Saidi', zone: 'Zone 03A', consumption: 30 },
    { id: '4300068', customer: 'Fatima Al-Riyami', zone: 'Zone 03A', consumption: 55 },
    { id: '4300069', customer: 'Khalid Al-Hajri', zone: 'Zone 05', consumption: 12 },
    { id: '4300070', customer: 'Aisha Al-Hashmi', zone: 'Zone 05', consumption: 7 },
    { id: '4300071', customer: 'Sultan Al-Amri', zone: 'Zone 08', consumption: 40 },
    { id: '4300072', customer: 'Noora Al-Hinai', zone: 'Zone 08', consumption: 22 },
    { id: '4300073', customer: 'Mohammed Al-Maamari', zone: 'Village Square', consumption: 1 },
    { id: '4300074', customer: 'Zainab Al-Kalbani', zone: 'Village Square', consumption: 2 },
  ];

  // Filter meters based on selected zone if a specific zone is selected
  const filteredMeters = zoneCode
    ? meterData.filter(meter => meter.zone === activeZoneFilter)
    : meterData;

  // Sample data for zone analysis
  const zoneData = {
    'FM': { bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 },
    '03A': { bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 },
    '03B': { bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 },
    '05': { bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 },
    '08': { bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 },
    'VS': { bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
  };

  // Data for historical chart (example for Zone FM)
  const historicalData = [
    { month: 'Jan-2024', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
    { month: 'Feb-2024', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
    { month: 'Mar-2024', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
    { month: 'Apr-2024', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
    { month: 'May-2024', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
    { month: 'Jun-2024', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
    { month: 'Jul-2024', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
    { month: 'Aug-2024', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
    { month: 'Sep-2024', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
    { month: 'Oct-2024', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
    { month: 'Nov-2024', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
    { month: 'Dec-2024', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 },
    { month: 'Jan-2025', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
    { month: 'Feb-2025', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
    { month: 'Mar-2025', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
    { month: 'Apr-2025', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedMeters = filteredMeters.filter(meter =>
    meter.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.id.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-6">
      {/* Zone Analysis Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {activeZoneFilter === 'All Zones' ? 'Zone Analysis Summary' : activeZoneFilter + ' Analysis'}
        </h3>

        {activeZoneFilter !== 'All Zones' && zoneCode && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Bulk Meter</h4>
              <p className="text-3xl font-bold text-blue-600">{zoneData[zoneCode].bulk}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Individual Meters</h4>
              <p className="text-3xl font-bold text-green-600">{zoneData[zoneCode].individual}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Loss</h4>
              <p className="text-3xl font-bold text-red-600">{zoneData[zoneCode].loss}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Loss Percentage</h4>
              <p className="text-3xl font-bold text-purple-600">{zoneData[zoneCode].lossPercentage}%</p>
              <p className="text-sm text-gray-500 mt-1">of total bulk</p>
            </div>
          </div>
        )}

        {activeZoneFilter === 'All Zones' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Zone</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Bulk Meter</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Individual Meters</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Loss</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Loss %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.keys(zoneData).map(zone => (
                  <tr key={zone} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">Zone {zone}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].bulk}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].individual}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].loss}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].lossPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="bulk" fill="#3b82f6" name="Bulk Meter" />
                <Bar yAxisId="left" dataKey="individual" fill="#10b981" name="Individual Meters" />
                <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#f43f5e" strokeWidth={2} name="Loss" />
                <Line yAxisId="right" type="monotone" dataKey="lossPercentage" stroke="#8b5cf6" strokeWidth={2} name="Loss %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Customer Details Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {activeZoneFilter === 'All Zones' ? 'Customer Details' : activeZoneFilter + ' Customer Details'}
          </h3>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search customers..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Account #</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Zone</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Consumption (units)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {searchedMeters.length > 0 ? (
                searchedMeters.map((meter) => (
                  <tr key={meter.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{meter.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{meter.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{meter.zone}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              meter.consumption > 40 ? 'bg-red-500' :
                              meter.consumption > 20 ? 'bg-yellow-500' :
                              meter.consumption > 0 ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${Math.min(100, (meter.consumption / 50) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{meter.consumption}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">No customers found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">12</span> of <span className="font-medium">42</span> results
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">Previous</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">1</button>
            <button className="px-3 py-1 border border-[#4E4456] bg-[#4E4456] text-white rounded-md">2</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">3</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== TYPE DETAILS SECTION =====
const TypeDetailsSection = ({ activeMonthFilter, activeYearFilter }) => {
  // Sample data for type details
  const typeData = {
    "IRR_Services": {
      "name": "Irrigation Services",
      "consumption": [
        { month: 'Jan-2024', value: 3758, percentage: 11.5 },
        { month: 'Feb-2024', value: 2765, percentage: 9.9 },
        { month: 'Mar-2024', value: 2157, percentage: 9.0 },
        { month: 'Apr-2024', value: 2798, percentage: 8.8 },
        { month: 'May-2024', value: 2211, percentage: 7.2 },
        { month: 'Jun-2024', value: 3991, percentage: 9.5 },
        { month: 'Jul-2024', value: 4376, percentage: 12.4 },
        { month: 'Aug-2024', value: 1640, percentage: 4.6 },
        { month: 'Sep-2024', value: 1190, percentage: 2.9 },
        { month: 'Oct-2024', value: 2763, percentage: 8.8 },
        { month: 'Nov-2024', value: 297, percentage: 0.8 },
        { month: 'Dec-2024', value: 242, percentage: 0.7 },
        { month: 'Jan-2025', value: 208, percentage: 0.6 },
        { month: 'Feb-2025', value: 286, percentage: 0.6 },
        { month: 'Mar-2025', value: 326, percentage: 0.9 },
        { month: 'Apr-2025', value: 1433, percentage: 3.1 }
      ]
    },
    "Residential_Villa": {
      "name": "Residential Villa",
      "consumption": [
        { month: 'Jan-2024', value: 3984, percentage: 12.1 },
        { month: 'Feb-2024', value: 3031, percentage: 10.8 },
        { month: 'Mar-2024', value: 3146, percentage: 13.2 },
        { month: 'Apr-2024', value: 3917, percentage: 12.3 },
        { month: 'May-2024', value: 3704, percentage: 12.1 },
        { month: 'Jun-2024', value: 3916, percentage: 9.3 },
        { month: 'Jul-2024', value: 3882, percentage: 11.0 },
        { month: 'Aug-2024', value: 4191, percentage: 11.8 },
        { month: 'Sep-2024', value: 3673, percentage: 8.9 },
        { month: 'Oct-2024', value: 3834, percentage: 12.2 },
        { month: 'Nov-2024', value: 3853, percentage: 10.9 },
        { month: 'Dec-2024', value: 3510, percentage: 9.6 },
        { month: 'Jan-2025', value: 3144, percentage: 9.7 },
        { month: 'Feb-2025', value: 2913, percentage: 6.6 },
        { month: 'Mar-2025', value: 3549, percentage: 10.2 },
        { month: 'Apr-2025', value: 3618, percentage: 7.9 }
      ]
    },
    "Residential_Apartment": {
      "name": "Residential Apartment",
      "consumption": [
        { month: 'Jan-2024', value: 1354, percentage: 4.1 },
        { month: 'Feb-2024', value: 1194, percentage: 4.3 },
        { month: 'Mar-2024', value: 1164, percentage: 4.9 },
        { month: 'Apr-2024', value: 1329, percentage: 4.2 },
        { month: 'May-2024', value: 1343, percentage: 4.4 },
        { month: 'Jun-2024', value: 1165, percentage: 2.8 },
        { month: 'Jul-2024', value: 1140, percentage: 3.2 },
        { month: 'Aug-2024', value: 1125, percentage: 3.2 },
        { month: 'Sep-2024', value: 1005, percentage: 2.4 },
        { month: 'Oct-2024', value: 1364, percentage: 4.3 },
        { month: 'Nov-2024', value: 1214, percentage: 3.4 },
        { month: 'Dec-2024', value: 1148, percentage: 3.1 },
        { month: 'Jan-2025', value: 1098, percentage: 3.4 },
        { month: 'Feb-2025', value: 1078, percentage: 2.4 },
        { month: 'Mar-2025', value: 944, percentage: 2.7 },
        { month: 'Apr-2025', value: 1320, percentage: 2.9 }
      ]
    },
    "Building_Common": {
      "name": "Building Common Areas",
      "consumption": [
        { month: 'Jan-2024', value: 340, percentage: 1.0 },
        { month: 'Feb-2024', value: 345, percentage: 1.2 },
        { month: 'Mar-2024', value: 247, percentage: 1.0 },
        { month: 'Apr-2024', value: 212, percentage: 0.7 },
        { month: 'May-2024', value: 207, percentage: 0.7 },
        { month: 'Jun-2024', value: 250, percentage: 0.6 },
        { month: 'Jul-2024', value: 233, percentage: 0.7 },
        { month: 'Aug-2024', value: 136, percentage: 0.4 },
        { month: 'Sep-2024', value: 125, percentage: 0.3 },
        { month: 'Oct-2024', value: 142, percentage: 0.5 },
        { month: 'Nov-2024', value: 178, percentage: 0.5 },
        { month: 'Dec-2024', value: 292, percentage: 0.8 },
        { month: 'Jan-2025', value: 349, percentage: 1.1 },
        { month: 'Feb-2025', value: 273, percentage: 0.6 },
        { month: 'Mar-2025', value: 240, percentage: 0.7 },
        { month: 'Apr-2025', value: 267, percentage: 0.6 }
      ]
    },
    "Retail": {
      "name": "Retail",
      "consumption": [
        { month: 'Jan-2024', value: 15620, percentage: 47.6 },
        { month: 'Feb-2024', value: 13765, percentage: 49.2 },
        { month: 'Mar-2024', value: 12307, percentage: 51.6 },
        { month: 'Apr-2024', value: 14275, percentage: 44.8 },
        { month: 'May-2024', value: 15242, percentage: 49.6 },
        { month: 'Jun-2024', value: 16285, percentage: 38.8 },
        { month: 'Jul-2024', value: 14127, percentage: 40.2 },
        { month: 'Aug-2024', value: 15247, percentage: 43.0 },
        { month: 'Sep-2024', value: 14505, percentage: 35.1 },
        { month: 'Oct-2024', value: 19996, percentage: 63.4 },
        { month: 'Nov-2024', value: 17806, percentage: 50.5 },
        { month: 'Dec-2024', value: 17045, percentage: 46.4 },
        { month: 'Jan-2025', value: 20584, percentage: 63.2 },
        { month: 'Feb-2025', value: 21405, percentage: 48.6 },
        { month: 'Mar-2025', value: 25076, percentage: 71.8 },
        { month: 'Apr-2025', value: 30251, percentage: 65.7 }
      ]
    }
  };

  // Get data for the selected month
  const selectedMonthData = Object.keys(typeData).map(key => {
    const typeInfo = typeData[key];
    const monthData = typeInfo.consumption.find(m => m.month === activeMonthFilter) || typeInfo.consumption[0];
    return {
      name: typeInfo.name,
      value: monthData.value,
      percentage: monthData.percentage
    };
  });

  // Filter consumption data for the selected year
  const selectedYearData = Object.keys(typeData).map(key => {
    const typeInfo = typeData[key];
    return {
      name: typeInfo.name,
      data: typeInfo.consumption
        .filter(m => m.month.includes(activeYearFilter))
        .map(m => ({ month: m.month, value: m.value }))
    };
  });

  // Create data for all types comparison chart
  const comparisonData = [];
  // Ensure all months are included for the comparison chart, even if some types have no data for a specific month
  const allMonths = [...new Set(Object.values(typeData).flatMap(type => type.consumption.map(c => c.month)))].sort();

  allMonths.forEach(month => {
    if (month.includes(activeYearFilter)) {
      const monthEntry = { month: month };
      Object.keys(typeData).forEach(type => {
        const typeMonthData = typeData[type].consumption.find(m => m.month === month);
        if (typeMonthData) {
          monthEntry[typeData[type].name] = typeMonthData.value;
        } else {
          monthEntry[typeData[type].name] = 0; // Assign 0 if no data for that month
        }
      });
      comparisonData.push(monthEntry);
    }
  });


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#45B39D'];

  return (
    <div className="space-y-6">
      {/* Monthly Type Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Consumption Type Distribution ({activeMonthFilter})</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedMonthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {selectedMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} units`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedMonthData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  formatter={(value, name, props) => [`${value} units (${props.payload.percentage}%)`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  name="Consumption"
                  label={{ position: 'right', formatter: (value) => `${value} units` }}
                >
                  {selectedMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Types Comparison Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Consumption Types Comparison ({activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={comparisonData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="Retail" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Residential Villa" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Irrigation Services" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Residential Apartment" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Building Common Areas" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type Percentage Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Type Percentage of Total ({activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={typeData.Retail.consumption.filter(item => item.month.includes(activeYearFilter))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  name="Retail"
                  stroke={COLORS[4]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Residential_Villa.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Residential Villa"
                  stroke={COLORS[1]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.IRR_Services.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Irrigation"
                  stroke={COLORS[2]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Residential_Apartment.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Residential Apt"
                  stroke={COLORS[3]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Building_Common.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Common Areas"
                  stroke={COLORS[0]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Type Details Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(typeData).map((key, index) => (
          <div key={key} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 text-white font-semibold" style={{backgroundColor: COLORS[index % COLORS.length]}}>
              {typeData[key].name} Consumption Details
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {typeData[key].consumption
                    .filter(item => item.month.includes(activeYearFilter))
                    .map(item => (
                    <tr key={item.month} className={item.month === activeMonthFilter ? 'bg-blue-50' : ''}>
                      <td className="py-2 px-3 text-xs text-gray-900">{item.month}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">{item.value}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== LOSS DETAILS SECTION =====
const LossDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter }) => {
  // Sample loss details data
  const lossData = {
    overall: [
      { month: 'Jan-2024', l1: 32803, l2: 28689, l3: 25680, loss1: 4114, loss2: 3009, totalLoss: 7123, lossPercentage: 21.7 },
      { month: 'Feb-2024', l1: 27996, l2: 25073, l3: 21901, loss1: 2923, loss2: 3172, totalLoss: 6095, lossPercentage: 21.8 },
      { month: 'Mar-2024', l1: 23860, l2: 24007, l3: 19626, loss1: -147, loss2: 4381, totalLoss: 4234, lossPercentage: 17.7 },
      { month: 'Apr-2024', l1: 31869, l2: 28713, l3: 23584, loss1: 3156, loss2: 5129, totalLoss: 8285, lossPercentage: 26.0 },
      { month: 'May-2024', l1: 30737, l2: 28089, l3: 23692, loss1: 2648, loss2: 4397, totalLoss: 7045, lossPercentage: 22.9 },
      { month: 'Jun-2024', l1: 41953, l2: 34626, l3: 27865, loss1: 7327, loss2: 6761, totalLoss: 14088, lossPercentage: 33.6 },
      { month: 'Jul-2024', l1: 35166, l2: 34689, l3: 25961, loss1: 477, loss2: 8728, totalLoss: 9205, lossPercentage: 26.2 },
      { month: 'Aug-2024', l1: 35420, l2: 32753, l3: 25245, loss1: 2667, loss2: 7508, totalLoss: 10175, lossPercentage: 28.7 },
      { month: 'Sep-2024', l1: 41341, l2: 30892, l3: 23744, loss1: 10449, loss2: 7148, totalLoss: 17597, lossPercentage: 42.6 },
      { month: 'Oct-2024', l1: 31519, l2: 39285, l3: 30881, loss1: -7766, loss2: 8404, totalLoss: 638, lossPercentage: 2.0 },
      { month: 'Nov-2024', l1: 35290, l2: 29913, l3: 24792, loss1: 5377, loss2: 5121, totalLoss: 10498, lossPercentage: 29.7 },
      { month: 'Dec-2024', l1: 36733, l2: 32492, l3: 24545, loss1: 4241, loss2: 7947, totalLoss: 12188, lossPercentage: 33.2 },
      { month: 'Jan-2025', l1: 32580, l2: 35325, l3: 27898, loss1: -2745, loss2: 7427, totalLoss: 4682, lossPercentage: 14.4 },
      { month: 'Feb-2025', l1: 44043, l2: 35811, l3: 28369, loss1: 8232, loss2: 7442, totalLoss: 15674, lossPercentage: 35.6 },
      { month: 'Mar-2025', l1: 34915, l2: 39565, l3: 32283, loss1: -4650, loss2: 7282, totalLoss: 2632, lossPercentage: 7.5 },
      { month: 'Apr-2025', l1: 46039, l2: 45863, l3: 38972, loss1: 176, loss2: 6891, totalLoss: 7067, lossPercentage: 15.4 }
    ],
    zoneDetails: {
      'FM': [
        { month: 'Jan-2024', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
        { month: 'Feb-2024', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
        { month: 'Mar-2024', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
        { month: 'Apr-2024', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
        { month: 'May-2024', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
        { month: 'Jun-2024', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
        { month: 'Jul-2024', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
        { month: 'Aug-2024', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
        { month: 'Sep-2024', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
        { month: 'Oct-2024', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
        { month: 'Nov-2024', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
        { month: 'Dec-2024', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 },
        { month: 'Jan-2025', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
        { month: 'Feb-2025', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
        { month: 'Mar-2025', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
        { month: 'Apr-2025', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
      ],
      '03A': [
        { month: 'Jan-2024', bulk: 1234, individual: 930, loss: 304, lossPercentage: 24.6 },
        { month: 'Feb-2024', bulk: 1099, individual: 782, loss: 317, lossPercentage: 28.8 },
        { month: 'Mar-2024', bulk: 1297, individual: 793, loss: 504, lossPercentage: 38.9 },
        { month: 'Apr-2024', bulk: 1892, individual: 789, loss: 1103, lossPercentage: 58.3 },
        { month: 'May-2024', bulk: 2254, individual: 879, loss: 1375, lossPercentage: 61.0 },
        { month: 'Jun-2024', bulk: 2227, individual: 786, loss: 1441, lossPercentage: 64.7 },
        { month: 'Jul-2024', bulk: 3313, individual: 766, loss: 2547, lossPercentage: 76.9 },
        { month: 'Aug-2024', bulk: 3172, individual: 846, loss: 2326, lossPercentage: 73.3 },
        { month: 'Sep-2024', bulk: 2698, individual: 775, loss: 1923, lossPercentage: 71.3 },
        { month: 'Oct-2024', bulk: 3715, individual: 1009, loss: 2706, lossPercentage: 72.8 },
        { month: 'Nov-2024', bulk: 3501, individual: 986, loss: 2515, lossPercentage: 71.8 },
        { month: 'Dec-2024', bulk: 3796, individual: 792, loss: 3004, lossPercentage: 79.1 },
        { month: 'Jan-2025', bulk: 4235, individual: 750, loss: 3485, lossPercentage: 82.3 },
        { month: 'Feb-2025', bulk: 4273, individual: 732, loss: 3541, lossPercentage: 82.9 },
        { month: 'Mar-2025', bulk: 3591, individual: 561, loss: 3030, lossPercentage: 84.4 },
        { month: 'Apr-2025', bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 }
      ],
      '03B': [
        { month: 'Jan-2024', bulk: 2653, individual: 997, loss: 1656, lossPercentage: 62.4 },
        { month: 'Feb-2024', bulk: 2169, individual: 821, loss: 1348, lossPercentage: 62.1 },
        { month: 'Mar-2024', bulk: 2315, individual: 873, loss: 1442, lossPercentage: 62.3 },
        { month: 'Apr-2024', bulk: 2381, individual: 945, loss: 1436, lossPercentage: 60.3 },
        { month: 'May-2024', bulk: 2634, individual: 934, loss: 1700, lossPercentage: 64.5 },
        { month: 'Jun-2024', bulk: 2932, individual: 884, loss: 2048, lossPercentage: 69.8 },
        { month: 'Jul-2024', bulk: 3369, individual: 828, loss: 2541, lossPercentage: 75.4 },
        { month: 'Aug-2024', bulk: 3458, individual: 812, loss: 2646, lossPercentage: 76.5 },
        { month: 'Sep-2024', bulk: 3742, individual: 814, loss: 2928, lossPercentage: 78.2 },
        { month: 'Oct-2024', bulk: 2906, individual: 914, loss: 1992, lossPercentage: 68.5 },
        { month: 'Nov-2024', bulk: 2695, individual: 712, loss: 1983, lossPercentage: 73.6 },
        { month: 'Dec-2024', bulk: 3583, individual: 929, loss: 2654, lossPercentage: 74.1 },
        { month: 'Jan-2025', bulk: 3256, individual: 683, loss: 2573, lossPercentage: 79.0 },
        { month: 'Feb-2025', bulk: 2962, individual: 625, loss: 2337, lossPercentage: 78.9 },
        { month: 'Mar-2025', bulk: 3331, individual: 624, loss: 2707, lossPercentage: 81.3 },
        { month: 'Apr-2025', bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 }
      ],
      '05': [
        { month: 'Jan-2024', bulk: 4286, individual: 2043, loss: 2243, lossPercentage: 52.3 },
        { month: 'Feb-2024', bulk: 3897, individual: 1481, loss: 2416, lossPercentage: 62.0 },
        { month: 'Mar-2024', bulk: 4127, individual: 1054, loss: 3073, lossPercentage: 74.5 },
        { month: 'Apr-2024', bulk: 4911, individual: 1661, loss: 3250, lossPercentage: 66.2 },
        { month: 'May-2024', bulk: 2639, individual: 873, loss: 1766, lossPercentage: 66.9 },
        { month: 'Jun-2024', bulk: 4992, individual: 1180, loss: 3812, lossPercentage: 76.4 },
        { month: 'Jul-2024', bulk: 5305, individual: 1304, loss: 4001, lossPercentage: 75.4 },
        { month: 'Aug-2024', bulk: 4039, individual: 1022, loss: 3017, lossPercentage: 74.7 },
        { month: 'Sep-2024', bulk: 2736, individual: 727, loss: 2009, lossPercentage: 73.4 },
        { month: 'Oct-2024', bulk: 3383, individual: 1079, loss: 2304, lossPercentage: 68.1 },
        { month: 'Nov-2024', bulk: 1438, individual: 967, loss: 471, lossPercentage: 32.8 },
        { month: 'Dec-2024', bulk: 3788, individual: 1098, loss: 2690, lossPercentage: 71.0 },
        { month: 'Jan-2025', bulk: 4267, individual: 1176, loss: 3091, lossPercentage: 72.4 },
        { month: 'Feb-2025', bulk: 4231, individual: 1020, loss: 3211, lossPercentage: 75.9 },
        { month: 'Mar-2025', bulk: 3862, individual: 1079, loss: 2783, lossPercentage: 72.1 },
        { month: 'Apr-2025', bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 }
      ],
      '08': [
        { month: 'Jan-2024', bulk: 2170, individual: 1783, loss: 387, lossPercentage: 17.8 },
        { month: 'Feb-2024', bulk: 1825, individual: 1052, loss: 773, lossPercentage: 42.4 },
        { month: 'Mar-2024', bulk: 2021, individual: 1297, loss: 724, lossPercentage: 35.8 },
        { month: 'Apr-2024', bulk: 2753, individual: 2096, loss: 657, lossPercentage: 23.9 },
        { month: 'May-2024', bulk: 2722, individual: 2091, loss: 631, lossPercentage: 23.2 },
        { month: 'Jun-2024', bulk: 3193, individual: 2447, loss: 746, lossPercentage: 23.4 },
        { month: 'Jul-2024', bulk: 3639, individual: 2178, loss: 1461, lossPercentage: 40.1 },
        { month: 'Aug-2024', bulk: 3957, individual: 2453, loss: 1504, lossPercentage: 38.0 },
        { month: 'Sep-2024', bulk: 3947, individual: 2501, loss: 1446, lossPercentage: 36.6 },
        { month: 'Oct-2024', bulk: 4296, individual: 1669, loss: 2627, lossPercentage: 61.1 },
        { month: 'Nov-2024', bulk: 3569, individual: 1620, loss: 1949, lossPercentage: 54.6 },
        { month: 'Dec-2024', bulk: 3018, individual: 1587, loss: 1431, lossPercentage: 47.4 },
        { month: 'Jan-2025', bulk: 1547, individual: 1088, loss: 459, lossPercentage: 29.7 },
        { month: 'Feb-2025', bulk: 1498, individual: 1198, loss: 300, lossPercentage: 20.0 },
        { month: 'Mar-2025', bulk: 2605, individual: 1917, loss: 688, lossPercentage: 26.4 },
        { month: 'Apr-2025', bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 }
      ],
      'VS': [
        { month: 'Jan-2024', bulk: 10, individual: 8, loss: 2, lossPercentage: 20.0 },
        { month: 'Feb-2024', bulk: 12, individual: 9, loss: 3, lossPercentage: 25.0 },
        { month: 'Mar-2024', bulk: 11, individual: 7, loss: 4, lossPercentage: 36.4 },
        { month: 'Apr-2024', bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 },
        { month: 'May-2024', bulk: 14, individual: 9, loss: 5, lossPercentage: 35.7 },
        { month: 'Jun-2024', bulk: 15, individual: 10, loss: 5, lossPercentage: 33.3 },
        { month: 'Jul-2024', bulk: 16, individual: 11, loss: 5, lossPercentage: 31.3 },
        { month: 'Aug-2024', bulk: 17, individual: 12, loss: 5, lossPercentage: 29.4 },
        { month: 'Sep-2024', bulk: 18, individual: 13, loss: 5, lossPercentage: 27.8 },
        { month: 'Oct-2024', bulk: 19, individual: 14, loss: 5, lossPercentage: 26.3 },
        { month: 'Nov-2024', bulk: 20, individual: 15, loss: 5, lossPercentage: 25.0 },
        { month: 'Dec-2024', bulk: 21, individual: 16, loss: 5, lossPercentage: 23.8 },
        { month: 'Jan-2025', bulk: 22, individual: 17, loss: 5, lossPercentage: 22.7 },
        { month: 'Feb-2025', bulk: 23, individual: 18, loss: 5, lossPercentage: 21.7 },
        { month: 'Mar-2025', bulk: 24, individual: 19, loss: 5, lossPercentage: 20.8 },
        { month: 'Apr-2025', bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
      ]
    }
  };

  // Sample data for different loss types
  const lossTypeData = [
    { type: 'Physical Leakage', value: 12000, percentage: 52.5 },
    { type: 'Unbilled Authorized Consumption', value: 3000, percentage: 13.1 },
    { type: 'Unauthorized Consumption', value: 5000, percentage: 21.9 },
    { type: 'Administrative Losses', value: 2837, percentage: 12.4 },
  ];

  // Sample historical data for total loss
  const historicalTotalLossData = lossData.overall.filter(item => item.month.includes(activeYearFilter));

  // Sample data for loss by zone for a specific month (e.g., April 2025)
  const lossByZoneData = Object.keys(lossData.zoneDetails).map(zoneKey => {
    const zoneDetail = lossData.zoneDetails[zoneKey].find(item => item.month === activeMonthFilter);
    return {
      name: `Zone ${zoneKey}`,
      loss: zoneDetail ? zoneDetail.loss : 0
    };
  });

  const PIE_COLORS_LOSS = ['#E53935', '#FB8C00', '#FDD835', '#42A5F5']; // Red, Orange, Yellow, Blue

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Breakdown by Type ({activeMonthFilter} {activeYearFilter})</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Loss Type</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Volume (units)</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Percentage of Total Loss (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lossTypeData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{data.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{data.value.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{data.percentage.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Historical Total Loss Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTotalLossData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="totalLoss" stroke="#EF4444" fillOpacity={1} fill="url(#colorTotalLoss)" name="Total Loss" />
                <defs>
                  <linearGradient id="colorTotalLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Distribution by Type ({activeMonthFilter} {activeYearFilter})</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="type"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {lossTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS_LOSS[index % PIE_COLORS_LOSS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [`${value.toLocaleString()} units`, props.payload.type]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {activeZoneFilter !== 'All Zones' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss by Zone - {activeZoneFilter} ({activeMonthFilter} {activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={lossByZoneData.filter(d => d.name === activeZoneFilter)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} units`, 'Loss Volume']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="loss" fill="#EF4444" name="Loss Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeZoneFilter === 'All Zones' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss by All Zones ({activeMonthFilter} {activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={lossByZoneData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} units`, 'Loss Volume']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="loss" fill="#EF4444" name="Loss Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterAnalysisDashboard;