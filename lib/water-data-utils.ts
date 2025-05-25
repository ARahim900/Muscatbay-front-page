// Water System Data Processing Utilities

export interface WaterMeterData {
  'Meter Label': string;
  'Acct #': string | number;
  Zone: string;
  Type: string;
  'Parent Meter': string;
  Label: 'L1' | 'L2' | 'L3' | 'DC' | string;
  [key: string]: string | number; // For monthly data columns
}

export interface MonthlyData {
  month: string;
  l1: number;
  l2: number;
  l3: number;
  dc: number;
  a1: number; // L1
  a2: number; // L2 + DC
  a3: number; // L3 + DC
  stage1Loss: number; // L1 - L2
  stage2Loss: number; // L2 - L3
  totalLoss: number; // L1 - L3
}

export interface ZoneData {
  zone: string;
  displayName: string;
  bulkMeter: number;
  individualMeters: number;
  loss: number;
  lossPercentage: number;
  meters: WaterMeterData[];
}

export const MONTHS = [
  'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24',
  'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
  'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25'
];

export const ZONE_MAPPING: Record<string, string> = {
  'Zone_01_(FM)': 'Zone 01 (FM)',
  'Zone_03_(A)': 'Zone 03(A)',
  'Zone_03_(B)': 'Zone 03(B)',
  'Zone_05': 'Zone 05',
  'Zone_08': 'Zone 08',
  'Main Bulk': 'Main BULK',
  'Direct Connection ': 'Direct Connection',
  'Zone_VS': 'Zone VS',
  'Zone_SC': 'Zone SC'
};

export function processWaterData(data: WaterMeterData[]): {
  monthlyData: MonthlyData[];
  zoneData: Record<string, ZoneData>;
  allMeters: WaterMeterData[];
} {
  // Calculate monthly totals
  const monthlyData: MonthlyData[] = MONTHS.map(month => {
    const l1Total = data
      .filter(meter => meter.Label === 'L1')
      .reduce((sum, meter) => sum + (Number(meter[month]) || 0), 0);
    
    const l2Total = data
      .filter(meter => meter.Label === 'L2')
      .reduce((sum, meter) => sum + (Number(meter[month]) || 0), 0);
    
    const l3Total = data
      .filter(meter => meter.Label === 'L3')
      .reduce((sum, meter) => sum + (Number(meter[month]) || 0), 0);
    
    const dcTotal = data
      .filter(meter => meter.Label === 'DC')
      .reduce((sum, meter) => sum + (Number(meter[month]) || 0), 0);

    return {
      month,
      l1: l1Total,
      l2: l2Total,
      l3: l3Total,
      dc: dcTotal,
      a1: l1Total,
      a2: l2Total + dcTotal,
      a3: l3Total + dcTotal,
      stage1Loss: l1Total - l2Total,
      stage2Loss: l2Total - l3Total,
      totalLoss: l1Total - l3Total
    };
  });

  // Process zone data
  const zoneData: Record<string, ZoneData> = {};

  // For Main BULK zone
  const mainBulkZones = ['Main Bulk', 'Zone Bulk'];
  const mainBulkMeters = data.filter(meter => 
    mainBulkZones.includes(meter.Zone) || meter.Label === 'DC'
  );
  
  if (mainBulkMeters.length > 0) {
    const latestMonth = MONTHS[MONTHS.length - 1];
    const bulkTotal = mainBulkMeters
      .filter(meter => meter.Type === 'Main BULK' || meter.Type === 'Zone Bulk')
      .reduce((sum, meter) => sum + (Number(meter[latestMonth]) || 0), 0);
    
    const dcTotal = mainBulkMeters
      .filter(meter => meter.Label === 'DC')
      .reduce((sum, meter) => sum + (Number(meter[latestMonth]) || 0), 0);

    zoneData['Main BULK'] = {
      zone: 'Main BULK',
      displayName: 'Main BULK',
      bulkMeter: bulkTotal,
      individualMeters: dcTotal,
      loss: bulkTotal - dcTotal,
      lossPercentage: bulkTotal > 0 ? ((bulkTotal - dcTotal) / bulkTotal) * 100 : 0,
      meters: mainBulkMeters
    };
  }

  // Process other zones
  Object.entries(ZONE_MAPPING).forEach(([zoneKey, displayName]) => {
    if (zoneKey === 'Main Bulk' || zoneKey === 'Direct Connection ') return;

    const zoneMeters = data.filter(meter => meter.Zone === zoneKey);
    if (zoneMeters.length === 0) return;

    const latestMonth = MONTHS[MONTHS.length - 1];
    
    // Find bulk meter for this zone
    const bulkMeter = zoneMeters.find(meter => 
      meter.Type === 'Zone Bulk' || meter['Meter Label'].includes('Bulk')
    );
    const bulkTotal = bulkMeter ? Number(bulkMeter[latestMonth]) || 0 : 0;

    // Calculate individual meters total (excluding bulk)
    const individualTotal = zoneMeters
      .filter(meter => meter !== bulkMeter)
      .reduce((sum, meter) => sum + (Number(meter[latestMonth]) || 0), 0);

    zoneData[displayName] = {
      zone: zoneKey,
      displayName,
      bulkMeter: bulkTotal,
      individualMeters: individualTotal,
      loss: bulkTotal - individualTotal,
      lossPercentage: bulkTotal > 0 ? ((bulkTotal - individualTotal) / bulkTotal) * 100 : 0,
      meters: zoneMeters
    };
  });

  return {
    monthlyData,
    zoneData,
    allMeters: data
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}