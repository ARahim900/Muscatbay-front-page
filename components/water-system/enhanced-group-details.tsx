import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, TrendingDown, Droplet, CheckCircle2, 
  Download, Share2, Search
} from 'lucide-react';

// Complete water data from CSV
const completeWaterData = {
  'FM': {
    name: 'Zone FM',
    code: 'FM',
    color: '#3B82F6',
    monthlyData: [
      { month: 'Jan', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
      { month: 'Feb', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
      { month: 'Mar', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
      { month: 'Apr', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
      { month: 'May', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
      { month: 'Jun', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
      { month: 'Jul', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
      { month: 'Aug', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
      { month: 'Sep', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
      { month: 'Oct', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
      { month: 'Nov', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
      { month: 'Dec', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
      { month: 'Feb', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
      { month: 'Mar', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
      { month: 'Apr', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
    ],
    meters: [
      { id: 'WM-FM-01', location: 'Zone FM Entry', currentReading: 45870, previousReading: 42620, consumption: 3250, status: 'Normal', lastInspection: '2025-04-15' },
      { id: 'WM-FM-02', location: 'Villa Cluster A', currentReading: 18450, previousReading: 17730, consumption: 720, status: 'Normal', lastInspection: '2025-04-15' },
      { id: 'WM-FM-03', location: 'Retail Area', currentReading: 12680, previousReading: 12100, consumption: 580, status: 'Normal', lastInspection: '2025-04-14' }
    ]
  },
  '03A': {
    name: 'Zone 03A',
    code: '03A',
    color: '#10B981',
    monthlyData: [
      { month: 'Jan', bulk: 1234, individual: 930, loss: 304, lossPercentage: 24.6 },
      { month: 'Feb', bulk: 1099, individual: 782, loss: 317, lossPercentage: 28.8 },
      { month: 'Mar', bulk: 1297, individual: 793, loss: 504, lossPercentage: 38.9 },
      { month: 'Apr', bulk: 1892, individual: 789, loss: 1103, lossPercentage: 58.3 },
      { month: 'May', bulk: 2254, individual: 879, loss: 1375, lossPercentage: 61.0 },
      { month: 'Jun', bulk: 2227, individual: 786, loss: 1441, lossPercentage: 64.7 },
      { month: 'Jul', bulk: 3313, individual: 766, loss: 2547, lossPercentage: 76.9 },
      { month: 'Aug', bulk: 3172, individual: 846, loss: 2326, lossPercentage: 73.3 },
      { month: 'Sep', bulk: 2698, individual: 775, loss: 1923, lossPercentage: 71.3 },
      { month: 'Oct', bulk: 3715, individual: 1009, loss: 2706, lossPercentage: 72.8 },
      { month: 'Nov', bulk: 3501, individual: 986, loss: 2515, lossPercentage: 71.8 },
      { month: 'Dec', bulk: 3796, individual: 792, loss: 3004, lossPercentage: 79.1 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 4235, individual: 750, loss: 3485, lossPercentage: 82.3 },
      { month: 'Feb', bulk: 4273, individual: 732, loss: 3541, lossPercentage: 82.9 },
      { month: 'Mar', bulk: 3591, individual: 561, loss: 3030, lossPercentage: 84.4 },
      { month: 'Apr', bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 }
    ],
    meters: []
  },
  '03B': {
    name: 'Zone 03B',
    code: '03B',
    color: '#F59E0B',
    monthlyData: [
      { month: 'Jan', bulk: 2653, individual: 997, loss: 1656, lossPercentage: 62.4 },
      { month: 'Feb', bulk: 2169, individual: 821, loss: 1348, lossPercentage: 62.1 },
      { month: 'Mar', bulk: 2315, individual: 873, loss: 1442, lossPercentage: 62.3 },
      { month: 'Apr', bulk: 2381, individual: 945, loss: 1436, lossPercentage: 60.3 },
      { month: 'May', bulk: 2634, individual: 934, loss: 1700, lossPercentage: 64.5 },
      { month: 'Jun', bulk: 2932, individual: 884, loss: 2048, lossPercentage: 69.8 },
      { month: 'Jul', bulk: 3369, individual: 828, loss: 2541, lossPercentage: 75.4 },
      { month: 'Aug', bulk: 3458, individual: 812, loss: 2646, lossPercentage: 76.5 },
      { month: 'Sep', bulk: 3742, individual: 814, loss: 2928, lossPercentage: 78.2 },
      { month: 'Oct', bulk: 2906, individual: 914, loss: 1992, lossPercentage: 68.5 },
      { month: 'Nov', bulk: 2695, individual: 712, loss: 1983, lossPercentage: 73.6 },
      { month: 'Dec', bulk: 3583, individual: 929, loss: 2654, lossPercentage: 74.1 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 3256, individual: 683, loss: 2573, lossPercentage: 79.0 },
      { month: 'Feb', bulk: 2962, individual: 625, loss: 2337, lossPercentage: 78.9 },
      { month: 'Mar', bulk: 3331, individual: 624, loss: 2707, lossPercentage: 81.3 },
      { month: 'Apr', bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 }
    ],
    meters: [
      { accountId: '4300008', customer: 'Habib Ismail Ali Al Suwaid', zone: 'Zone 03B', consumption: 14 },
      { accountId: '4300009', customer: 'Leopold Julian Zentner & Erica Kalobwe', zone: 'Zone 03B', consumption: 48 },
      { accountId: '4300020', customer: 'Wahibah R H Al Mulla', zone: 'Zone 03B', consumption: 3 },
      { accountId: '4300025', customer: 'Britta Stefanie Gerdes & Dr. Barbara Ungeheuer', zone: 'Zone 03B', consumption: 23 },
      { accountId: '4300029', customer: 'Al Fadhal Mohamed Ahmed Al Harthy', zone: 'Zone 03B', consumption: 0 },
      { accountId: '4300042', customer: 'Nasser Abdelsalam Abdelrehiem', zone: 'Zone 03B', consumption: 5 },
      { accountId: '4300054', customer: 'Nekmohamed Manji & Zahara Manji', zone: 'Zone 03B', consumption: 11 },
      { accountId: '4300056', customer: 'Al Sayyid Abdulla Hamad Saif Al Busaidy', zone: 'Zone 03B', consumption: 7 },
      { accountId: '4300057', customer: 'Radhibai Thakurdas Gangwani', zone: 'Zone 03B', consumption: 46 },
      { accountId: '4300060', customer: 'Anwar Salim Ali Al-Mahri', zone: 'Zone 03B', consumption: 42 },
      { accountId: '4300062', customer: 'Vanguard Oil Tools and Services LLC', zone: 'Zone 03B', consumption: 10 }
    ]
  },
  '05': {
    name: 'Zone 05',
    code: '05',
    color: '#8B5CF6',
    monthlyData: [
      { month: 'Jan', bulk: 4286, individual: 2043, loss: 2243, lossPercentage: 52.3 },
      { month: 'Feb', bulk: 3897, individual: 1481, loss: 2416, lossPercentage: 62.0 },
      { month: 'Mar', bulk: 4127, individual: 1054, loss: 3073, lossPercentage: 74.5 },
      { month: 'Apr', bulk: 4911, individual: 1661, loss: 3250, lossPercentage: 66.2 },
      { month: 'May', bulk: 2639, individual: 873, loss: 1766, lossPercentage: 66.9 },
      { month: 'Jun', bulk: 4992, individual: 1180, loss: 3812, lossPercentage: 76.4 },
      { month: 'Jul', bulk: 5305, individual: 1304, loss: 4001, lossPercentage: 75.4 },
      { month: 'Aug', bulk: 4039, individual: 1022, loss: 3017, lossPercentage: 74.7 },
      { month: 'Sep', bulk: 2736, individual: 727, loss: 2009, lossPercentage: 73.4 },
      { month: 'Oct', bulk: 3383, individual: 1079, loss: 2304, lossPercentage: 68.1 },
      { month: 'Nov', bulk: 1438, individual: 967, loss: 471, lossPercentage: 32.8 },
      { month: 'Dec', bulk: 3788, individual: 1098, loss: 2690, lossPercentage: 71.0 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 4267, individual: 1176, loss: 3091, lossPercentage: 72.4 },
      { month: 'Feb', bulk: 4231, individual: 1020, loss: 3211, lossPercentage: 75.9 },
      { month: 'Mar', bulk: 3862, individual: 1079, loss: 2783, lossPercentage: 72.1 },
      { month: 'Apr', bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 }
    ],
    meters: []
  },
  '08': {
    name: 'Zone 08',
    code: '08',
    color: '#EF4444',
    monthlyData: [
      { month: 'Jan', bulk: 2170, individual: 1783, loss: 387, lossPercentage: 17.8 },
      { month: 'Feb', bulk: 1825, individual: 1052, loss: 773, lossPercentage: 42.4 },
      { month: 'Mar', bulk: 2021, individual: 1297, loss: 724, lossPercentage: 35.8 },
      { month: 'Apr', bulk: 2753, individual: 2096, loss: 657, lossPercentage: 23.9 },
      { month: 'May', bulk: 2722, individual: 2091, loss: 631, lossPercentage: 23.2 },
      { month: 'Jun', bulk: 3193, individual: 2447, loss: 746, lossPercentage: 23.4 },
      { month: 'Jul', bulk: 3639, individual: 2178, loss: 1461, lossPercentage: 40.1 },
      { month: 'Aug', bulk: 3957, individual: 2453, loss: 1504, lossPercentage: 38.0 },
      { month: 'Sep', bulk: 3947, individual: 2501, loss: 1446, lossPercentage: 36.6 },
      { month: 'Oct', bulk: 4296, individual: 1669, loss: 2627, lossPercentage: 61.1 },
      { month: 'Nov', bulk: 3569, individual: 1620, loss: 1949, lossPercentage: 54.6 },
      { month: 'Dec', bulk: 3018, individual: 1587, loss: 1431, lossPercentage: 47.4 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 1547, individual: 1088, loss: 459, lossPercentage: 29.7 },
      { month: 'Feb', bulk: 1498, individual: 1198, loss: 300, lossPercentage: 20.0 },
      { month: 'Mar', bulk: 2605, individual: 1917, loss: 688, lossPercentage: 26.4 },
      { month: 'Apr', bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 }
    ],
    meters: []
  },
  'VS': {
    name: 'Village Square',
    code: 'VS',
    color: '#14B8A6',
    monthlyData: [
      { month: 'Jan', bulk: 26, individual: 0, loss: 26, lossPercentage: 100.0 },
      { month: 'Feb', bulk: 19, individual: 1, loss: 18, lossPercentage: 94.7 },
      { month: 'Mar', bulk: 72, individual: 16, loss: 56, lossPercentage: 77.8 },
      { month: 'Apr', bulk: 60, individual: 49, loss: 11, lossPercentage: 18.3 },
      { month: 'May', bulk: 125, individual: 33, loss: 92, lossPercentage: 73.6 },
      { month: 'Jun', bulk: 277, individual: 34, loss: 243, lossPercentage: 87.7 },
      { month: 'Jul', bulk: 143, individual: 32, loss: 111, lossPercentage: 77.6 },
      { month: 'Aug', bulk: 137, individual: 48, loss: 89, lossPercentage: 65.0 },
      { month: 'Sep', bulk: 145, individual: 34, loss: 111, lossPercentage: 76.6 },
      { month: 'Oct', bulk: 63, individual: 51, loss: 12, lossPercentage: 19.0 },
      { month: 'Nov', bulk: 34, individual: 55, loss: -21, lossPercentage: -61.8 },
      { month: 'Dec', bulk: 17, individual: 34, loss: -17, lossPercentage: -100.0 }
    ],
    currentYearData: [
      { month: 'Jan', bulk: 14, individual: 35, loss: -21, lossPercentage: -150.0 },
      { month: 'Feb', bulk: 12, individual: 30, loss: -18, lossPercentage: -150.0 },
      { month: 'Mar', bulk: 21, individual: 33, loss: -12, lossPercentage: -57.1 },
      { month: 'Apr', bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
    ],
    meters: []
  }
};

// Enhanced Group Details Section Component
export const EnhancedGroupDetailsSection = ({ activeMonthFilter = 'Apr-25', activeYearFilter = '2025', activeZoneFilter = 'All Zones' }) => {
  const [selectedZones, setSelectedZones] = useState(['All Zones']);
  const [searchTerm, setSearchTerm] = useState('');

  // Get current month data with proper null checks
  const getCurrentMonthData = () => {
    const monthName = activeMonthFilter ? activeMonthFilter.split('-')[0] : 'Apr';
    
    if (selectedZones.includes('All Zones')) {
      // Aggregate all zones data
      let totalBulk = 0;
      let totalIndividual = 0;
      
      Object.values(completeWaterData).forEach(zone => {
        const currentData = zone.currentYearData.find(d => d.month === monthName);
        if (currentData) {
          totalBulk += currentData.bulk || 0;
          totalIndividual += currentData.individual || 0;
        }
      });
      
      const totalLoss = totalBulk - totalIndividual;
      const lossRate = totalBulk > 0 ? ((totalLoss / totalBulk) * 100).toFixed(1) : '0';
      
      return {
        bulk: totalBulk,
        individual: totalIndividual,
        loss: totalLoss,
        lossRate: lossRate
      };
    } else {
      // Calculate for selected zones
      let totalBulk = 0;
      let totalIndividual = 0;
      
      selectedZones.forEach(zoneCode => {
        const zone = completeWaterData[zoneCode];
        if (zone) {
          const currentData = zone.currentYearData.find(d => d.month === monthName);
          if (currentData) {
            totalBulk += currentData.bulk || 0;
            totalIndividual += currentData.individual || 0;
          }
        }
      });
      
      const totalLoss = totalBulk - totalIndividual;
      const lossRate = totalBulk > 0 ? ((totalLoss / totalBulk) * 100).toFixed(1) : '0';
      
      return {
        bulk: totalBulk,
        individual: totalIndividual,
        loss: totalLoss,
        lossRate: lossRate
      };
    }
  };

  // Get trend data for line chart
  const getTrendData = () => {
    if (selectedZones.includes('All Zones')) {
      // Aggregate all zones
      const monthlyData = [];
      const months = completeWaterData.FM.currentYearData.map(d => d.month);
      
      months.forEach(month => {
        let totalBulk = 0;
        let totalIndividual = 0;
        
        Object.values(completeWaterData).forEach(zone => {
          const monthData = zone.currentYearData.find(d => d.month === month);
          if (monthData) {
            totalBulk += monthData.bulk || 0;
            totalIndividual += monthData.individual || 0;
          }
        });
        
        monthlyData.push({
          month,
          'Bulk Meter': totalBulk,
          'Individual Meters': totalIndividual
        });
      });
      
      return monthlyData;
    } else {
      // Get data for selected zones
      const monthlyData = [];
      const months = completeWaterData.FM.currentYearData.map(d => d.month);
      
      months.forEach(month => {
        let totalBulk = 0;
        let totalIndividual = 0;
        
        selectedZones.forEach(zoneCode => {
          const zone = completeWaterData[zoneCode];
          if (zone) {
            const monthData = zone.currentYearData.find(d => d.month === month);
            if (monthData) {
              totalBulk += monthData.bulk || 0;
              totalIndividual += monthData.individual || 0;
            }
          }
        });
        
        monthlyData.push({
          month,
          'Bulk Meter': totalBulk,
          'Individual Meters': totalIndividual
        });
      });
      
      return monthlyData;
    }
  };

  // Get meters data for selected zones
  const getMetersData = () => {
    const allMeters = [];
    
    if (selectedZones.includes('All Zones')) {
      Object.values(completeWaterData).forEach(zone => {
        if (zone.meters && zone.meters.length > 0) {
          allMeters.push(...zone.meters);
        }
      });
    } else {
      selectedZones.forEach(zoneCode => {
        const zone = completeWaterData[zoneCode];
        if (zone && zone.meters && zone.meters.length > 0) {
          allMeters.push(...zone.meters);
        }
      });
    }
    
    return allMeters;
  };

  // Get customer meters data
  const getCustomerMeters = () => {
    const customers = [];
    
    if (selectedZones.includes('All Zones')) {
      Object.values(completeWaterData).forEach(zone => {
        if (zone.meters && Array.isArray(zone.meters) && zone.meters.length > 0 && zone.meters[0].accountId) {
          customers.push(...zone.meters);
        }
      });
    } else {
      selectedZones.forEach(zoneCode => {
        const zone = completeWaterData[zoneCode];
        if (zone && zone.meters && Array.isArray(zone.meters) && zone.meters.length > 0 && zone.meters[0].accountId) {
          customers.push(...zone.meters);
        }
      });
    }
    
    return customers.filter(customer => 
      customer.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.accountId.includes(searchTerm)
    );
  };

  const handleZoneToggle = (zoneCode) => {
    if (zoneCode === 'All Zones') {
      setSelectedZones(['All Zones']);
    } else {
      let newSelection = [...selectedZones];
      
      // Remove 'All Zones' if it's selected
      newSelection = newSelection.filter(z => z !== 'All Zones');
      
      if (newSelection.includes(zoneCode)) {
        newSelection = newSelection.filter(z => z !== zoneCode);
      } else {
        newSelection.push(zoneCode);
      }
      
      // If no zones selected, default to 'All Zones'
      if (newSelection.length === 0) {
        newSelection = ['All Zones'];
      }
      
      setSelectedZones(newSelection);
    }
  };

  const currentData = getCurrentMonthData();
  const trendData = getTrendData();
  const metersData = getMetersData();
  const customerMeters = getCustomerMeters();

  // Data for pie chart
  const pieData = [
    { name: 'Individual Meters', value: currentData.individual || 0, fill: '#10B981' },
    { name: 'Loss', value: Math.abs(currentData.loss || 0), fill: '#EF4444' }
  ];

  // Calculate change from last month
  const calculateChange = () => {
    const currentMonth = activeMonthFilter ? activeMonthFilter.split('-')[0] : 'Apr';
    const currentIndex = trendData.findIndex(d => d.month === currentMonth);
    if (currentIndex > 0 && trendData[currentIndex - 1]) {
      const current = currentData.bulk || 0;
      const previous = trendData[currentIndex - 1]['Bulk Meter'] || 0;
      if (previous > 0) {
        const change = ((current - previous) / previous * 100).toFixed(1);
        return change;
      }
    }
    return '0.0';
  };

  return (
    <div className="space-y-6">
      {/* Zone Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => handleZoneToggle('All Zones')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedZones.includes('All Zones')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Zones
          </button>
          {Object.entries(completeWaterData).map(([code, zone]) => (
            <button
              key={code}
              onClick={() => handleZoneToggle(code)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedZones.includes(code)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedZones.includes(code) && <CheckCircle2 className="w-4 h-4" />}
              {zone.name}
            </button>
          ))}
          
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Download className="w-5 h-5" />
              <span className="sr-only">Export</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Share2 className="w-5 h-5" />
              <span className="sr-only">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zone Group Analysis Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Zone Group Analysis: {selectedZones.includes('All Zones') ? 'All Zones' : selectedZones.join(', ')}
        </h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Bulk Meter Reading</p>
            <p className="text-3xl font-bold text-gray-800">{(currentData.bulk || 0).toLocaleString()} m³</p>
            <p className="text-sm mt-1 flex items-center">
              {Number(calculateChange()) > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">{calculateChange()}% from last month</span>
                </>
              ) : Number(calculateChange()) < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500">{Math.abs(Number(calculateChange()))}% from last month</span>
                </>
              ) : (
                <span className="text-gray-500">No change from last month</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Individual Meters Total</p>
            <p className="text-3xl font-bold text-gray-800">{(currentData.individual || 0).toLocaleString()} m³</p>
            <p className="text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">4.8% from last month</span>
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Loss Rate</p>
            <p className="text-3xl font-bold text-gray-800">{currentData.lossRate || '0'}%</p>
            <p className="text-sm mt-1 text-gray-500">No change from last month</p>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="Bulk Meter" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 6, fill: '#3B82F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="Individual Meters" 
                stroke="#6B7280" 
                strokeWidth={2}
                dot={{ r: 6, fill: '#6B7280' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Meters Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Individual Meters Performance</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[
                  { name: 'Meter 01', reading: 650, efficiency: 98 },
                  { name: 'Meter 02', reading: 720, efficiency: 97 },
                  { name: 'Meter 03', reading: 580, efficiency: 99 },
                  { name: 'Meter 04', reading: 490, efficiency: 95 },
                  { name: 'Meter 05', reading: 470, efficiency: 96 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[90, 100]} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="reading" fill="#5EEAD4" name="Meter Reading (m³)" />
                <Bar yAxisId="right" dataKey="efficiency" fill="#9CA3AF" name="Efficiency (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${(value || 0).toLocaleString()} m³`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Meter Readings Table */}
      {metersData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Detailed Meter Readings</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meter ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Reading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Reading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumption
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Inspection
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metersData.map((meter, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {meter.id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {meter.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(meter.currentReading || 0).toLocaleString()} m³
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(meter.previousReading || 0).toLocaleString()} m³
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(meter.consumption || 0).toLocaleString()} m³
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {meter.status || 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {meter.lastInspection || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Details Table */}
      {customerMeters.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Customer Details</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumption (Units)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerMeters.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.accountId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.customer || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.zone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                (customer.consumption || 0) > 40 ? 'bg-red-500' :
                                (customer.consumption || 0) > 20 ? 'bg-yellow-500' :
                                (customer.consumption || 0) > 0 ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                              style={{ width: `${Math.min(100, ((customer.consumption || 0) / 50) * 100)}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-12 text-right">
                          {customer.consumption || 0}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedGroupDetailsSection;