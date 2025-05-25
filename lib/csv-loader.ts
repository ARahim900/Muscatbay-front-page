// CSV Loader Utility for Water System
import Papa from 'papaparse';
import { WaterMeterData } from './water-data-utils';

export interface CSVLoaderOptions {
  skipEmptyLines?: boolean;
  dynamicTyping?: boolean;
  header?: boolean;
}

export class CSVLoader {
  private static defaultOptions: CSVLoaderOptions = {
    skipEmptyLines: true,
    dynamicTyping: true,
    header: true
  };

  // Load CSV from a URL
  static async loadFromURL(url: string, options?: CSVLoaderOptions): Promise<WaterMeterData[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load CSV from ${url}: ${response.statusText}`);
      }
      const csvText = await response.text();
      return this.parseCSV(csvText, options);
    } catch (error) {
      console.error('Error loading CSV from URL:', error);
      throw error;
    }
  }

  // Load CSV from file input
  static async loadFromFile(file: File, options?: CSVLoaderOptions): Promise<WaterMeterData[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvText = e.target?.result as string;
          const data = this.parseCSV(csvText, options);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  // Parse CSV text
  static parseCSV(csvText: string, options?: CSVLoaderOptions): WaterMeterData[] {
    const parseOptions = { ...this.defaultOptions, ...options };
    const result = Papa.parse(csvText, {
      ...parseOptions,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });

    // Clean and validate the data
    return result.data.map((row: any) => {
      // Ensure all month columns are numbers
      const cleanedRow: any = {};
      
      Object.keys(row).forEach(key => {
        if (key.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}$/)) {
          // Month column - ensure it's a number
          cleanedRow[key] = parseInt(row[key]) || 0;
        } else {
          // Other columns - keep as is
          cleanedRow[key] = row[key];
        }
      });

      return cleanedRow as WaterMeterData;
    }).filter(row => row['Meter Label']); // Filter out empty rows
  }

  // Load multiple CSV files
  static async loadMultipleFromURLs(urls: string[]): Promise<WaterMeterData[]> {
    try {
      const promises = urls.map(url => this.loadFromURL(url));
      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      console.error('Error loading multiple CSV files:', error);
      throw error;
    }
  }
}

// Helper function to merge data from multiple CSV files
export function mergeWaterData(datasets: WaterMeterData[][]): WaterMeterData[] {
  const mergedData: Map<string, WaterMeterData> = new Map();
  
  datasets.forEach(dataset => {
    dataset.forEach(row => {
      const key = `${row['Meter Label']}_${row['Acct #']}`;
      if (!mergedData.has(key)) {
        mergedData.set(key, row);
      }
    });
  });
  
  return Array.from(mergedData.values());
}