# Water System CSV Integration Guide

## Overview

The Water System has been successfully integrated into your Muscatbay application with full CSV support. This guide will help you set up your actual water meter data.

## What's Been Implemented

### 1. **Water System Features**
- ✅ Overview section with KPI cards and charts
- ✅ Group Details section with zone-specific analysis
- ✅ CSV file upload capability
- ✅ Automatic CSV loading from public directory
- ✅ Sample data fallback
- ✅ Real-time data processing

### 2. **Data Processing**
- Automatic calculation of A1, A2, A3 values
- Loss analysis (Stage 1, Stage 2, Total)
- Zone-wise distribution and efficiency metrics
- Monthly trend analysis

### 3. **CSV Support**
- Direct file upload via UI
- Automatic loading from `/public/data/water/` directory
- Papa Parse integration for robust CSV parsing
- Support for all your CSV file formats

## Setting Up Your CSV Data

### Option 1: Place Files in Public Directory (Recommended for Production)

1. **Create the directory structure:**
   ```
   your-project/
   └── public/
       └── data/
           └── water/
               └── [Place your CSV files here]
   ```

2. **Copy your CSV files to the directory:**
   - Master WA DB TableMaster WA 24  25 Apr.csv (main file)
   - Master WA DB TableA2.csv
   - Master WA DB TableA3.csv
   - Zone-specific CSV files

3. **Start your application:**
   ```bash
   npm install  # Install dependencies including papaparse
   npm run dev  # Start development server
   ```

4. **Navigate to Water System:**
   - Go to http://localhost:3000
   - Click on "Water System" card
   - Data will load automatically

### Option 2: Upload via UI

1. **Navigate to Water System page**
2. **Click "Data Source" button** in the top right
3. **Choose one of:**
   - Click "Choose File" to upload your CSV
   - Click "Load from Server Directory" if files are in public folder
   - Click "Load Sample Data" to use demo data

## CSV File Format

Your CSV files should have these columns:

```csv
Meter Label,Acct #,Zone,Type,Parent Meter,Label,Jan-24,Feb-24,Mar-24,Apr-24,May-24,Jun-24,Jul-24,Aug-24,Sep-24,Oct-24,Nov-24,Dec-24,Jan-25,Feb-25,Mar-25,Apr-25
Main Bulk (NAMA),C43659,Main Bulk,Main BULK,NAMA,L1,32803,27996,23860,31869,30737,41953,35166,35420,41341,31519,35290,36733,32580,44043,34915,46039
ZONE 1 (FM - Bulk Zone 1),4300326,Zone_01_(FM),Zone Bulk,Main Bulk (NAMA),L2,2439,2076,1931,2617,1919,3028,2475,2540,2809,2126,2453,2547,2268,2957,2379,3142
```

### Important Notes:

1. **Label Column Values:**
   - L1 = Main bulk meter
   - L2 = Zone bulk meters
   - L3 = Individual meters
   - DC = Direct connection meters

2. **Zone Names Must Match:**
   - Zone_01_(FM)
   - Zone_03_(A)
   - Zone_03_(B)
   - Zone_05
   - Zone_08
   - Zone_VS
   - Main Bulk
   - Direct Connection 

3. **Month Columns:**
   - Format: Mon-YY (e.g., Jan-24, Feb-24)
   - Values must be integers

## Troubleshooting

### CSV Not Loading?

1. **Check file location:**
   ```
   public/data/water/Master WA DB TableMaster WA 24  25 Apr.csv
   ```

2. **Verify CSV format:**
   - UTF-8 encoding
   - Comma-separated
   - Headers match exactly

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for error messages

### Data Not Displaying Correctly?

1. **Verify Label column** contains only: L1, L2, L3, DC
2. **Check numeric values** in month columns
3. **Ensure Zone names** match expected format

## Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Place your CSV files** in `/public/data/water/`

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Access Water System** at http://localhost:3000/water-system

## Production Deployment

For production:

1. Place CSV files in the public directory
2. Build the application:
   ```bash
   npm run build
   npm start
   ```

3. The CSV files will be served as static assets

## Need Help?

- Check the browser console for errors
- Verify CSV format matches requirements
- Ensure all dependencies are installed
- Try loading sample data first to verify system works

## Summary

Your Water System is now fully integrated with:
- ✅ Real CSV data support
- ✅ Automatic calculations
- ✅ Interactive dashboards
- ✅ Zone-specific analysis
- ✅ Upload capabilities

Simply place your CSV files in the correct directory or upload them via the UI to see your actual water meter data in action!