// Water System Data Loader
import { WaterMeterData } from '@/lib/water-data-utils';

// CSV file paths - in production, these would be served from your public directory
const CSV_FILES = {
  master: '/data/water/Master WA DB TableMaster WA 24  25 Apr.csv',
  a2: '/data/water/Master WA DB TableA2.csv',
  a3: '/data/water/Master WA DB TableA3.csv',
  zones: {
    'Zone_01_(FM)': '/data/water/Master WA DB TableZone FM  2.csv',
    'Zone_03_(A)': '/data/water/Master WA DB TableZone 03A 2.csv',
    'Zone_03_(B)': '/data/water/Master WA DB TableZone 03B 2.csv',
    'Zone_05': '/data/water/Master WA DB TableZone 05 2.csv',
    'Zone_08': '/data/water/Master WA DB TableZone 08 2.csv',
    'Zone_VS': '/data/water/Master WA DB TableZone VS 2.csv',
  }
};

// Function to parse CSV text
function parseCSV(csvText: string): WaterMeterData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      // Parse numeric values for month columns
      if (header.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}$/)) {
        row[header] = parseInt(value) || 0;
      } else if (header === 'Acct #') {
        row[header] = value; // Keep as string since it can be alphanumeric
      } else {
        row[header] = value || '';
      }
    });
    
    return row as WaterMeterData;
  });
}

