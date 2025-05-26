// Enhanced Electricity consumption data with complete dataset
export const RATE_PER_KWH = 0.025 // OMR per kWh

export interface ElectricityMeter {
  id: number
  zone: string
  type: string
  category: string
  facilityType: string
  name: string
  unitNumber: string
  accountNo: string
  consumption: {
    'November-24': number
    'December-24': number
    'January-25': number
    'February-25': number
    'March-25': number
    'April-25': number
  }
  totalConsumption: number
  totalCost: number
  averageMonthly: number
  trend: 'up' | 'down' | 'stable'
  efficiency: 'high' | 'medium' | 'low'
}

// Helper function to calculate totals and analytics
function calculateTotals(consumption: ElectricityMeter['consumption']) {
  const values = Object.values(consumption)
  const total = values.reduce((sum, val) => sum + val, 0)
  const average = total / values.length
  
  // Calculate trend (comparing last 2 months)
  const lastMonth = consumption['April-25']
  const previousMonth = consumption['March-25']
  const trend = lastMonth > previousMonth * 1.1 ? 'up' : 
                lastMonth < previousMonth * 0.9 ? 'down' : 'stable'
  
  // Calculate efficiency based on usage patterns
  const efficiency = average < 500 ? 'high' : average < 2000 ? 'medium' : 'low'
  
  return {
    totalConsumption: total,
    totalCost: total * RATE_PER_KWH,
    averageMonthly: average,
    trend,
    efficiency
  }
}

// Get facility type from name
function getFacilityType(name: string): string {
  if (name.includes('Pumping Station')) return 'Pumping Stations'
  if (name.includes('Lifting Station')) return 'Lifting Stations'
  if (name.includes('Beachwell')) return 'Beach Well'
  if (name.includes('Irrigation Tank')) return 'Irrigation Tanks'
  if (name.includes('Actuator DB')) return 'MC Actuator DB'
  if (name.includes('Street Light FP')) return 'MC Street Light FP'
  if (name.includes('CIF')) return 'CIF'
  if (name.includes('Central Park')) return 'Central Park'
  if (name.includes('Village Square')) return 'Village Square'
  if (name.includes('Bank')) return 'Commercial'
  if (name.includes('D ') || name.includes('D5') || name.includes('D6')) return 'Residential Building'
  if (name.includes('Guard House') || name.includes('Security') || name.includes('ROP')) return 'Security Buildings'
  if (name.includes('FP-') && name.includes('landscape')) return 'Landscape Lighting'
  return 'Other'
}

// Categorize meters with better logic
function getCategory(zone: string, name: string): string {
  if (zone === 'Infrastructure') return 'Infrastructure'
  if (zone === 'Central Park' || name.includes('Central Park')) return 'Common Areas'
  if (zone === 'Ancilary' || zone === 'Ancillary' || name.includes('Guard House') || name.includes('Security') || name.includes('ROP')) return 'Common Areas'
  if (name.includes('Apartment') || name.includes('D ') || name.includes('D5') || name.includes('D6')) return 'Residential'
  if (name.includes('Bank') || name.includes('kitchen')) return 'Commercial'
  if (name.includes('Village Square') || name.includes('landscape')) return 'Common Areas'
  return 'Other'
}

