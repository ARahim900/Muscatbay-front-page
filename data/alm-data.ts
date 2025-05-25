export interface Asset {
  id: string
  name: string
  type: AssetType
  category: AssetCategory
  status: AssetStatus
  condition: AssetCondition
  location: string
  zone: string
  serialNumber: string
  manufacturer: string
  model: string
  purchaseDate: string
  purchaseValue: number
  currentValue: number
  depreciationRate: number
  warrantyExpiry: string
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  maintenanceFrequency: MaintenanceFrequency
  assignedTo: string
  department: string
  lifecycleStage: LifecycleStage
  utilizationRate: number
  operatingHours: number
  maintenanceHistory: MaintenanceRecord[]
  documents: Document[]
  tags: string[]
}

export enum AssetType {
  PUMP = "Pump",
  VALVE = "Valve",
  METER = "Meter",
  TRANSFORMER = "Transformer",
  GENERATOR = "Generator",
  MOTOR = "Motor",
  TANK = "Tank",
  PIPE = "Pipe",
  SENSOR = "Sensor",
  CONTROLLER = "Controller",
  HVAC = "HVAC Equipment",
  VEHICLE = "Vehicle",
  TOOL = "Tool",
  SAFETY_EQUIPMENT = "Safety Equipment",
  IT_EQUIPMENT = "IT Equipment"
}

export enum AssetCategory {
  WATER_SYSTEM = "Water System",
  ELECTRICAL = "Electrical",
  MECHANICAL = "Mechanical",
  CIVIL = "Civil Infrastructure",
  IT_TELECOM = "IT & Telecom",
  SAFETY = "Safety & Security",
  TRANSPORTATION = "Transportation"
}

export enum AssetStatus {
  OPERATIONAL = "Operational",
  MAINTENANCE = "Under Maintenance",
  REPAIR = "Under Repair",
  STANDBY = "Standby",
  DECOMMISSIONED = "Decommissioned",
  DISPOSED = "Disposed"
}

export enum AssetCondition {
  EXCELLENT = "Excellent",
  GOOD = "Good",
  FAIR = "Fair",
  POOR = "Poor",
  CRITICAL = "Critical"
}

export enum LifecycleStage {
  NEW = "New",
  ACTIVE = "Active",
  AGING = "Aging",
  END_OF_LIFE = "End of Life",
  REPLACED = "Replaced"
}

export enum MaintenanceFrequency {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  SEMI_ANNUAL = "Semi-Annual",
  ANNUAL = "Annual",
  AS_NEEDED = "As Needed"
}

export interface MaintenanceRecord {
  id: string
  date: string
  type: MaintenanceType
  description: string
  technician: string
  cost: number
  duration: number
  partsReplaced: string[]
  nextScheduledDate: string
}

export enum MaintenanceType {
  PREVENTIVE = "Preventive",
  CORRECTIVE = "Corrective",
  PREDICTIVE = "Predictive",
  EMERGENCY = "Emergency",
  INSPECTION = "Inspection",
  CALIBRATION = "Calibration"
}

export interface Document {
  id: string
  name: string
  type: DocumentType
  url: string
  uploadDate: string
}

export enum DocumentType {
  MANUAL = "Manual",
  WARRANTY = "Warranty",
  CERTIFICATE = "Certificate",
  INSPECTION_REPORT = "Inspection Report",
  INVOICE = "Invoice",
  DRAWING = "Drawing"
}

export interface AssetMetrics {
  totalAssets: number
  operationalAssets: number
  maintenanceBacklog: number
  upcomingMaintenances: number
  totalValue: number
  depreciatedValue: number
  averageUtilization: number
  criticalAssets: number
  overdueMaintenances: number
  monthlyMaintenanceCost: number
}

export interface MaintenanceSchedule {
  assetId: string
  assetName: string
  maintenanceType: MaintenanceType
  scheduledDate: string
  estimatedDuration: number
  assignedTeam: string
  priority: Priority
  status: ScheduleStatus
}

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical"
}

export enum ScheduleStatus {
  SCHEDULED = "Scheduled",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  OVERDUE = "Overdue",
  CANCELLED = "Cancelled"
}

