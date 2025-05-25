# Water System CSV Data Setup

This directory should contain your water meter CSV files for the Water System Management application.

## Required Files

Place your CSV files in this directory with the following names:

1. **Master WA DB TableMaster WA 24  25 Apr.csv** - The main master file containing all water meter data
2. **Master WA DB TableA2.csv** - A2 meter data (optional)
3. **Master WA DB TableA3.csv** - A3 meter data (optional)
4. **Master WA DB TableZone FM  2.csv** - Zone 01 (FM) data (optional)
5. **Master WA DB TableZone 03A 2.csv** - Zone 03(A) data (optional)
6. **Master WA DB TableZone 03B 2.csv** - Zone 03(B) data (optional)
7. **Master WA DB TableZone 05 2.csv** - Zone 05 data (optional)
8. **Master WA DB TableZone 08 2.csv** - Zone 08 data (optional)
9. **Master WA DB TableZone VS 2.csv** - Zone VS data (optional)

## CSV Format Requirements

Your CSV files must have the following columns:

- **Meter Label** (String) - Unique identifier for each meter
- **Acct #** (String/Integer) - Account number
- **Zone** (String) - Zone identifier (e.g., Zone_01_(FM), Zone_03_(A), etc.)
- **Type** (String) - Meter type (e.g., Residential (Villa), Zone Bulk, Main BULK, etc.)
- **Parent Meter** (String) - Parent meter reference
- **Label** (String) - Must be one of: L1, L2, L3, or DC
- **Monthly columns** - Jan-24, Feb-24, Mar-24... Apr-25 (Integer values)

## Zone Mapping

The system recognizes the following zones:

- Zone_01_(FM) → Zone 01 (FM)
- Zone_03_(A) → Zone 03(A)
- Zone_03_(B) → Zone 03(B)
- Zone_05 → Zone 05
- Zone_08 → Zone 08
- Zone_VS → Zone VS
- Main Bulk → Main BULK
- Direct Connection → Direct Connection

## Label Definitions

- **L1**: Main bulk meter (typically 1 meter)
- **L2**: Zone bulk meters (typically 6-7 meters)
- **L3**: Individual meters (typically 300+ meters)
- **DC**: Direct connection meters (typically 12 meters)

## KPI Calculations

The system calculates the following KPIs:

- **A1** = Sum of all L1 meters
- **A2** = Sum of all L2 meters + Sum of all DC meters
- **A3** = Sum of all L3 meters + Sum of all DC meters
- **Stage 1 Loss** = L1 - L2
- **Stage 2 Loss** = L2 - L3
- **Total Loss** = L1 - L3

## Setup Instructions

1. Create this directory structure in your project:
   ```
   public/
   └── data/
       └── water/
           ├── README.md (this file)
           └── [Your CSV files here]
   ```

2. Copy your CSV files to this directory

3. Start your development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Navigate to the Water System page

5. The system will automatically try to load the master CSV file from this directory

## Alternative: Upload via UI

If you prefer not to place files in the public directory, you can:

1. Navigate to the Water System page
2. Click the "Data Source" button
3. Use the file upload interface to select your CSV file
4. The data will be loaded directly into the application

## Troubleshooting

- Ensure CSV files are properly formatted with UTF-8 encoding
- Check that all required columns are present
- Verify that the Label column contains only L1, L2, L3, or DC values
- Make sure numeric values in month columns are valid integers
- Check the browser console for any error messages

## Sample Data

If no CSV files are found, the system will load sample data automatically. You can also click "Load Sample Data" in the Data Source dialog to use the built-in sample dataset.