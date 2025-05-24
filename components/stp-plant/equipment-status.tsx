'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { STPReport } from '@/data/stp-reports-data'
import { Activity, Gauge, Thermometer, Wind, Droplets, Settings } from 'lucide-react'

interface EquipmentStatusProps {
  reports: STPReport[]
  detailed?: boolean
}

export default function EquipmentStatus({ reports, detailed = false }: EquipmentStatusProps) {
  // Get latest report for current status
  const latestReport = reports[reports.length - 1] || reports[0]

  // Calculate equipment statistics
  const equipmentStats = useMemo(() => {
    if (!latestReport) return null

    // Analyze pressure and flow
    const lsPressureStatus = latestReport.lsPressure >= 1.0 && latestReport.lsPressure <= 2.0 ? 'normal' : 'warning'
    const mbrPressureStatus = latestReport.mbrPressure >= 1.5 && latestReport.mbrPressure <= 2.5 ? 'normal' : 'warning'
    const flowStatus = latestReport.lsFlow >= 28 && latestReport.lsFlow <= 35 ? 'normal' : 'warning'
    
    // Analyze parameters
    const doStatus = parseFloat(latestReport.aerationDO) >= 2 && parseFloat(latestReport.aerationDO) <= 3 ? 'normal' : 'warning'
    const phStatus = parseFloat(latestReport.rawSeagepH) >= 6.5 && parseFloat(latestReport.rawSeagepH) <= 8.0 ? 'normal' : 'warning'
    const chlorineStatus = parseFloat(latestReport.mbrChlorine) >= 120 && parseFloat(latestReport.mbrChlorine) <= 130 ? 'normal' : 'warning'
    
    // Temperature status
    const tempStatus = latestReport.blowerTemp <= 40 ? 'normal' : 'warning'

    return {
      lsPressureStatus,
      mbrPressureStatus,
      flowStatus,
      doStatus,
      phStatus,
      chlorineStatus,
      tempStatus,
      blowerHours: latestReport.blowerHours,
      overallStatus: [lsPressureStatus, mbrPressureStatus, flowStatus, doStatus, phStatus, chlorineStatus, tempStatus].every(s => s === 'normal') ? 'operational' : 'attention'
    }
  }, [latestReport])

  if (!equipmentStats) {
    return <div>No data available</div>
  }

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'normal' || status === 'operational') {
      return <Badge className="bg-green-600">Operational</Badge>
    }
    return <Badge variant="outline" className="text-orange-600 border-orange-600">Needs Attention</Badge>
  }

  if (!detailed) {
    // Simple status view
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Overall Status</h3>
          <StatusBadge status={equipmentStats.overallStatus} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Lift Station Pressure</span>
            </div>
            <Progress value={latestReport.lsPressure * 50} className="h-2" />
            <p className="text-xs text-muted-foreground">{latestReport.lsPressure} mbar</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">MBR Pressure</span>
            </div>
            <Progress value={latestReport.mbrPressure * 40} className="h-2" />
            <p className="text-xs text-muted-foreground">{latestReport.mbrPressure} mbar</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Blower Temperature</span>
            </div>
            <Progress value={(latestReport.blowerTemp / 50) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">{latestReport.blowerTemp}°C</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Blower Hours</span>
            </div>
            <Progress value={(latestReport.blowerHours / 24) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">{latestReport.blowerHours} hrs</p>
          </div>
        </div>
      </div>
    )
  }

  // Detailed equipment status
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Lift Station */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Lift Station
          </CardTitle>
          <CardDescription>Pumping system status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Discharge Pressure</span>
              <StatusBadge status={equipmentStats.lsPressureStatus} />
            </div>
            <Progress value={latestReport.lsPressure * 50} />
            <p className="text-xs text-muted-foreground">{latestReport.lsPressure} mbar (Target: 1.0-2.0)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Discharge Flow</span>
              <StatusBadge status={equipmentStats.flowStatus} />
            </div>
            <Progress value={(latestReport.lsFlow / 40) * 100} />
            <p className="text-xs text-muted-foreground">{latestReport.lsFlow} m³/hr (Target: 31.25)</p>
          </div>
        </CardContent>
      </Card>

      {/* MBR System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            MBR System
          </CardTitle>
          <CardDescription>Membrane bioreactor status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Permeate Pressure</span>
              <StatusBadge status={equipmentStats.mbrPressureStatus} />
            </div>
            <Progress value={latestReport.mbrPressure * 40} />
            <p className="text-xs text-muted-foreground">{latestReport.mbrPressure} mbar</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Product pH</span>
              <StatusBadge status={equipmentStats.phStatus} />
            </div>
            <Progress value={(parseFloat(latestReport.mbrProductpH) / 8) * 100} />
            <p className="text-xs text-muted-foreground">{latestReport.mbrProductpH} (Target: 6.5-8.0)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Chlorine Level</span>
              <StatusBadge status={equipmentStats.chlorineStatus} />
            </div>
            <Progress value={(parseFloat(latestReport.mbrChlorine) / 150) * 100} />
            <p className="text-xs text-muted-foreground">{latestReport.mbrChlorine} ppm (Target: 125)</p>
          </div>
        </CardContent>
      </Card>

      {/* Air Blowers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5" />
            Air Blowers
          </CardTitle>
          <CardDescription>Aeration system status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Room Temperature</span>
              <StatusBadge status={equipmentStats.tempStatus} />
            </div>
            <Progress value={(latestReport.blowerTemp / 50) * 100} />
            <p className="text-xs text-muted-foreground">{latestReport.blowerTemp}°C (Max: 40°C)</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Operating Hours</span>
              <Badge variant="secondary">{latestReport.blowerHours} hrs</Badge>
            </div>
            <Progress value={(latestReport.blowerHours % 24 / 24) * 100} />
            <p className="text-xs text-muted-foreground">Daily runtime</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Aeration DO</span>
              <StatusBadge status={equipmentStats.doStatus} />
            </div>
            <Progress value={(parseFloat(latestReport.aerationDO) / 4) * 100} />
            <p className="text-xs text-muted-foreground">{latestReport.aerationDO} ppm (Target: 2-3)</p>
          </div>
        </CardContent>
      </Card>

      {/* Process Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Process Parameters
          </CardTitle>
          <CardDescription>Water quality indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Raw Sewage pH</span>
            <Badge variant={equipmentStats.phStatus === 'normal' ? 'default' : 'outline'}>
              {latestReport.rawSeagepH}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">MLSS Stream I</span>
            <Badge variant="secondary">{latestReport.mlssStream1} mg/L</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">MLSS Stream II</span>
            <Badge variant="secondary">{latestReport.mlssStream2} mg/L</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Actions */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Maintenance Actions</CardTitle>
          <CardDescription>Latest maintenance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {latestReport.maintenanceAction1 && (
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">{latestReport.maintenanceAction1}</span>
              </li>
            )}
            {latestReport.maintenanceAction2 && (
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">{latestReport.maintenanceAction2}</span>
              </li>
            )}
            {latestReport.maintenanceAction3 && (
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span className="text-sm">{latestReport.maintenanceAction3}</span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
