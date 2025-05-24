# Water Management System

## Overview
The Water Management System is a comprehensive analytics dashboard for monitoring water supply, distribution, and consumption across different zones in Muscat Bay. It provides real-time insights into water flow, loss analysis, and system efficiency.

## Features

### 1. **Overview Dashboard**
- **Key Performance Indicators (KPIs)**
  - L1 (Main Bulk Supply): Total water supply from main source
  - L2 (Zone Distribution): Water distributed to zones
  - L3 (End User Consumption): Actual water consumed by end users
  - Stage 1 Loss: Loss between main supply and zones (L1-L2)
  - Stage 2 Loss: Loss within zones (L2-L3)
  - Total Loss: Combined water loss
  
- **System Efficiency Tracking**
  - Real-time efficiency percentage
  - Monthly trend analysis
  - Loss breakdown by stages

- **Zone Distribution Analysis**
  - Water distribution across all zones
  - Loss percentage by zone
  - Visual representation with pie charts and bar graphs

### 2. **Group Details**
- **Zone-wise Analysis**
  - Bulk meter readings
  - Individual meter consumption
  - Zone-specific loss metrics
  - Historical trends per zone

- **Customer Details**
  - Searchable customer database
  - Account numbers and consumption patterns
  - Visual consumption indicators
  - Pagination for large datasets

### 3. **Type Details**
- **Consumption by Type**
  - Irrigation Services
  - Residential Villa
  - Residential Apartment
  - Building Common Areas
  - Retail

- **Type Analysis Features**
  - Monthly distribution patterns
  - Percentage of total consumption
  - Year-over-year comparisons
  - Detailed consumption tables

### 4. **Loss Details**
- **Loss Type Breakdown**
  - Physical Leakage
  - Unbilled Authorized Consumption
  - Unauthorized Consumption
  - Administrative Losses

- **Loss Analysis Tools**
  - Historical loss trends
  - Zone-specific loss data
  - Loss distribution visualizations

## Technical Implementation

### Components Structure
```
components/water-system/
└── water-analysis-dashboard.tsx
```

### Key Technologies
- **React**: Component-based UI framework
- **TypeScript**: Type-safe development
- **Recharts**: Data visualization library
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling

### Data Visualization
The system uses various chart types:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distribution
- Area charts for cumulative data
- Composed charts for multi-metric analysis

## Usage

### Importing the Component
```typescript
import WaterAnalysisDashboard from '@/components/water-system/water-analysis-dashboard';
```

### Basic Implementation
```tsx
function App() {
  return (
    <div>
      <WaterAnalysisDashboard />
    </div>
  );
}
```

## Filter Options

### Time Filters
- **Month Selection**: Choose from available months (Jan 2024 - Apr 2025)
- **Year Selection**: Filter by year (2024 or 2025)

### Zone Filters
- All Zones (aggregate view)
- Zone FM
- Zone 03A
- Zone 03B
- Zone 05
- Zone 08
- Village Square

## Data Flow

The system tracks water flow through three levels:
1. **L1 (Main Bulk Supply)**: Total water entering the system
2. **L2 (Zone Distribution)**: Water distributed to various zones
3. **L3 (Individual Consumption)**: Actual water consumed by end users

### Loss Calculation
- **Stage 1 Loss** = L1 - L2 (Loss before reaching zones)
- **Stage 2 Loss** = L2 - L3 (Loss within zones)
- **Total Loss** = Stage 1 Loss + Stage 2 Loss
- **System Efficiency** = (L3 / L1) × 100%

## Performance Metrics

### Efficiency Indicators
- **Good**: > 85% (Green indicators)
- **Average**: 70-85% (Yellow indicators)
- **Poor**: < 70% (Red indicators)

### Loss Thresholds
- **Acceptable**: < 10% total loss
- **Warning**: 10-20% total loss
- **Critical**: > 20% total loss

## Future Enhancements

1. **Real-time Data Integration**
   - API integration for live meter readings
   - Automatic data refresh
   - WebSocket support for instant updates

2. **Advanced Analytics**
   - Predictive loss analysis
   - Anomaly detection
   - Machine learning for pattern recognition

3. **Reporting Features**
   - Export functionality (PDF/Excel)
   - Scheduled reports
   - Custom report builder

4. **Mobile Optimization**
   - Responsive design improvements
   - Touch-optimized interactions
   - Mobile app development

## Maintenance

### Regular Updates
- Monthly data imports
- Meter calibration records
- Zone boundary adjustments
- Customer database synchronization

### System Health Checks
- Data integrity validation
- Performance monitoring
- User access audits
- Backup verification

## Support

For technical support or feature requests, please contact the Muscat Bay Infrastructure Management team.