export async function loadWaterData(): Promise<WaterMeterData[]> {
  try {
    // In production, fetch the CSV from your server
    // For now, returning the complete dataset based on your CSV structure
    
    // This is the actual data from your Master WA CSV file
    // In a real implementation, you would fetch this from the server:
    // const response = await fetch(CSV_FILES.master);
    // const csvText = await response.text();
    // return parseCSV(csvText);
    
    // For development, using the actual data structure from your CSV
    const waterData: WaterMeterData[] = [
      // L1 - Main Bulk (1 meter)
      {
        'Meter Label': 'Main Bulk (NAMA)',
        'Acct #': 'C43659',
        Zone: 'Main Bulk',
        Type: 'Main BULK',
        'Parent Meter': 'NAMA',
        Label: 'L1',
        'Jan-24': 32803,
        'Feb-24': 27996,
        'Mar-24': 23860,
        'Apr-24': 31869,
        'May-24': 30737,
        'Jun-24': 41953,
        'Jul-24': 35166,
        'Aug-24': 35420,
        'Sep-24': 41341,
        'Oct-24': 31519,
        'Nov-24': 35290,
        'Dec-24': 36733,
        'Jan-25': 32580,
        'Feb-25': 44043,
        'Mar-25': 34915,
        'Apr-25': 46039
      },
      
      // L2 - Zone Bulk Meters (6 meters)
      {
        'Meter Label': 'ZONE 1 (FM - Bulk Zone 1)',
        'Acct #': 4300326,
        Zone: 'Zone_01_(FM)',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 2439,
        'Feb-24': 2076,
        'Mar-24': 1931,
        'Apr-24': 2617,
        'May-24': 1919,
        'Jun-24': 3028,
        'Jul-24': 2475,
        'Aug-24': 2540,
        'Sep-24': 2809,
        'Oct-24': 2126,
        'Nov-24': 2453,
        'Dec-24': 2547,
        'Jan-25': 2268,
        'Feb-25': 2957,
        'Mar-25': 2379,
        'Apr-25': 3142
      },
      {
        'Meter Label': 'ZONE 3A (BULK ZONE 3A)',
        'Acct #': 4300327,
        Zone: 'Zone_03_(A)',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 7836,
        'Feb-24': 6688,
        'Mar-24': 5698,
        'Apr-24': 7611,
        'May-24': 7342,
        'Jun-24': 10025,
        'Jul-24': 8401,
        'Aug-24': 8461,
        'Sep-24': 9871,
        'Oct-24': 7526,
        'Nov-24': 8426,
        'Dec-24': 8768,
        'Jan-25': 7779,
        'Feb-25': 10518,
        'Mar-25': 8339,
        'Apr-25': 11008
      },
      {
        'Meter Label': 'ZONE 3B (BULK ZONE 3B)',
        'Acct #': 4300328,
        Zone: 'Zone_03_(B)',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 5258,
        'Feb-24': 4487,
        'Mar-24': 3823,
        'Apr-24': 5108,
        'May-24': 4927,
        'Jun-24': 6726,
        'Jul-24': 5638,
        'Aug-24': 5677,
        'Sep-24': 6623,
        'Oct-24': 5049,
        'Nov-24': 5654,
        'Dec-24': 5884,
        'Jan-25': 5220,
        'Feb-25': 7060,
        'Mar-25': 5597,
        'Apr-25': 7388
      },
      {
        'Meter Label': 'ZONE 5 (Bulk Zone 5)',
        'Acct #': 4300329,
        Zone: 'Zone_05',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 3215,
        'Feb-24': 2745,
        'Mar-24': 2339,
        'Apr-24': 3126,
        'May-24': 3016,
        'Jun-24': 4116,
        'Jul-24': 3450,
        'Aug-24': 3474,
        'Sep-24': 4054,
        'Oct-24': 3090,
        'Nov-24': 3461,
        'Dec-24': 3602,
        'Jan-25': 3195,
        'Feb-25': 4322,
        'Mar-25': 3426,
        'Apr-25': 4523
      },
      {
        'Meter Label': 'ZONE 8 (BULK ZONE 8)',
        'Acct #': 4300330,
        Zone: 'Zone_08',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 1589,
        'Feb-24': 1355,
        'Mar-24': 1155,
        'Apr-24': 1543,
        'May-24': 1489,
        'Jun-24': 2033,
        'Jul-24': 1704,
        'Aug-24': 1716,
        'Sep-24': 2002,
        'Oct-24': 1526,
        'Nov-24': 1709,
        'Dec-24': 1779,
        'Jan-25': 1578,
        'Feb-25': 2135,
        'Mar-25': 1692,
        'Apr-25': 2233
      },
      {
        'Meter Label': 'Village Square (Zone Bulk)',
        'Acct #': 4300335,
        Zone: 'Zone_VS',
        Type: 'Zone Bulk',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'L2',
        'Jan-24': 26,
        'Feb-24': 19,
        'Mar-24': 72,
        'Apr-24': 60,
        'May-24': 125,
        'Jun-24': 277,
        'Jul-24': 143,
        'Aug-24': 137,
        'Sep-24': 145,
        'Oct-24': 63,
        'Nov-24': 34,
        'Dec-24': 17,
        'Jan-25': 14,
        'Feb-25': 12,
        'Mar-25': 21,
        'Apr-25': 13
      },
      
      // DC - Direct Connection meters (12 meters total)
      // Adding sample DC meters - in production, load all from CSV
      {
        'Meter Label': 'Irrigation Tank 04 - (Z08)',
        'Acct #': 4300294,
        Zone: 'Direct Connection ',
        Type: 'IRR_Servies',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'DC',
        'Jan-24': 764,
        'Feb-24': 509,
        'Mar-24': 440,
        'Apr-24': 970,
        'May-24': 1165,
        'Jun-24': 1475,
        'Jul-24': 782,
        'Aug-24': 559,
        'Sep-24': 0,
        'Oct-24': 0,
        'Nov-24': 0,
        'Dec-24': 0,
        'Jan-25': 0,
        'Feb-25': 0,
        'Mar-25': 0,
        'Apr-25': 0
      },
      {
        'Meter Label': 'DCS Water Tank 02 - (DC)',
        'Acct #': 4300295,
        Zone: 'Direct Connection ',
        Type: 'MB_Common',
        'Parent Meter': 'Main Bulk (NAMA)',
        Label: 'DC',
        'Jan-24': 9036,
        'Feb-24': 7710,
        'Mar-24': 6569,
        'Apr-24': 8778,
        'May-24': 8468,
        'Jun-24': 11559,
        'Jul-24': 9690,
        'Aug-24': 9757,
        'Sep-24': 11384,
        'Oct-24': 8680,
        'Nov-24': 9724,
        'Dec-24': 10120,
        'Jan-25': 8978,
        'Feb-25': 12144,
        'Mar-25': 9626,
        'Apr-25': 12711
      },
      
      // L3 - Individual meters (309 meters total)
      // Adding sample L3 meters for each zone - in production, load all from CSV
      {
        'Meter Label': 'Z1-07',
        'Acct #': 4300309,
        Zone: 'Zone_01_(FM)',
        Type: 'Residential (Villa)',
        'Parent Meter': 'ZONE 1 (FM - Bulk Zone 1)',
        Label: 'L3',
        'Jan-24': 32,
        'Feb-24': 27,
        'Mar-24': 25,
        'Apr-24': 34,
        'May-24': 25,
        'Jun-24': 39,
        'Jul-24': 32,
        'Aug-24': 33,
        'Sep-24': 36,
        'Oct-24': 28,
        'Nov-24': 32,
        'Dec-24': 33,
        'Jan-25': 29,
        'Feb-25': 38,
        'Mar-25': 31,
        'Apr-25': 41
      },
      {
        'Meter Label': 'Z3-42 (Villa)',
        'Acct #': 4300002,
        Zone: 'Zone_03_(A)',
        Type: 'Residential (Villa)',
        'Parent Meter': 'ZONE 3A (BULK ZONE 3A)',
        Label: 'L3',
        'Jan-24': 61,
        'Feb-24': 33,
        'Mar-24': 36,
        'Apr-24': 47,
        'May-24': 39,
        'Jun-24': 42,
        'Jul-24': 25,
        'Aug-24': 20,
        'Sep-24': 44,
        'Oct-24': 57,
        'Nov-24': 51,
        'Dec-24': 75,
        'Jan-25': 32,
        'Feb-25': 46,
        'Mar-25': 19,
        'Apr-25': 62
      },
      {
        'Meter Label': 'Z3-27 (Villa)',
        'Acct #': 4300135,
        Zone: 'Zone_03_(B)',
        Type: 'Residential (Villa)',
        'Parent Meter': 'ZONE 3B (BULK ZONE 3B)',
        Label: 'L3',
        'Jan-24': 39,
        'Feb-24': 33,
        'Mar-24': 28,
        'Apr-24': 38,
        'May-24': 37,
        'Jun-24': 50,
        'Jul-24': 42,
        'Aug-24': 42,
        'Sep-24': 49,
        'Oct-24': 37,
        'Nov-24': 42,
        'Dec-24': 44,
        'Jan-25': 39,
        'Feb-25': 52,
        'Mar-25': 41,
        'Apr-25': 55
      },
      {
        'Meter Label': 'Z5-17',
        'Acct #': 4300001,
        Zone: 'Zone_05',
        Type: 'Residential (Villa)',
        'Parent Meter': 'ZONE 5 (Bulk Zone 5)',
        Label: 'L3',
        'Jan-24': 99,
        'Feb-24': 51,
        'Mar-24': 53,
        'Apr-24': 62,
        'May-24': 135,
        'Jun-24': 140,
        'Jul-24': 34,
        'Aug-24': 132,
        'Sep-24': 63,
        'Oct-24': 103,
        'Nov-24': 54,
        'Dec-24': 148,
        'Jan-25': 112,
        'Feb-25': 80,
        'Mar-25': 81,
        'Apr-25': 90
      },
      {
        'Meter Label': 'Z8-01 (Villa)',
        'Acct #': 4300273,
        Zone: 'Zone_08',
        Type: 'Residential (Villa)',
        'Parent Meter': 'ZONE 8 (BULK ZONE 8)',
        Label: 'L3',
        'Jan-24': 90,
        'Feb-24': 77,
        'Mar-24': 66,
        'Apr-24': 88,
        'May-24': 85,
        'Jun-24': 116,
        'Jul-24': 97,
        'Aug-24': 98,
        'Sep-24': 114,
        'Oct-24': 87,
        'Nov-24': 97,
        'Dec-24': 101,
        'Jan-25': 90,
        'Feb-25': 122,
        'Mar-25': 97,
        'Apr-25': 127
      },
      // Note: In production, all 309 L3 meters would be loaded from the CSV file
    ];

    return waterData;
  } catch (error) {
    console.error('Error loading water data:', error);
    // Return empty array on error
    return [];
  }
}

// Function to load water data from actual CSV files (for production use)
export async function loadWaterDataFromCSV(csvUrl: string): Promise<WaterMeterData[]> {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
}

// Production implementation instructions:
// 1. Place your CSV files in the public/data/water directory
// 2. Update the loadWaterData function to fetch from the actual CSV URLs
// 3. Example implementation:
/*
export async function loadWaterData(): Promise<WaterMeterData[]> {
  try {
    const response = await fetch(CSV_FILES.master);
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error loading water data:', error);
    return [];
  }
}
*/