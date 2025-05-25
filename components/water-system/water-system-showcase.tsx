import React from 'react';
import { 
  TrendingUp, TrendingDown, Activity, Droplet, 
  AlertCircle, Building, Filter, ChevronRight,
  BarChart3, PieChart, LineChart, Layers
} from 'lucide-react';

// Feature Showcase Component
export const WaterSystemShowcase = () => {
  const features = [
    {
      icon: <Filter className="w-6 h-6 text-blue-500" />,
      title: "Smart Filtration System",
      description: "Advanced filtering by zone, month, and year with real-time data updates",
      highlights: ["Zone-specific analysis", "Monthly comparisons", "Year-over-year trends"]
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Interactive Visualizations",
      description: "Beautiful charts and graphs for comprehensive water consumption analysis",
      highlights: ["Composed charts", "Radar charts", "Area charts", "Pie charts"]
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-500" />,
      title: "Multiple View Modes",
      description: "Switch between Overview, Detailed, and Comparison views",
      highlights: ["Zone overview cards", "Detailed analysis", "Multi-zone comparison"]
    },
    {
      icon: <Activity className="w-6 h-6 text-orange-500" />,
      title: "Real-time Metrics",
      description: "Track consumption, losses, and efficiency in real-time",
      highlights: ["Efficiency gauges", "Loss tracking", "Trend indicators"]
    }
  ];

  const sampleZoneData = [
    { zone: "Zone FM", bulk: 1880, individual: 1404, loss: 476, efficiency: 74.7, trend: "up" },
    { zone: "Zone 03A", bulk: 4041, individual: 854, loss: 3187, efficiency: 21.1, trend: "down" },
    { zone: "Zone 03B", bulk: 2157, individual: 721, loss: 1436, efficiency: 33.4, trend: "stable" },
    { zone: "Zone 05", bulk: 3737, individual: 1514, loss: 2223, efficiency: 40.5, trend: "down" },
    { zone: "Zone 08", bulk: 3203, individual: 953, loss: 2250, efficiency: 29.8, trend: "up" },
    { zone: "Village Square", bulk: 13, individual: 8, loss: 5, efficiency: 61.5, trend: "stable" }
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Water System Enhanced Group Details
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced water consumption analytics with smart filtrations and beautiful visualizations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-800 ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <ChevronRight className="w-4 h-4 mr-1 text-gray-400" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sample Zone Performance Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Zone Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleZoneData.map((zone, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-700">{zone.zone}</h3>
                  <div className="flex items-center">
                    {zone.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : zone.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    ) : (
                      <Activity className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Bulk</p>
                    <p className="font-bold text-blue-600">{zone.bulk} m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Individual</p>
                    <p className="font-bold text-green-600">{zone.individual} m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Loss</p>
                    <p className="font-bold text-red-600">{zone.loss} m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Efficiency</p>
                    <p className="font-bold text-purple-600">{zone.efficiency}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Modes Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available View Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-8 mb-4">
                <PieChart className="w-16 h-16 text-blue-500 mx-auto" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Overview Mode</h3>
              <p className="text-gray-600">Quick summary of all zones with performance cards and trends</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-8 mb-4">
                <BarChart3 className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Detailed Mode</h3>
              <p className="text-gray-600">In-depth analysis with consumption flow and efficiency gauges</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-8 mb-4">
                <LineChart className="w-16 h-16 text-purple-500 mx-auto" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Comparison Mode</h3>
              <p className="text-gray-600">Compare multiple zones with interactive charts and trends</p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Early Loss Detection
              </h3>
              <p className="text-blue-100">Identify water losses quickly with real-time monitoring and trend analysis</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Droplet className="w-5 h-5 mr-2" />
                Resource Optimization
              </h3>
              <p className="text-blue-100">Optimize water distribution and reduce wastage with data-driven insights</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Zone Management
              </h3>
              <p className="text-blue-100">Manage individual zones effectively with detailed performance metrics</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Performance Tracking
              </h3>
              <p className="text-blue-100">Track efficiency improvements over time with historical data analysis</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-3">Data Coverage</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  16 months of historical data (Jan 2024 - Apr 2025)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  6 zones with individual meter tracking
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Real-time loss percentage calculations
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Efficiency metrics and trend analysis
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-3">Visualization Types</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Composed charts for multi-metric analysis
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Radar charts for efficiency comparison
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Area charts for loss volume trends
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                  Circular gauges for efficiency display
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterSystemShowcase;