// Complete dataset from user's paste.txt
const rawData: Omit<ElectricityMeter, 'totalConsumption' | 'totalCost' | 'category' | 'facilityType' | 'averageMonthly' | 'trend' | 'efficiency'>[] = [
  // Infrastructure - Pumping Stations
  { id: 1, zone: 'Infrastructure', type: 'MC', name: 'MC Pumping Station 01', unitNumber: 'MC', accountNo: 'R52330', 
    consumption: { 'November-24': 1629, 'December-24': 1640, 'January-25': 1903, 'February-25': 2095, 'March-25': 3032, 'April-25': 3940 }},
  { id: 2, zone: 'Infrastructure', type: 'MC', name: 'MC Pumping Station 03', unitNumber: 'MC', accountNo: 'R52329',
    consumption: { 'November-24': 0, 'December-24': 179, 'January-25': 32.5, 'February-25': 137.2, 'March-25': 130.7, 'April-25': 276.6 }},
  { id: 3, zone: 'Infrastructure', type: 'MC', name: 'MC Pumping Station 04', unitNumber: 'MC', accountNo: 'R52327',
    consumption: { 'November-24': 919, 'December-24': 921, 'January-25': 245.1, 'February-25': 869.5, 'March-25': 646.1, 'April-25': 984.9 }},
  { id: 4, zone: 'Infrastructure', type: 'MC', name: 'MC Pumping Station 05', unitNumber: 'MC', accountNo: 'R52325',
    consumption: { 'November-24': 2599, 'December-24': 1952, 'January-25': 2069, 'February-25': 2521, 'March-25': 2601, 'April-25': 3317 }},
  
  // Infrastructure - Lifting Stations
  { id: 5, zone: 'Infrastructure', type: 'MC', name: 'MC Lifting Station 02', unitNumber: 'MC', accountNo: 'R52328',
    consumption: { 'November-24': 0, 'December-24': 0, 'January-25': 0, 'February-25': 0, 'March-25': 0, 'April-25': 0 }},
  { id: 6, zone: 'Infrastructure', type: 'MC', name: 'MC Lifting Station 03', unitNumber: 'MC', accountNo: 'R52333',
    consumption: { 'November-24': 91, 'December-24': 185, 'January-25': 28, 'February-25': 40, 'March-25': 58, 'April-25': 83 }},
  { id: 7, zone: 'Infrastructure', type: 'MC', name: 'MC Lifting Station 04', unitNumber: 'MC', accountNo: 'R52324',
    consumption: { 'November-24': 686, 'December-24': 631, 'January-25': 701, 'February-25': 638, 'March-25': 572, 'April-25': 750.22 }},
  { id: 8, zone: 'Infrastructure', type: 'MC', name: 'MC Lifting Station 05', unitNumber: 'MC', accountNo: 'R52332',
    consumption: { 'November-24': 2413, 'December-24': 2643, 'January-25': 2873, 'February-25': 3665, 'March-25': 3069, 'April-25': 4201.4 }},
  
  // Infrastructure - Irrigation Tanks
  { id: 9, zone: 'Infrastructure', type: 'MC', name: 'MC Irrigation Tank 01', unitNumber: 'MC', accountNo: 'R52324 (R52326)',
    consumption: { 'November-24': 1432, 'December-24': 1268, 'January-25': 1689, 'February-25': 2214, 'March-25': 1718, 'April-25': 1663 }},
  { id: 10, zone: 'Infrastructure', type: 'MC', name: 'MC Irrigation Tank 02', unitNumber: 'MC', accountNo: 'R52331',
    consumption: { 'November-24': 974, 'December-24': 1026, 'January-25': 983, 'February-25': 1124, 'March-25': 1110, 'April-25': 1830 }},
  { id: 11, zone: 'Infrastructure', type: 'MC', name: 'MC Irrigation Tank 03', unitNumber: 'MC', accountNo: 'R52323',
    consumption: { 'November-24': 269, 'December-24': 417, 'January-25': 840, 'February-25': 1009, 'March-25': 845, 'April-25': 1205 }},
  { id: 12, zone: 'Infrastructure', type: 'MC', name: 'MC Irrigation Tank 04', unitNumber: 'MC', accountNo: 'R53195',
    consumption: { 'November-24': 212, 'December-24': 213, 'January-25': 39.7, 'February-25': 233.2, 'March-25': 234.9, 'April-25': 447.2 }},
  
  // Infrastructure - Actuators
  { id: 13, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 01 (Z8)', unitNumber: 'MC', accountNo: 'R53196',
    consumption: { 'November-24': 34, 'December-24': 29, 'January-25': 7.3, 'February-25': 27.7, 'March-25': 24.4, 'April-25': 27.1 }},
  { id: 14, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 02', unitNumber: 'MC', accountNo: 'R51900',
    consumption: { 'November-24': 232, 'December-24': 161, 'January-25': 33, 'February-25': 134, 'March-25': 138.5, 'April-25': 211 }},
  { id: 15, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 03', unitNumber: 'MC', accountNo: 'R51904',
    consumption: { 'November-24': 220, 'December-24': 199, 'January-25': 55.7, 'February-25': 203.3, 'March-25': 196, 'April-25': 211.6 }},
  { id: 16, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 04', unitNumber: 'MC', accountNo: 'R51901',
    consumption: { 'November-24': 172, 'December-24': 173, 'January-25': 186, 'February-25': 161, 'March-25': 227, 'April-25': 253 }},
  { id: 17, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 05', unitNumber: 'MC', accountNo: 'R51907',
    consumption: { 'November-24': 18, 'December-24': 16, 'January-25': 4.2, 'February-25': 17.8, 'March-25': 14, 'April-25': 17.7 }},
  { id: 18, zone: 'Infrastructure', type: 'MC', name: 'MC Actuator DB 06', unitNumber: 'MC', accountNo: 'R51909',
    consumption: { 'November-24': 49, 'December-24': 44, 'January-25': 47, 'February-25': 45, 'March-25': 38, 'April-25': 46.9 }},
  
  // Infrastructure - Street Lights
  { id: 19, zone: 'Infrastructure', type: 'MC', name: 'MC Street Light FP 01 (Z8)', unitNumber: 'MC', accountNo: 'R53197',
    consumption: { 'November-24': 3593, 'December-24': 3147, 'January-25': 787, 'February-25': 3228, 'March-25': 2663, 'April-25': 3230 }},
  { id: 20, zone: 'Infrastructure', type: 'MC', name: 'MC Street Light FP 02', unitNumber: 'MC', accountNo: 'R51906',
    consumption: { 'November-24': 2361, 'December-24': 2258, 'January-25': 633, 'February-25': 2298, 'March-25': 1812, 'April-25': 2153 }},
  { id: 21, zone: 'Infrastructure', type: 'MC', name: 'MC Street Light FP 03', unitNumber: 'MC', accountNo: 'R51905',
    consumption: { 'November-24': 2060, 'December-24': 1966, 'January-25': 1868, 'February-25': 1974, 'March-25': 1562, 'April-25': 1847 }},
  { id: 22, zone: 'Infrastructure', type: 'MC', name: 'MC Street Light FP 04', unitNumber: 'MC', accountNo: 'R51908',
    consumption: { 'November-24': 2299, 'December-24': 1389, 'January-25': 325, 'February-25': 1406, 'March-25': 1401, 'April-25': 2412.9 }},
  { id: 23, zone: 'Infrastructure', type: 'MC', name: 'MC Street Light FP 05', unitNumber: 'MC', accountNo: 'R51902',
    consumption: { 'November-24': 1477, 'December-24': 1121, 'January-25': 449, 'February-25': 2069.9, 'March-25': 1870.1, 'April-25': 3233 }},
  
  // Infrastructure - Others
  { id: 24, zone: 'Infrastructure', type: 'MC', name: 'MC Beachwell', unitNumber: 'MC', accountNo: 'R51903',
    consumption: { 'November-24': 24383, 'December-24': 37236, 'January-25': 38168, 'February-25': 18422, 'March-25': 40, 'April-25': 27749 }},
  { id: 25, zone: 'Infrastructure', type: 'MC', name: 'MC Helipad', unitNumber: 'MC', accountNo: 'R52334',
    consumption: { 'November-24': 0, 'December-24': 0, 'January-25': 0, 'February-25': 0, 'March-25': 0, 'April-25': 0 }},
  
  // Central Park
  { id: 26, zone: 'Central Park', type: 'MC', name: 'MC Central Park', unitNumber: 'MC', accountNo: 'R54672',
    consumption: { 'November-24': 9604, 'December-24': 19032, 'January-25': 22819, 'February-25': 19974, 'March-25': 14190, 'April-25': 13846 }},
  
  // Ancillary Buildings
  { id: 27, zone: 'Ancilary', type: 'Building', name: 'Guard House', unitNumber: 'MC', accountNo: 'R53651',
    consumption: { 'November-24': 1225, 'December-24': 814, 'January-25': 798, 'February-25': 936, 'March-25': 879, 'April-25': 1467 }},
  { id: 28, zone: 'Ancilary', type: 'Building', name: 'Security Building', unitNumber: 'MC', accountNo: 'R53649',
    consumption: { 'November-24': 5702, 'December-24': 5131, 'January-25': 5559, 'February-25': 5417, 'March-25': 4504, 'April-25': 5978 }},
  { id: 29, zone: 'Ancilary', type: 'Building', name: 'ROP Building', unitNumber: 'MC', accountNo: 'R53648',
    consumption: { 'November-24': 3581, 'December-24': 2352, 'January-25': 2090, 'February-25': 2246, 'March-25': 1939, 'April-25': 3537 }},
  
  // Zone 3 Apartments
  { id: 30, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 44 Apartment', unitNumber: 'D44', accountNo: 'R53705',
    consumption: { 'November-24': 1377, 'December-24': 764, 'January-25': 647, 'February-25': 657, 'March-25': 650, 'April-25': 1306 }},
  { id: 31, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 45 Apartment', unitNumber: 'D45', accountNo: 'R53665',
    consumption: { 'November-24': 1252, 'December-24': 841, 'January-25': 670, 'February-25': 556, 'March-25': 608, 'April-25': 1069 }},
  { id: 32, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 46 Apartment', unitNumber: 'D46', accountNo: 'R53700',
    consumption: { 'November-24': 1577, 'December-24': 890, 'January-25': 724, 'February-25': 690, 'March-25': 752, 'April-25': 1292 }},
  { id: 33, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 47 Apartment', unitNumber: 'D47', accountNo: 'R53690',
    consumption: { 'November-24': 1774, 'December-24': 1055, 'January-25': 887, 'February-25': 738, 'March-25': 792, 'April-25': 1545 }},
  { id: 34, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 48 Apartment', unitNumber: 'D48', accountNo: 'R53666',
    consumption: { 'November-24': 1046, 'December-24': 785, 'January-25': 826, 'February-25': 676, 'March-25': 683, 'April-25': 1092 }},
  { id: 35, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 49 Apartment', unitNumber: 'D49', accountNo: 'R53715',
    consumption: { 'November-24': 1608, 'December-24': 1068, 'January-25': 860, 'February-25': 837, 'March-25': 818, 'April-25': 984 }},
  { id: 36, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 50 Apartment', unitNumber: 'D50', accountNo: 'R53672',
    consumption: { 'November-24': 1102, 'December-24': 789, 'January-25': 765, 'February-25': 785, 'March-25': 707, 'April-25': 1331 }},
  { id: 37, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 51 Apartment', unitNumber: 'D51', accountNo: 'R53657',
    consumption: { 'November-24': 1855, 'December-24': 710, 'January-25': 661, 'February-25': 682, 'March-25': 642, 'April-25': 904 }},
  { id: 38, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 52 Apartment', unitNumber: 'D52', accountNo: 'R53699',
    consumption: { 'November-24': 1986, 'December-24': 1208, 'January-25': 979, 'February-25': 896, 'March-25': 952, 'April-25': 1651 }},
  { id: 39, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D53 Apartment', unitNumber: 'D53', accountNo: 'R54782',
    consumption: { 'November-24': 1764, 'December-24': 968, 'January-25': 693, 'February-25': 732, 'March-25': 760, 'April-25': 1281 }},
  { id: 40, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D54 Apartment', unitNumber: 'D54', accountNo: 'R54793',
    consumption: { 'November-24': 1777, 'December-24': 834, 'January-25': 681, 'February-25': 559, 'March-25': 531, 'April-25': 1042 }},
  { id: 41, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D55 Apartment', unitNumber: 'D55', accountNo: 'R54804',
    consumption: { 'November-24': 1828, 'December-24': 1035, 'January-25': 677, 'February-25': 616, 'March-25': 719, 'April-25': 1417 }},
  { id: 42, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D56 Apartment', unitNumber: 'D56', accountNo: 'R54815',
    consumption: { 'November-24': 1805, 'December-24': 937, 'January-25': 683, 'February-25': 731, 'March-25': 765, 'April-25': 1536 }},
  { id: 43, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D57 Apartment', unitNumber: 'D57', accountNo: 'R54826',
    consumption: { 'November-24': 2262, 'December-24': 1332, 'January-25': 990, 'February-25': 846, 'March-25': 795, 'April-25': 1732 }},
  { id: 44, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D58 Apartment', unitNumber: 'D58', accountNo: 'R54836',
    consumption: { 'November-24': 1534, 'December-24': 778, 'January-25': 593, 'February-25': 535, 'March-25': 594, 'April-25': 1415 }},
  { id: 45, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D59 Apartment', unitNumber: 'D59', accountNo: 'R54847',
    consumption: { 'November-24': 1634, 'December-24': 998, 'January-25': 628, 'February-25': 582, 'March-25': 697, 'April-25': 1138 }},
  { id: 46, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D60 Apartment', unitNumber: 'D60', accountNo: 'R54858',
    consumption: { 'November-24': 1275, 'December-24': 705, 'January-25': 674, 'February-25': 612, 'March-25': 679, 'April-25': 1069 }},
  { id: 47, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D61 Apartment', unitNumber: 'D61', accountNo: 'R54869',
    consumption: { 'November-24': 1734, 'December-24': 977, 'January-25': 767, 'February-25': 800, 'March-25': 719, 'April-25': 1394 }},
  { id: 48, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 62 Apartment', unitNumber: 'D62', accountNo: 'R53717',
    consumption: { 'November-24': 1630, 'December-24': 957, 'January-25': 715, 'February-25': 677, 'March-25': 595, 'April-25': 800 }},
  { id: 49, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 74 Apartment', unitNumber: 'D74', accountNo: 'R53675',
    consumption: { 'November-24': 1303, 'December-24': 766, 'January-25': 639, 'February-25': 566, 'March-25': 463, 'April-25': 1079 }},
  { id: 50, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'D 75 Apartment', unitNumber: 'D75', accountNo: 'R53668',
    consumption: { 'November-24': 1169, 'December-24': 702, 'January-25': 475, 'February-25': 508, 'March-25': 554, 'April-25': 912 }},
  
  // SBJ Common Areas
  { id: 51, zone: '', type: 'SBJ Common Meter', name: 'Village Square', unitNumber: '', accountNo: 'R56628',
    consumption: { 'November-24': 6229, 'December-24': 3695, 'January-25': 3304, 'February-25': 3335, 'March-25': 3383, 'April-25': 4415 }},
  { id: 52, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'FP-17 Zone-3 landscape light', unitNumber: 'FP-17', accountNo: 'R54872',
    consumption: { 'November-24': 0, 'December-24': 0, 'January-25': 0, 'February-25': 0, 'March-25': 0, 'April-25': 0 }},
  { id: 53, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'FP-21 Zone-3 landscape light', unitNumber: 'FP-21', accountNo: 'R54873',
    consumption: { 'November-24': 40, 'December-24': 48, 'January-25': 12.9, 'February-25': 56.6, 'March-25': 46.5, 'April-25': 55 }},
  { id: 54, zone: 'Zone 3', type: 'SBJ Common Meter', name: 'FP-22 Zone-3 landscape light', unitNumber: 'FP-22', accountNo: 'R54874',
    consumption: { 'November-24': 6, 'December-24': 8, 'January-25': 0, 'February-25': 0, 'March-25': 0, 'April-25': 0 }},
  { id: 55, zone: '', type: 'SBJ Common Meter', name: 'Bank Muscat', unitNumber: '', accountNo: '',
    consumption: { 'November-24': 148, 'December-24': 72, 'January-25': 59, 'February-25': 98, 'March-25': 88, 'April-25': 163 }},
  { id: 56, zone: '', type: 'SBJ Common Meter', name: 'CIF Kitchen', unitNumber: '', accountNo: '',
    consumption: { 'November-24': 16742, 'December-24': 15554, 'January-25': 16788, 'February-25': 16154, 'March-25': 14971, 'April-25': 18446 }},
]

