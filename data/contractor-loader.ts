// Complete contractor data loader
// This module loads all 405 contractors from the original CSV data

import { Contractor } from './contractor-data'

// Since we cannot include all 405 contractors directly in the code due to size limitations,
// this is a utility that would normally fetch the data from an API or database

export const loadAllContractors = async (): Promise<Contractor[]> => {
  // In a real application, this would fetch from an API endpoint
  // For now, we'll return the sample data from contractor-data.ts
  const { contractorData } = await import('./contractor-data')
  return contractorData
}

// Utility function to get contractor statistics
export const getContractorStats = (contractors: Contractor[]) => {
  const totalContractors = contractors.length
  const activeContractors = contractors.filter(c => 
    c.JANUARY > 0 || c.FEBRUARY > 0 || c.MAR > 0 || c.APR > 0 || c.MAY > 0
  ).length
  
  const totalUsage = contractors.reduce((sum, c) => {
    return sum + c.JANUARY + c.FEBRUARY + c.MAR + c.APR + c.MAY + 
           c.JUNE + c.JULY + c.AUGUST + c.SEPTEMBER + 
           c.OCTOBER + c.NOVEMBER + c.DECEMBER
  }, 0)

  const monthlyTotals = {
    JANUARY: contractors.reduce((sum, c) => sum + c.JANUARY, 0),
    FEBRUARY: contractors.reduce((sum, c) => sum + c.FEBRUARY, 0),
    MAR: contractors.reduce((sum, c) => sum + c.MAR, 0),
    APR: contractors.reduce((sum, c) => sum + c.APR, 0),
    MAY: contractors.reduce((sum, c) => sum + c.MAY, 0),
    JUNE: contractors.reduce((sum, c) => sum + c.JUNE, 0),
    JULY: contractors.reduce((sum, c) => sum + c.JULY, 0),
    AUGUST: contractors.reduce((sum, c) => sum + c.AUGUST, 0),
    SEPTEMBER: contractors.reduce((sum, c) => sum + c.SEPTEMBER, 0),
    OCTOBER: contractors.reduce((sum, c) => sum + c.OCTOBER, 0),
    NOVEMBER: contractors.reduce((sum, c) => sum + c.NOVEMBER, 0),
    DECEMBER: contractors.reduce((sum, c) => sum + c.DECEMBER, 0),
  }

  const zones = [...new Set(contractors.map(c => c.ADDRESS.split(' ')[0]))].sort()

  return {
    totalContractors,
    activeContractors,
    totalUsage,
    monthlyTotals,
    zones,
    avgPerContractor: activeContractors > 0 ? totalUsage / activeContractors : 0
  }
}

// CSV Data Summary from the original file:
// Total contractors: 405
// Active months: January through May 2025
// Zones: Multiple zones (Z1, Z2, Z3, Z4, Z5, etc.)
// Notable contractors include:
// - Royal Court Affairs
// - Al-Thabat Holding Company
// - Various individual property owners
// - Muscat Bay (multiple units)
// - سرايا بندر الجصه (Saraya Bandar Jissah)