// Mock data generation
const generateMaintenanceHistory = (): MaintenanceRecord[] => {
  const records: MaintenanceRecord[] = []
  const types = Object.values(MaintenanceType)
  
  for (let i = 0; i < 5; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i * 2)
    
    records.push({
      id: `maint-${i + 1}`,
      date: date.toISOString().split('T')[0],
      type: types[Math.floor(Math.random() * types.length)],
      description: `Routine ${types[i % types.length].toLowerCase()} maintenance performed`,
      technician: ["Ahmed Al-Rashdi", "Sara Al-Habsi", "Mohammed Al-Balushi"][i % 3],
      cost: Math.floor(Math.random() * 500) + 100,
      duration: Math.floor(Math.random() * 4) + 1,
      partsReplaced: i % 2 === 0 ? ["Filter", "Seal"] : ["Belt", "Bearing"],
      nextScheduledDate: new Date(date.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }
  
  return records
}

export const mockAssets: Asset[] = [
  {
    id: "AST-001",
    name: "Main Water Pump A",
    type: AssetType.PUMP,
    category: AssetCategory.WATER_SYSTEM,
    status: AssetStatus.OPERATIONAL,
    condition: AssetCondition.GOOD,
    location: "Pump House 1",
    zone: "Zone A",
    serialNumber: "WP-2023-001A",
    manufacturer: "Grundfos",
    model: "CR 95-5",
    purchaseDate: "2023-01-15",
    purchaseValue: 25000,
    currentValue: 22500,
    depreciationRate: 10,
    warrantyExpiry: "2026-01-15",
    lastMaintenanceDate: "2025-04-15",
    nextMaintenanceDate: "2025-07-15",
    maintenanceFrequency: MaintenanceFrequency.QUARTERLY,
    assignedTo: "Water Department",
    department: "Utilities",
    lifecycleStage: LifecycleStage.ACTIVE,
    utilizationRate: 85,
    operatingHours: 8760,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [
      { id: "doc-1", name: "User Manual", type: DocumentType.MANUAL, url: "#", uploadDate: "2023-01-20" },
      { id: "doc-2", name: "Warranty Certificate", type: DocumentType.WARRANTY, url: "#", uploadDate: "2023-01-20" }
    ],
    tags: ["critical", "water-supply", "primary"]
  },
  {
    id: "AST-002",
    name: "Distribution Transformer T1",
    type: AssetType.TRANSFORMER,
    category: AssetCategory.ELECTRICAL,
    status: AssetStatus.OPERATIONAL,
    condition: AssetCondition.EXCELLENT,
    location: "Substation 1",
    zone: "Zone B",
    serialNumber: "TR-2023-001",
    manufacturer: "ABB",
    model: "1000KVA",
    purchaseDate: "2023-03-20",
    purchaseValue: 75000,
    currentValue: 71250,
    depreciationRate: 5,
    warrantyExpiry: "2028-03-20",
    lastMaintenanceDate: "2025-05-01",
    nextMaintenanceDate: "2025-11-01",
    maintenanceFrequency: MaintenanceFrequency.SEMI_ANNUAL,
    assignedTo: "Electrical Department",
    department: "Utilities",
    lifecycleStage: LifecycleStage.ACTIVE,
    utilizationRate: 75,
    operatingHours: 6570,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [
      { id: "doc-3", name: "Installation Certificate", type: DocumentType.CERTIFICATE, url: "#", uploadDate: "2023-03-25" }
    ],
    tags: ["critical", "power-distribution"]
  },
  {
    id: "AST-003",
    name: "Flow Meter FM-01",
    type: AssetType.METER,
    category: AssetCategory.WATER_SYSTEM,
    status: AssetStatus.MAINTENANCE,
    condition: AssetCondition.FAIR,
    location: "Main Distribution Line",
    zone: "Zone A",
    serialNumber: "FM-2022-045",
    manufacturer: "Endress+Hauser",
    model: "Promag 400",
    purchaseDate: "2022-06-10",
    purchaseValue: 8500,
    currentValue: 6800,
    depreciationRate: 10,
    warrantyExpiry: "2025-06-10",
    lastMaintenanceDate: "2025-05-20",
    nextMaintenanceDate: "2025-06-20",
    maintenanceFrequency: MaintenanceFrequency.MONTHLY,
    assignedTo: "Water Department",
    department: "Utilities",
    lifecycleStage: LifecycleStage.AGING,
    utilizationRate: 95,
    operatingHours: 15000,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [],
    tags: ["monitoring", "calibration-required"]
  },
  {
    id: "AST-004",
    name: "Emergency Generator G1",
    type: AssetType.GENERATOR,
    category: AssetCategory.ELECTRICAL,
    status: AssetStatus.STANDBY,
    condition: AssetCondition.GOOD,
    location: "Generator House",
    zone: "Central",
    serialNumber: "GEN-2023-010",
    manufacturer: "Caterpillar",
    model: "C18 ACERT",
    purchaseDate: "2023-02-28",
    purchaseValue: 95000,
    currentValue: 85500,
    depreciationRate: 10,
    warrantyExpiry: "2026-02-28",
    lastMaintenanceDate: "2025-04-30",
    nextMaintenanceDate: "2025-05-30",
    maintenanceFrequency: MaintenanceFrequency.MONTHLY,
    assignedTo: "Electrical Department",
    department: "Utilities",
    lifecycleStage: LifecycleStage.ACTIVE,
    utilizationRate: 15,
    operatingHours: 1200,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [
      { id: "doc-4", name: "Service Agreement", type: DocumentType.WARRANTY, url: "#", uploadDate: "2023-03-01" }
    ],
    tags: ["emergency", "backup-power"]
  },
  {
    id: "AST-005",
    name: "HVAC Unit AC-01",
    type: AssetType.HVAC,
    category: AssetCategory.MECHANICAL,
    status: AssetStatus.OPERATIONAL,
    condition: AssetCondition.GOOD,
    location: "Admin Building",
    zone: "Central",
    serialNumber: "HVAC-2023-015",
    manufacturer: "Carrier",
    model: "30RB-080",
    purchaseDate: "2023-04-15",
    purchaseValue: 45000,
    currentValue: 42750,
    depreciationRate: 5,
    warrantyExpiry: "2026-04-15",
    lastMaintenanceDate: "2025-03-15",
    nextMaintenanceDate: "2025-06-15",
    maintenanceFrequency: MaintenanceFrequency.QUARTERLY,
    assignedTo: "Facilities Department",
    department: "Administration",
    lifecycleStage: LifecycleStage.ACTIVE,
    utilizationRate: 80,
    operatingHours: 5000,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [],
    tags: ["comfort-cooling", "energy-efficiency"]
  },
  {
    id: "AST-006",
    name: "Safety Valve SV-12",
    type: AssetType.VALVE,
    category: AssetCategory.WATER_SYSTEM,
    status: AssetStatus.REPAIR,
    condition: AssetCondition.POOR,
    location: "Tank Farm",
    zone: "Zone C",
    serialNumber: "SV-2021-012",
    manufacturer: "Emerson",
    model: "Anderson Greenwood",
    purchaseDate: "2021-09-10",
    purchaseValue: 3500,
    currentValue: 2100,
    depreciationRate: 15,
    warrantyExpiry: "2024-09-10",
    lastMaintenanceDate: "2025-05-10",
    nextMaintenanceDate: "2025-06-10",
    maintenanceFrequency: MaintenanceFrequency.MONTHLY,
    assignedTo: "Water Department",
    department: "Utilities",
    lifecycleStage: LifecycleStage.END_OF_LIFE,
    utilizationRate: 100,
    operatingHours: 26280,
    maintenanceHistory: generateMaintenanceHistory(),
    documents: [],
    tags: ["safety-critical", "replacement-needed"]
  }
]

export const mockMaintenanceSchedule: MaintenanceSchedule[] = [
  {
    assetId: "AST-001",
    assetName: "Main Water Pump A",
    maintenanceType: MaintenanceType.PREVENTIVE,
    scheduledDate: "2025-05-28",
    estimatedDuration: 4,
    assignedTeam: "Team Alpha",
    priority: Priority.HIGH,
    status: ScheduleStatus.SCHEDULED
  },
  {
    assetId: "AST-003",
    assetName: "Flow Meter FM-01",
    maintenanceType: MaintenanceType.CALIBRATION,
    scheduledDate: "2025-05-26",
    estimatedDuration: 2,
    assignedTeam: "Team Beta",
    priority: Priority.MEDIUM,
    status: ScheduleStatus.SCHEDULED
  },
  {
    assetId: "AST-005",
    assetName: "HVAC Unit AC-01",
    maintenanceType: MaintenanceType.PREVENTIVE,
    scheduledDate: "2025-05-25",
    estimatedDuration: 3,
    assignedTeam: "Team Gamma",
    priority: Priority.LOW,
    status: ScheduleStatus.IN_PROGRESS
  },
  {
    assetId: "AST-006",
    assetName: "Safety Valve SV-12",
    maintenanceType: MaintenanceType.CORRECTIVE,
    scheduledDate: "2025-05-24",
    estimatedDuration: 6,
    assignedTeam: "Team Alpha",
    priority: Priority.CRITICAL,
    status: ScheduleStatus.OVERDUE
  }
]

export const calculateAssetMetrics = (assets: Asset[]): AssetMetrics => {
  const totalAssets = assets.length
  const operationalAssets = assets.filter(a => a.status === AssetStatus.OPERATIONAL).length
  const maintenanceBacklog = assets.filter(a => a.status === AssetStatus.MAINTENANCE || a.status === AssetStatus.REPAIR).length
  const upcomingMaintenances = assets.filter(a => {
    const nextMaintDate = new Date(a.nextMaintenanceDate)
    const today = new Date()
    const daysUntil = (nextMaintDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return daysUntil <= 30 && daysUntil >= 0
  }).length
  
  const totalValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0)
  const depreciatedValue = assets.reduce((sum, a) => sum + a.currentValue, 0)
  const averageUtilization = assets.reduce((sum, a) => sum + a.utilizationRate, 0) / totalAssets
  const criticalAssets = assets.filter(a => a.condition === AssetCondition.CRITICAL || a.condition === AssetCondition.POOR).length
  
  const overdueMaintenances = assets.filter(a => {
    const nextMaintDate = new Date(a.nextMaintenanceDate)
    const today = new Date()
    return nextMaintDate < today
  }).length
  
  const monthlyMaintenanceCost = assets.reduce((sum, a) => {
    const avgCost = a.maintenanceHistory.reduce((s, m) => s + m.cost, 0) / a.maintenanceHistory.length
    return sum + avgCost
  }, 0)
  
  return {
    totalAssets,
    operationalAssets,
    maintenanceBacklog,
    upcomingMaintenances,
    totalValue,
    depreciatedValue,
    averageUtilization,
    criticalAssets,
    overdueMaintenances,
    monthlyMaintenanceCost
  }
}
