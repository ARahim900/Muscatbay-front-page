import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Area, AreaChart
} from 'recharts';
import {
  Filter, Search, TrendingUp, TrendingDown, Droplet,
  AlertCircle, Building, Activity, ChevronDown, ChevronUp
} from 'lucide-react';

// Complete water data from CSV
const completeWaterData = {
  'FM': {
    name: 'Zone 01 (FM)',
    color: '#3B82F6',
    monthlyData: [
      { month: 'Jan-24', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
      { month: 'Feb-24', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
      { month: 'Mar-24', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
      { month: 'Apr-24', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
      { month: 'May-24', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
      { month: 'Jun-24', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
      { month: 'Jul-24', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
      { month: 'Aug-24', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
      { month: 'Sep-24', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
      { month: 'Oct-24', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
      { month: 'Nov-24', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
      { month: 'Dec-24', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 },
      { month: 'Jan-25', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
      { month: 'Feb-25', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
      { month: 'Mar-25', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
      { month: 'Apr-25', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
    ],
    meters: [
      { id: 'Building FM', type: 'MB_Common', value: 40 },
      { id: 'Building Taxi', type: 'Retail', value: 14 },
      { id: 'Building B1', type: 'Retail', value: 253 },
      { id: 'Building B2', type: 'Retail', value: 187 },
      { id: 'Building B3', type: 'Retail', value: 134 },
      { id: 'Building B4', type: 'Retail', value: 148 },
      { id: 'Building B5', type: 'Retail', value: 0 },
      { id: 'Building B6', type: 'Retail', value: 281 },
      { id: 'Building B7', type: 'Retail', value: 201 },
      { id: 'Building B8', type: 'Retail', value: 0 },
      { id: 'Irrigation Tank', type: 'IRR_Services', value: 0 },
      { id: 'Building MEP', type: 'MB_Common', value: 2 },
      { id: 'Building CIF/CB', type: 'Retail', value: 307 },
      { id: 'Building Nursery', type: 'Retail', value: 5 },
      { id: 'Cabinet FM', type: 'MB_Common', value: 58 }
    ]
  },
  '03A': {
    name: 'Zone 03A',
    color: '#10B981',
    monthlyData: [
      { month: 'Jan-24', bulk: 1234, individual: 930, loss: 304, lossPercentage: 24.6 },
      { month: 'Feb-24', bulk: 1099, individual: 782, loss: 317, lossPercentage: 28.8 },
      { month: 'Mar-24', bulk: 1297, individual: 793, loss: 504, lossPercentage: 38.9 },
      { month: 'Apr-24', bulk: 1892, individual: 789, loss: 1103, lossPercentage: 58.3 },
      { month: 'May-24', bulk: 2254, individual: 879, loss: 1375, lossPercentage: 61.0 },
      { month: 'Jun-24', bulk: 2227, individual: 786, loss: 1441, lossPercentage: 64.7 },
      { month: 'Jul-24', bulk: 3313, individual: 766, loss: 2547, lossPercentage: 76.9 },
      { month: 'Aug-24', bulk: 3172, individual: 846, loss: 2326, lossPercentage: 73.3 },
      { month: 'Sep-24', bulk: 2698, individual: 775, loss: 1923, lossPercentage: 71.3 },
      { month: 'Oct-24', bulk: 3715, individual: 1009, loss: 2706, lossPercentage: 72.8 },
      { month: 'Nov-24', bulk: 3501, individual: 986, loss: 2515, lossPercentage: 71.8 },
      { month: 'Dec-24', bulk: 3796, individual: 792, loss: 3004, lossPercentage: 79.1 },
      { month: 'Jan-25', bulk: 4235, individual: 750, loss: 3485, lossPercentage: 82.3 },
      { month: 'Feb-25', bulk: 4273, individual: 732, loss: 3541, lossPercentage: 82.9 },
      { month: 'Mar-25', bulk: 3591, individual: 561, loss: 3030, lossPercentage: 84.4 },
      { month: 'Apr-25', bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 }
    ],
    meters: []
  },
  '03B': {
    name: 'Zone 03B',
    color: '#F59E0B',
    monthlyData: [
      { month: 'Jan-24', bulk: 2653, individual: 997, loss: 1656, lossPercentage: 62.4 },
      { month: 'Feb-24', bulk: 2169, individual: 821, loss: 1348, lossPercentage: 62.1 },
      { month: 'Mar-24', bulk: 2315, individual: 873, loss: 1442, lossPercentage: 62.3 },
      { month: 'Apr-24', bulk: 2381, individual: 945, loss: 1436, lossPercentage: 60.3 },
      { month: 'May-24', bulk: 2634, individual: 934, loss: 1700, lossPercentage: 64.5 },
      { month: 'Jun-24', bulk: 2932, individual: 884, loss: 2048, lossPercentage: 69.8 },
      { month: 'Jul-24', bulk: 3369, individual: 828, loss: 2541, lossPercentage: 75.4 },
      { month: 'Aug-24', bulk: 3458, individual: 812, loss: 2646, lossPercentage: 76.5 },
      { month: 'Sep-24', bulk: 3742, individual: 814, loss: 2928, lossPercentage: 78.2 },
      { month: 'Oct-24', bulk: 2906, individual: 914, loss: 1992, lossPercentage: 68.5 },
      { month: 'Nov-24', bulk: 2695, individual: 712, loss: 1983, lossPercentage: 73.6 },
      { month: 'Dec-24', bulk: 3583, individual: 929, loss: 2654, lossPercentage: 74.1 },
      { month: 'Jan-25', bulk: 3256, individual: 683, loss: 2573, lossPercentage: 79.0 },
      { month: 'Feb-25', bulk: 2962, individual: 625, loss: 2337, lossPercentage: 78.9 },
      { month: 'Mar-25', bulk: 3331, individual: 624, loss: 2707, lossPercentage: 81.3 },
      { month: 'Apr-25', bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 }
    ],
    meters: []
  },
  '05': {
    name: 'Zone 05',
    color: '#8B5CF6',
    monthlyData: [
      { month: 'Jan-24', bulk: 4286, individual: 2043, loss: 2243, lossPercentage: 52.3 },
      { month: 'Feb-24', bulk: 3897, individual: 1481, loss: 2416, lossPercentage: 62.0 },
      { month: 'Mar-24', bulk: 4127, individual: 1054, loss: 3073, lossPercentage: 74.5 },
      { month: 'Apr-24', bulk: 4911, individual: 1661, loss: 3250, lossPercentage: 66.2 },
      { month: 'May-24', bulk: 2639, individual: 873, loss: 1766, lossPercentage: 66.9 },
      { month: 'Jun-24', bulk: 4992, individual: 1180, loss: 3812, lossPercentage: 76.4 },
      { month: 'Jul-24', bulk: 5305, individual: 1304, loss: 4001, lossPercentage: 75.4 },
      { month: 'Aug-24', bulk: 4039, individual: 1022, loss: 3017, lossPercentage: 74.7 },
      { month: 'Sep-24', bulk: 2736, individual: 727, loss: 2009, lossPercentage: 73.4 },
      { month: 'Oct-24', bulk: 3383, individual: 1079, loss: 2304, lossPercentage: 68.1 },
      { month: 'Nov-24', bulk: 1438, individual: 967, loss: 471, lossPercentage: 32.8 },
      { month: 'Dec-24', bulk: 3788, individual: 1098, loss: 2690, lossPercentage: 71.0 },
      { month: 'Jan-25', bulk: 4267, individual: 1176, loss: 3091, lossPercentage: 72.4 },
      { month: 'Feb-25', bulk: 4231, individual: 1020, loss: 3211, lossPercentage: 75.9 },
      { month: 'Mar-25', bulk: 3862, individual: 1079, loss: 2783, lossPercentage: 72.1 },
      { month: 'Apr-25', bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 }
    ],
    meters: []
  },
  '08': {
    name: 'Zone 08',
    color: '#EF4444',
    monthlyData: [
      { month: 'Jan-24', bulk: 2170, individual: 1783, loss: 387, lossPercentage: 17.8 },
      { month: 'Feb-24', bulk: 1825, individual: 1052, loss: 773, lossPercentage: 42.4 },
      { month: 'Mar-24', bulk: 2021, individual: 1297, loss: 724, lossPercentage: 35.8 },
      { month: 'Apr-24', bulk: 2753, individual: 2096, loss: 657, lossPercentage: 23.9 },
      { month: 'May-24', bulk: 2722, individual: 2091, loss: 631, lossPercentage: 23.2 },
      { month: 'Jun-24', bulk: 3193, individual: 2447, loss: 746, lossPercentage: 23.4 },
      { month: 'Jul-24', bulk: 3639, individual: 2178, loss: 1461, lossPercentage: 40.1 },
      { month: 'Aug-24', bulk: 3957, individual: 2453, loss: 1504, lossPercentage: 38.0 },
      { month: 'Sep-24', bulk: 3947, individual: 2501, loss: 1446, lossPercentage: 36.6 },
      { month: 'Oct-24', bulk: 4296, individual: 1669, loss: 2627, lossPercentage: 61.1 },
      { month: 'Nov-24', bulk: 3569, individual: 1620, loss: 1949, lossPercentage: 54.6 },
      { month: 'Dec-24', bulk: 3018, individual: 1587, loss: 1431, lossPercentage: 47.4 },
      { month: 'Jan-25', bulk: 1547, individual: 1088, loss: 459, lossPercentage: 29.7 },
      { month: 'Feb-25', bulk: 1498, individual: 1198, loss: 300, lossPercentage: 20.0 },
      { month: 'Mar-25', bulk: 2605, individual: 1917, loss: 688, lossPercentage: 26.4 },
      { month: 'Apr-25', bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 }
    ],
    meters: []
  },
  'VS': {
    name: 'Village Square',
    color: '#14B8A6',
    monthlyData: [
      { month: 'Jan-24', bulk: 26, individual: 0, loss: 26, lossPercentage: 100.0 },
      { month: 'Feb-24', bulk: 19, individual: 1, loss: 18, lossPercentage: 94.7 },
      { month: 'Mar-24', bulk: 72, individual: 16, loss: 56, lossPercentage: 77.8 },
      { month: 'Apr-24', bulk: 60, individual: 49, loss: 11, lossPercentage: 18.3 },
      { month: 'May-24', bulk: 125, individual: 33, loss: 92, lossPercentage: 73.6 },
      { month: 'Jun-24', bulk: 277, individual: 34, loss: 243, lossPercentage: 87.7 },
      { month: 'Jul-24', bulk: 143, individual: 32, loss: 111, lossPercentage: 77.6 },
      { month: 'Aug-24', bulk: 137, individual: 48, loss: 89, lossPercentage: 65.0 },
      { month: 'Sep-24', bulk: 145, individual: 34, loss: 111, lossPercentage: 76.6 },
      { month: 'Oct-24', bulk: 63, individual: 51, loss: 12, lossPercentage: 19.0 },
      { month: 'Nov-24', bulk: 34, individual: 55, loss: -21, lossPercentage: -61.8 },
      { month: 'Dec-24', bulk: 17, individual: 34, loss: -17, lossPercentage: -100.0 },
      { month: 'Jan-25', bulk: 14, individual: 35, loss: -21, lossPercentage: -150.0 },
      { month: 'Feb-25', bulk: 12, individual: 30, loss: -18, lossPercentage: -150.0 },
      { month: 'Mar-25', bulk: 21, individual: 33, loss: -12, lossPercentage: -57.1 },
      { month: 'Apr-25', bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
    ],
    meters: []
  }
};

// Enhanced Group Details Section Component
export const EnhancedGroupDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter }) => {
  const [expandedZone, setExpandedZone] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedZones, setSelectedZones] = useState(['FM', '03A']);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, comparison

  // Get zone code from filter
  const getZoneCode = (filter) => {
    switch(filter) {
      case 'Zone FM': return 'FM';
      case 'Zone 03A': return '03A';
      case 'Zone 03B': return '03B';
      case 'Zone 05': return '05';
      case 'Zone 08': return '08';
      case 'Village Square': return 'VS';
      case 'All Zones': return null;
      default: return null;
    }
  };

  const activeZoneCode = getZoneCode(activeZoneFilter);

  // Calculate summary statistics
  const calculateZoneSummary = (zoneCode, month) => {
    const zoneData = completeWaterData[zoneCode];
    if (!zoneData) return null;

    const monthData = zoneData.monthlyData.find(d => d.month === month);
    if (!monthData) return null;

    return {
      bulk: monthData.bulk,
      individual: monthData.individual,
      loss: monthData.loss,
      lossPercentage: monthData.lossPercentage,
      efficiency: 100 - Math.abs(monthData.lossPercentage),
      trend: calculateTrend(zoneData.monthlyData, month)
    };
  };

  // Calculate trend
  const calculateTrend = (data, currentMonth) => {
    const currentIndex = data.findIndex(d => d.month === currentMonth);
    if (currentIndex <= 0) return { value: 0, direction: 'stable' };

    const current = data[currentIndex].lossPercentage;
    const previous = data[currentIndex - 1].lossPercentage;
    const change = current - previous;

    return {
      value: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  };

  // Get data for current selection
  const getCurrentData = useMemo(() => {
    if (activeZoneCode) {
      return completeWaterData[activeZoneCode];
    }
    return null;
  }, [activeZoneCode]);

  // Get all zones summary for the selected month
  const getAllZonesSummary = useMemo(() => {
    return Object.keys(completeWaterData).map(zoneCode => {
      const summary = calculateZoneSummary(zoneCode, activeMonthFilter);
      return {
        zoneCode,
        name: completeWaterData[zoneCode].name,
        color: completeWaterData[zoneCode].color,
        ...summary
      };
    }).filter(z => z.bulk !== undefined);
  }, [activeMonthFilter]);

  // Prepare comparison data
  const getComparisonData = () => {
    return selectedZones.map(zoneCode => {
      const zoneData = completeWaterData[zoneCode];
      return {
        zone: zoneData.name,
        data: zoneData.monthlyData.filter(d => d.month.includes(activeYearFilter.slice(2)))
      };
    });
  };

  // Zone Card Component
  const ZoneCard = ({ zone, isExpanded, onToggle }) => {
    const trend = zone.trend;
    
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div 
          className="p-6 cursor-pointer"
          onClick={onToggle}
          style={{ borderTop: `4px solid ${zone.color}` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{zone.name}</h3>
              <p className="text-sm text-gray-500">Performance Overview</p>
            </div>
            <div className="flex items-center space-x-2">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : trend.direction === 'down' ? (
                <TrendingDown className="w-5 h-5 text-green-500" />
              ) : (
                <Activity className="w-5 h-5 text-gray-500" />
              )}
              <span className={`text-sm font-medium ${
                trend.direction === 'up' ? 'text-red-500' : 
                trend.direction === 'down' ? 'text-green-500' : 
                'text-gray-500'
              }`}>
                {trend.value}%
              </span>
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Bulk Meter</p>
              <p className="text-2xl font-bold" style={{ color: zone.color }}>{zone.bulk}</p>
              <p className="text-xs text-gray-400">m³</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Individual Sum</p>
              <p className="text-2xl font-bold text-green-600">{zone.individual}</p>
              <p className="text-xs text-gray-400">m³</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Loss</p>
              <p className="text-2xl font-bold text-red-600">{Math.abs(zone.loss)}</p>
              <p className="text-xs text-gray-400">m³</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Efficiency</p>
              <p className="text-2xl font-bold text-purple-600">{zone.efficiency.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">rate</p>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 pb-6 border-t border-gray-200 mt-4">
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Monthly Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart 
                    data={completeWaterData[zone.zoneCode].monthlyData.filter(d => 
                      d.month.includes(activeYearFilter.slice(2))
                    )}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bulk" fill={zone.color} name="Bulk Meter" opacity={0.8} />
                    <Bar yAxisId="left" dataKey="individual" fill="#10B981" name="Individual Sum" opacity={0.8} />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="lossPercentage" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="Loss %" 
                      dot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Comparison Chart Component
  const ComparisonChart = () => {
    const comparisonData = getComparisonData();
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Zone Comparison Analysis</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Select zones to compare:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(completeWaterData).map(zoneCode => (
              <button
                key={zoneCode}
                onClick={() => {
                  if (selectedZones.includes(zoneCode)) {
                    setSelectedZones(selectedZones.filter(z => z !== zoneCode));
                  } else {
                    setSelectedZones([...selectedZones, zoneCode]);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedZones.includes(zoneCode)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {completeWaterData[zoneCode].name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Loss Percentage Trend</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                {comparisonData.map((zone, index) => (
                  <Line
                    key={zone.zone}
                    data={zone.data}
                    type="monotone"
                    dataKey="lossPercentage"
                    stroke={completeWaterData[selectedZones[index]].color}
                    strokeWidth={2}
                    name={zone.zone}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-80">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Efficiency Comparison</h4>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis 
                  dataKey="zone"
                  tick={{ fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Efficiency %"
                  data={selectedZones.map(zoneCode => ({
                    zone: completeWaterData[zoneCode].name.split(' ')[1],
                    value: calculateZoneSummary(zoneCode, activeMonthFilter)?.efficiency || 0
                  }))}
                  dataKey="value"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 h-80">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Volume Comparison</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend />
              {comparisonData.map((zone, index) => (
                <Area
                  key={zone.zone}
                  data={zone.data}
                  type="monotone"
                  dataKey="loss"
                  stroke={completeWaterData[selectedZones[index]].color}
                  fill={completeWaterData[selectedZones[index]].color}
                  fillOpacity={0.3}
                  name={`${zone.zone} Loss`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Detailed Zone Analysis Component
  const DetailedZoneAnalysis = ({ zoneData }) => {
    const monthData = zoneData.monthlyData.find(d => d.month === activeMonthFilter);
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{zoneData.name} - Detailed Analysis</h3>
          <div className="flex items-center space-x-2">
            <Droplet className="w-6 h-6" style={{ color: zoneData.color }} />
            <span className="text-lg font-medium text-gray-600">{activeMonthFilter}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consumption Breakdown */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Consumption Flow Analysis</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Bulk Meter', value: monthData?.bulk || 0, fill: zoneData.color },
                  { name: 'Individual Sum', value: monthData?.individual || 0, fill: '#10B981' },
                  { name: 'Loss', value: Math.abs(monthData?.loss || 0), fill: '#EF4444' }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {[zoneData.color, '#10B981', '#EF4444'].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Efficiency Gauge */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Zone Efficiency</h4>
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={monthData?.efficiency > 70 ? '#10B981' : monthData?.efficiency > 50 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88 * (monthData?.efficiency || 0) / 100} ${2 * Math.PI * 88}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">
                  {monthData?.efficiency?.toFixed(1) || 0}%
                </span>
                <span className="text-sm text-gray-500">Efficiency</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Loss Rate: <span className="font-bold text-red-600">{monthData?.lossPercentage || 0}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Historical Performance */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Historical Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={zoneData.monthlyData.filter(d => d.month.includes(activeYearFilter.slice(2)))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="bulk" stroke={zoneData.color} strokeWidth={2} name="Bulk Meter" />
                <Line type="monotone" dataKey="individual" stroke="#10B981" strokeWidth={2} name="Individual Sum" />
                <Line type="monotone" dataKey="loss" stroke="#EF4444" strokeWidth={2} name="Loss" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Individual Meters (if available) */}
        {zoneData.meters && zoneData.meters.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Individual Meters Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zoneData.meters.map((meter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{meter.id}</p>
                      <p className="text-xs text-gray-500">{meter.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{meter.value}</p>
                    <p className="text-xs text-gray-500">m³</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">View Mode:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'overview'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'detailed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Detailed
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'comparison'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Comparison
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-gray-600">
              Data for <span className="font-semibold">{activeMonthFilter}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <>
          {/* Zone Performance Overview */}
          {activeZoneFilter === 'All Zones' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getAllZonesSummary.map(zone => (
                <ZoneCard
                  key={zone.zoneCode}
                  zone={zone}
                  isExpanded={expandedZone === zone.zoneCode}
                  onToggle={() => setExpandedZone(
                    expandedZone === zone.zoneCode ? null : zone.zoneCode
                  )}
                />
              ))}
            </div>
          ) : (
            getCurrentData && (
              <ZoneCard
                zone={{
                  ...calculateZoneSummary(activeZoneCode, activeMonthFilter),
                  zoneCode: activeZoneCode,
                  name: getCurrentData.name,
                  color: getCurrentData.color
                }}
                isExpanded={true}
                onToggle={() => {}}
              />
            )
          )}

          {/* Summary Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">System Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total Bulk Consumption</p>
                <p className="text-3xl font-bold text-blue-600">
                  {getAllZonesSummary.reduce((sum, zone) => sum + zone.bulk, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">m³</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total Individual Consumption</p>
                <p className="text-3xl font-bold text-green-600">
                  {getAllZonesSummary.reduce((sum, zone) => sum + zone.individual, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">m³</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total System Loss</p>
                <p className="text-3xl font-bold text-red-600">
                  {Math.abs(getAllZonesSummary.reduce((sum, zone) => sum + zone.loss, 0)).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">m³</p>
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'detailed' && activeZoneCode && getCurrentData && (
        <DetailedZoneAnalysis zoneData={getCurrentData} />
      )}

      {viewMode === 'comparison' && (
        <ComparisonChart />
      )}
    </div>
  );
};

export default EnhancedGroupDetailsSection;