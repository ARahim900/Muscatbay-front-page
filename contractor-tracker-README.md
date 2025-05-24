# Contractor Tracker System

## Overview

The Contractor Tracker is a comprehensive management system for monitoring contractor activities, usage patterns, and performance metrics at Muscat Bay. This system processes data from 405 registered contractors and provides detailed analytics and reporting capabilities.

## Features

### 📊 Dashboard
- **Real-time Statistics**: View total contractors, active contractors, total usage, and average usage per contractor
- **Monthly Trends**: Interactive charts showing usage patterns across all months
- **Zone-based Filtering**: Filter contractors by their address zones (Z1, Z2, Z3, Z4, Z5, etc.)

### 🔍 Search & Filter
- **Smart Search**: Search by contractor name, account number, or badge number
- **Zone Filter**: Filter contractors by their geographical zones
- **Export Functionality**: Export filtered data to CSV format

### 📈 Data Visualization
- **Monthly Usage Charts**: Bar and line charts showing aggregated monthly usage
- **Active Contractors Trend**: Track the number of active contractors per month
- **Average Usage Analysis**: Monitor average usage patterns across the year

### 👤 Individual Contractor Details
- **Detailed Profile**: View comprehensive information for each contractor
- **Usage History**: Monthly usage breakdown with visual charts
- **Performance Metrics**: Total usage, monthly average, and activity status
- **Export Reports**: Generate individual contractor reports in text format

## Data Structure

The system tracks the following information for each contractor:
- **Account Number**: Unique identifier
- **Customer Name**: Contractor or company name
- **Badge Number**: Security/access badge identifier
- **Address**: Zone and plot information
- **Monthly Usage**: Usage data for each month of the year

## Technical Implementation

### Components
- `contractor-tracker/page.tsx`: Main dashboard page
- `contractor-tracker/[id]/page.tsx`: Individual contractor detail page
- `contractor-tracker/contractor-table.tsx`: Data table component with pagination
- `contractor-tracker/monthly-chart.tsx`: Chart visualization component

### Data Management
- Sample data includes 5 contractors (full dataset contains 405)
- Data is structured for easy expansion and API integration
- Support for real-time data updates when connected to backend

## Usage Statistics (from CSV data)

- **Total Contractors**: 405
- **Data Period**: January - May 2025
- **Active Zones**: Multiple zones including Z1, Z2, Z3, Z4, Z5
- **Notable Clients**: 
  - Royal Court Affairs
  - Al-Thabat Holding Company
  - Various individual property owners
  - Multiple Muscat Bay units

## Future Enhancements

1. **API Integration**: Connect to backend API for real-time data updates
2. **Advanced Analytics**: Add predictive analytics and trend forecasting
3. **Alerts System**: Implement alerts for unusual usage patterns
4. **Mobile App**: Develop mobile version for on-the-go access
5. **Bulk Operations**: Add bulk update and management features

## Access

The Contractor Tracker can be accessed from the main Muscat Bay dashboard by clicking on the "Contractor Tracker" card or directly via `/contractor-tracker`.