// Process and export the complete data
export const electricityData: ElectricityMeter[] = rawData.map(meter => {
  const analytics = calculateTotals(meter.consumption)
  const category = getCategory(meter.zone, meter.name)
  const facilityType = getFacilityType(meter.name)
  
  return {
    ...meter,
    category,
    facilityType,
    ...analytics
  }
})

// Enhanced analytics functions
export const getMonthlyTotals = () => {
  const months = ['November-24', 'December-24', 'January-25', 'February-25', 'March-25', 'April-25'] as const
  return months.map(month => {
    const total = electricityData.reduce((sum, meter) => sum + meter.consumption[month], 0)
    const cost = total * RATE_PER_KWH
    return {
      month,
      total,
      cost,
      formatted: {
        month: new Date(`${month.split('-')[1]}-01-20${month.split('-')[0]}`).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        total: total.toLocaleString(),
        cost: `${cost.toFixed(2)} OMR`
      }
    }
  })
}

export const getCategoryTotals = () => {
  const categories = [...new Set(electricityData.map(m => m.category))]
  return categories.map(category => {
    const meters = electricityData.filter(m => m.category === category)
    const total = meters.reduce((sum, m) => sum + m.totalConsumption, 0)
    const cost = total * RATE_PER_KWH
    const avgEfficiency = meters.reduce((sum, m) => sum + (m.efficiency === 'high' ? 3 : m.efficiency === 'medium' ? 2 : 1), 0) / meters.length
    
    return {
      category,
      total,
      cost,
      count: meters.length,
      efficiency: avgEfficiency > 2.5 ? 'high' : avgEfficiency > 1.5 ? 'medium' : 'low',
      percentage: (total / electricityData.reduce((sum, m) => sum + m.totalConsumption, 0) * 100).toFixed(1)
    }
  }).sort((a, b) => b.total - a.total)
}

