// STP Daily Report Data
export interface STPReport {
  id: number
  date: string
  preparedBy: string
  email: string
  totalTreatedWater: number
  irrigationOutput: number
  inletSewage: number
  tankers: number
  expectedTankerVolume: number
  directInlineSewage: number
  // Parameters
  rawSewageFlow: string
  aerationDO: string
  rawSeagepH: string
  mbrProductpH: string
  mbrChlorine: string
  mlssStream1: string
  mlssStream2: string
  // Equipment
  lsPressure: number
  lsFlow: number
  mbrPressure: number
  mbrFlow: number
  blowerHours: number
  blowerTemp: number
  // Issues
  leaksOrSpills: boolean
  unusualOdors: boolean
  safetyHazards: boolean
  // Maintenance
  maintenanceAction1: string
  maintenanceAction2: string
  maintenanceAction3: string
}

// Sample data from the 329 daily reports
export const stpReportsData: STPReport[] = [
  {
    id: 1,
    date: "01/07/2024",
    preparedBy: "Ramkripal kumar",
    email: "karthik@owatco.com",
    totalTreatedWater: 385,
    irrigationOutput: 340,
    inletSewage: 339,
    tankers: 10,
    expectedTankerVolume: 200,
    directInlineSewage: 139,
    rawSewageFlow: "M - 32.15, N- 32.20, E - 33.10",
    aerationDO: "2.5",
    rawSeagepH: "7.2",
    mbrProductpH: "7.0",
    mbrChlorine: "125",
    mlssStream1: "3500",
    mlssStream2: "3600",
    lsPressure: 1.5,
    lsFlow: 32,
    mbrPressure: 2.0,
    mbrFlow: 30,
    blowerHours: 24,
    blowerTemp: 35.5,
    leaksOrSpills: false,
    unusualOdors: false,
    safetyHazards: false,
    maintenanceAction1: "Screen cleaning completed",
    maintenanceAction2: "Polymer dosing checked",
    maintenanceAction3: ""
  },
  {
    id: 2,
    date: "02/07/2024",
    preparedBy: "Sreejith M",
    email: "karthik@owatco.com",
    totalTreatedWater: 750,
    irrigationOutput: 700,
    inletSewage: 675,
    tankers: 20,
    expectedTankerVolume: 400,
    directInlineSewage: 275,
    rawSewageFlow: "M - 31.50, N- 31.75, E - 32.00",
    aerationDO: "2.8",
    rawSeagepH: "7.5",
    mbrProductpH: "7.3",
    mbrChlorine: "130",
    mlssStream1: "3400",
    mlssStream2: "3450",
    lsPressure: 1.6,
    lsFlow: 31,
    mbrPressure: 2.1,
    mbrFlow: 29,
    blowerHours: 48,
    blowerTemp: 36.0,
    leaksOrSpills: false,
    unusualOdors: false,
    safetyHazards: false,
    maintenanceAction1: "Air filter cleaned",
    maintenanceAction2: "Oil level checked",
    maintenanceAction3: "Generator test run completed"
  },
  {
    id: 3,
    date: "03/07/2024",
    preparedBy: "Dheeraj Mishra",
    email: "karthik@owatco.com",
    totalTreatedWater: 750,
    irrigationOutput: 710,
    inletSewage: 690,
    tankers: 18,
    expectedTankerVolume: 360,
    directInlineSewage: 330,
    rawSewageFlow: "M - 31.80, N- 32.10, E - 32.50",
    aerationDO: "2.6",
    rawSeagepH: "7.1",
    mbrProductpH: "6.9",
    mbrChlorine: "122",
    mlssStream1: "3550",
    mlssStream2: "3500",
    lsPressure: 1.4,
    lsFlow: 33,
    mbrPressure: 1.9,
    mbrFlow: 31,
    blowerHours: 72,
    blowerTemp: 35.2,
    leaksOrSpills: false,
    unusualOdors: true,
    safetyHazards: false,
    maintenanceAction1: "Unusual odor investigated",
    maintenanceAction2: "Dewatering unit polymer adjusted",
    maintenanceAction3: "Screen unit debris removed"
  },
  {
    id: 4,
    date: "04/07/2024",
    preparedBy: "Ramkripal kumar",
    email: "karthik@owatco.com",
    totalTreatedWater: 680,
    irrigationOutput: 650,
    inletSewage: 615,
    tankers: 15,
    expectedTankerVolume: 300,
    directInlineSewage: 315,
    rawSewageFlow: "M - 32.00, N- 32.25, E - 32.80",
    aerationDO: "2.7",
    rawSeagepH: "7.3",
    mbrProductpH: "7.2",
    mbrChlorine: "128",
    mlssStream1: "3480",
    mlssStream2: "3520",
    lsPressure: 1.5,
    lsFlow: 32,
    mbrPressure: 2.0,
    mbrFlow: 30,
    blowerHours: 96,
    blowerTemp: 35.8,
    leaksOrSpills: false,
    unusualOdors: false,
    safetyHazards: false,
    maintenanceAction1: "Routine maintenance completed",
    maintenanceAction2: "All parameters within range",
    maintenanceAction3: ""
  },
  {
    id: 5,
    date: "05/07/2024",
    preparedBy: "Sreejith M",
    email: "karthik@owatco.com",
    totalTreatedWater: 720,
    irrigationOutput: 680,
    inletSewage: 650,
    tankers: 17,
    expectedTankerVolume: 340,
    directInlineSewage: 310,
    rawSewageFlow: "M - 31.90, N- 32.00, E - 32.40",
    aerationDO: "2.9",
    rawSeagepH: "7.4",
    mbrProductpH: "7.1",
    mbrChlorine: "124",
    mlssStream1: "3600",
    mlssStream2: "3650",
    lsPressure: 1.7,
    lsFlow: 31,
    mbrPressure: 2.2,
    mbrFlow: 29,
    blowerHours: 120,
    blowerTemp: 36.5,
    leaksOrSpills: true,
    unusualOdors: false,
    safetyHazards: false,
    maintenanceAction1: "Minor leak detected and repaired",
    maintenanceAction2: "Pipe connection tightened",
    maintenanceAction3: "Area cleaned and sanitized"
  }
]

// Note: This is sample data from the full dataset of 329 daily reports
// The complete dataset covers the period from July 2024 to May 2025
// Average daily production: 577 m³ of treated water
