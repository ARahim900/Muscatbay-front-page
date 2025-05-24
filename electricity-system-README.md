# Electricity System Management

## Overview

The Electricity System Management platform provides comprehensive monitoring and analysis of electricity consumption across all Muscat Bay facilities. The system tracks 56 electricity meters across different zones and categories, providing real-time insights into consumption patterns, costs, and trends.

## Features

### 📊 Dashboard Overview
- **Real-time Statistics**: Total consumption, costs, current month usage, and growth rates
- **56 Active Meters**: Monitoring across all zones and facility types
- **Cost Tracking**: Automatic calculation at OMR 0.0250 per kWh
- **Monthly Growth Analysis**: Track consumption trends month-over-month

### 📈 Data Visualization
- **Consumption Trends**: Area charts showing 6-month usage patterns
- **Category Distribution**: Pie charts breaking down usage by facility type
- **Cost Analysis**: Bar charts comparing consumption vs. costs
- **Top Consumers**: Identify highest usage meters for optimization

### 🏢 Categories & Zones

#### Infrastructure (25 meters)
- **Pumping Stations**: 5 stations (MC Pumping Station 01-05)
- **Lifting Stations**: 5 stations (MC Lifting Station 02-05)
- **Irrigation Tanks**: 4 tanks for water distribution
- **Actuators**: 6 automated control systems
- **Street Lighting**: 5 street light zones
- **Special Facilities**: Beachwell, Helipad

#### Common Areas (6 meters)
- **Central Park**: Main recreational area
- **Security Buildings**: Guard House, Security Building, ROP Building
- **Village Square**: Community gathering space
- **Landscape Lighting**: Zone 3 decorative lighting

#### Residential (21 meters)
- **Zone 3 Apartments**: D44-D75 residential units
- **Common Meters**: Shared residential facilities

#### Commercial (2 meters)
- **Bank Muscat**: Banking facility
- **CIF Kitchen**: Commercial kitchen facility

### 📋 Meter Management
- **Detailed Meter Table**: View all meters with monthly consumption data
- **Search & Filter**: Find meters by name, account number, or unit
- **Category Filtering**: View meters by specific categories
- **Consumption Levels**: Visual indicators for usage levels (Minimal to Very High)
- **Trend Indicators**: Quick view of increasing/decreasing consumption

### 💡 Key Statistics (Sample Data)

#### Total Consumption (6 months)
- **Infrastructure**: 289,528 kWh (OMR 7,238.21)
- **Common Areas**: 99,465 kWh (OMR 2,486.63)
- **Residential**: 122,643 kWh (OMR 3,066.08)
- **Commercial**: 123,644 kWh (OMR 3,091.10)

#### Top Consumers
1. **MC Beachwell**: 145,998 kWh - Infrastructure water pumping
2. **CIF Kitchen**: 98,655 kWh - Commercial kitchen operations
3. **MC Central Park**: 99,465 kWh - Park lighting and facilities
4. **Security Building**: 32,291 kWh - 24/7 security operations
5. **Village Square**: 24,361 kWh - Community area lighting

### 📊 Monthly Analysis

The system tracks consumption across 6 months (November 2024 - April 2025):
- **Highest Month**: January 2025 - Peak summer usage
- **Lowest Month**: March 2025 - Reduced cooling needs
- **Average Growth**: Variable by category and season

### 🔍 Individual Meter Details

Each meter has a dedicated detail page showing:
- **Monthly Consumption Graph**: Line chart of usage trends
- **Cost Breakdown**: Monthly electricity costs
- **Growth Analysis**: Percentage changes month-to-month
- **Export Reports**: Download detailed meter reports

### 💰 Cost Management

- **Rate**: OMR 0.0250 per kWh (fixed rate)
- **Billing Period**: Monthly consumption tracking
- **Cost Alerts**: Visual indicators for high-cost meters
- **Budget Analysis**: Compare actual vs. expected costs

## Technical Implementation

### Components
- `electricity-system/page.tsx`: Main dashboard with tabs
- `electricity-system/meter/[id]/page.tsx`: Individual meter details
- `electricity-system/electricity-table.tsx`: Comprehensive meter listing
- `electricity-system/consumption-chart.tsx`: Multi-view charts
- `electricity-system/category-breakdown.tsx`: Category analysis

### Data Structure
- **56 Meters**: Each with unique account numbers
- **6 Months Data**: November 2024 - April 2025
- **Real-time Calculations**: Automatic cost and trend analysis
- **Category Mapping**: Automatic classification by facility type

## Usage Patterns

### Infrastructure
- **Beachwell**: Highest consumer due to continuous pumping
- **Street Lights**: Consistent usage with seasonal variations
- **Pumping Stations**: Variable based on water demand

### Residential
- **Apartments**: Average 5,000-7,000 kWh per 6 months
- **Seasonal Patterns**: Higher in summer months
- **Common Areas**: Shared lighting and facilities

### Commercial
- **CIF Kitchen**: High usage during operational hours
- **Bank Muscat**: Moderate, business hours usage

## Future Enhancements

1. **Smart Meter Integration**: Real-time data collection
2. **Predictive Analytics**: Forecast future consumption
3. **Automated Alerts**: Unusual consumption notifications
4. **Energy Efficiency**: Recommendations for reducing usage
5. **Solar Integration**: Track renewable energy contribution
6. **Mobile App**: Remote monitoring capabilities

## Access

The Electricity System can be accessed:
1. From the main Muscat Bay dashboard by clicking "Electricity System"
2. Direct URL: `/electricity-system`
3. Individual meters: `/electricity-system/meter/[meter-id]`

## Energy Conservation Tips

- Monitor high-consumption meters regularly
- Identify and address usage spikes
- Optimize street lighting schedules
- Implement energy-efficient equipment
- Regular maintenance of pumping stations
- Consider solar alternatives for common areas