export const getFacilityTypeTotals = () => {
  const facilityTypes = [...new Set(electricityData.map(m => m.facilityType))]
  return facilityTypes.map(facilityType => {
    const meters = electricityData.filter(m => m.facilityType === facilityType)
    const total = meters.reduce((sum, m) => sum + m.totalConsumption, 0)
    const cost = total * RATE_PER_KWH
    
    return {
      facilityType,
      total,
      cost,
      count: meters.length,
      averageConsumption: total / meters.length,
      percentage: (total / electricityData.reduce((sum, m) => sum + m.totalConsumption, 0) * 100).toFixed(1)
    }
  }).sort((a, b) => b.total - a.total)
}

// Dashboard statistics
export const getDashboardStats = () => {
  const totalConsumption = electricityData.reduce((sum, m) => sum + m.totalConsumption, 0)
  const totalCost = totalConsumption * RATE_PER_KWH
  const currentMonth = electricityData.reduce((sum, m) => sum + m.consumption['April-25'], 0)
  const previousMonth = electricityData.reduce((sum, m) => sum + m.consumption['March-25'], 0)
  const monthlyGrowth = ((currentMonth - previousMonth) / previousMonth * 100).toFixed(1)
  
  const topConsumers = electricityData
    .sort((a, b) => b.totalConsumption - a.totalConsumption)
    .slice(0, 5)
    .map(m => ({
      name: m.name,
      consumption: m.totalConsumption,
      cost: m.totalCost,
      category: m.category,
      trend: m.trend
    }))

  return {
    totalConsumption,
    totalCost,
    currentMonth,
    monthlyGrowth: parseFloat(monthlyGrowth),
    totalMeters: electricityData.length,
    activeMeters: electricityData.filter(m => m.totalConsumption > 0).length,
    topConsumers,
    categories: getCategoryTotals(),
    facilityTypes: getFacilityTypeTotals(),
    monthlyTotals: getMonthlyTotals()
  }
}
