// Electricity consumption data
export const RATE_PER_KWH = 0.0250 // OMR per kWh

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
}

// Helper function to calculate totals
function calculateTotals(consumption: ElectricityMeter['consumption']) {
  const total = Object.values(consumption).reduce((sum, val) => sum + val, 0)
  return {
    totalConsumption: total,
    totalCost: total * RATE_PER_KWH
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
  if (name.includes('Common Meter D') || name.includes('Common D')) return 'Common D Building'
  return 'Other'
}

// Categorize meters
function getCategory(zone: string, name: string): string {
  if (zone === 'Infrastructure') return 'Infrastructure'
  if (zone === 'Central Park' || name.includes('Central Park')) return 'Common Areas'
  if (zone === 'Ancilary Building' || name.includes('Guard House') || name.includes('Security') || name.includes('ROP')) return 'Common Areas'
  if (name.includes('Apartment')) return 'Residential'
  if (name.includes('Bank') || name.includes('kitchen')) return 'Commercial'
  if (name.includes('Village Square') || name.includes('landscape')) return 'Common Areas'
  return 'Other'
}

const rawData: Omit<ElectricityMeter, 'totalConsumption' | 'totalCost' | 'category' | 'facilityType'>[] = [
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
  { id: 9, zone: 'Infrastructure', type: 'MC', name: 'MC Irrigation Tank 01', unitNumber: 'MC', accountNo: 'R52324',
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
  { id: 27, zone: 'Ancilary Building', type: 'MC', name: 'Guard House', unitNumber: 'MC', accountNo: 'R53651',
    consumption: { 'November-24': 1225, 'December-24': 814, 'January-25': 798, 'February-25': 936, 'March-25': 879, 'April-25': 1467 }},
  { id: 28, zone: 'Ancilary Building', type: 'MC', name: 'Security Building', unitNumber: 'MC', accountNo: 'R53649',
    consumption: { 'November-24': 5702, 'December-24': 5131, 'January-25': 5559, 'February-25': 5417, 'March-25': 4504, 'April-25': 5978 }},
  { id: 29, zone: 'Ancilary Building', type: 'MC', name: 'ROP Building', unitNumber: 'MC', accountNo: 'R53648',
    consumption: { 'November-24': 3581, 'December-24': 2352, 'January-25': 2090, 'February-25': 2246, 'March-25': 1939, 'April-25': 3537 }},
  
  // Zone 3 Apartments (Sample - first 10)
  { id: 30, zone: 'Zone 3', type: 'SBJ', name: 'Common Meter D 44 Apartment', unitNumber: 'D44', accountNo: 'R53705',
    consumption: { 'November-24': 1377, 'December-24': 764, 'January-25': 647, 'February-25': 657, 'March-25': 650, 'April-25': 1306 }},
  { id: 31, zone: 'Zone 3', type: 'SBJ', name: 'Common Meter D 45 Apartment', unitNumber: 'D45', accountNo: 'R53665',
    consumption: { 'November-24': 1252, 'December-24': 841, 'January-25': 670, 'February-25': 556, 'March-25': 608, 'April-25': 1069 }},
  { id: 32, zone: 'Zone 3', type: 'SBJ', name: 'Common Meter D 46 Apartment', unitNumber: 'D46', accountNo: 'R53700',
    consumption: { 'November-24': 1577, 'December-24': 890, 'January-25': 724, 'February-25': 690, 'March-25': 752, 'April-25': 1292 }},
  { id: 33, zone: 'Zone 3', type: 'SBJ', name: 'Common Meter D 47 Apartment', unitNumber: 'D47', accountNo: 'R53690',
    consumption: { 'November-24': 1774, 'December-24': 1055, 'January-25': 887, 'February-25': 738, 'March-25': 792, 'April-25': 1545 }},
  { id: 34, zone: 'Zone 3', type: 'SBJ', name: 'Common Meter D 48 Apartment', unitNumber: 'D48', accountNo: 'R53666',
    consumption: { 'November-24': 1046, 'December-24': 785, 'January-25': 826, 'February-25': 676, 'March-25': 683, 'April-25': 1092 }},
  
  // SBJ Common Areas
  { id: 51, zone: 'SBJ', type: 'Common Meter', name: 'Village Square', unitNumber: 'VS', accountNo: 'R56628',
    consumption: { 'November-24': 6229, 'December-24': 3695, 'January-25': 3304, 'February-25': 3335, 'March-25': 3383, 'April-25': 4415 }},
  { id: 55, zone: 'SBJ', type: 'Common Meter', name: 'Bank Muscat', unitNumber: 'BM', accountNo: '',
    consumption: { 'November-24': 148, 'December-24': 72, 'January-25': 59, 'February-25': 98, 'March-25': 88, 'April-25': 163 }},
  { id: 56, zone: 'SBJ', type: 'Common Meter', name: 'CIF Kitchen', unitNumber: 'CIF', accountNo: '',
    consumption: { 'November-24': 16742, 'December-24': 15554, 'January-25': 16788, 'February-25': 16154, 'March-25': 14971, 'April-25': 18446 }}
]

// Process and export the complete data
export const electricityData: ElectricityMeter[] = rawData.map(meter => {
  const { totalConsumption, totalCost } = calculateTotals(meter.consumption)
  const category = getCategory(meter.zone, meter.name)
  const facilityType = getFacilityType(meter.name)
  
  return {
    ...meter,
    category,
    facilityType,
    totalConsumption,
    totalCost
  }
})

// Summary statistics
export const getMonthlyTotals = () => {
  const months = ['November-24', 'December-24', 'January-25', 'February-25', 'March-25', 'April-25'] as const
  return months.map(month => ({
    month,
    total: electricityData.reduce((sum, meter) => sum + meter.consumption[month], 0),
    cost: electricityData.reduce((sum, meter) => sum + meter.consumption[month], 0) * RATE_PER_KWH
  }))
}

export const getCategoryTotals = () => {
  const categories = [...new Set(electricityData.map(m => m.category))]
  return categories.map(category => ({
    category,
    total: electricityData.filter(m => m.category === category).reduce((sum, m) => sum + m.totalConsumption, 0),
    cost: electricityData.filter(m => m.category === category).reduce((sum, m) => sum + m.totalCost, 0)
  }))
}

// Get facility type totals
export const getFacilityTypeTotals = () => {
  const facilityTypes = [...new Set(electricityData.map(m => m.facilityType))]
  return facilityTypes.map(facilityType => ({
    facilityType,
    total: electricityData.filter(m => m.facilityType === facilityType).reduce((sum, m) => sum + m.totalConsumption, 0),
    cost: electricityData.filter(m => m.facilityType === facilityType).reduce((sum, m) => sum + m.totalCost, 0),
    count: electricityData.filter(m => m.facilityType === facilityType).length
  }))
}
