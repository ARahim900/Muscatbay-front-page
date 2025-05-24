'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, User, Droplets, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { stpReportsData } from '@/data/stp-reports-data'

export default function STPReportDetail() {
  const params = useParams()
  const reportId = parseInt(params.id as string)
  
  const report = stpReportsData.find(r => r.id === reportId)

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Report Not Found</CardTitle>
            <CardDescription>
              The report with ID {reportId} was not found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/stp-plant">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to STP Reports
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate efficiency
  const efficiency = Math.round((report.irrigationOutput / report.totalTreatedWater) * 100)
  const hasIssues = report.leaksOrSpills || report.unusualOdors || report.safetyHazards

  // Export report
  const handleExport = () => {
    const reportText = `STP Daily Operation Report
========================
Date: ${report.date}
Prepared By: ${report.preparedBy}
Email: ${report.email}

Production Summary
------------------
Total Treated Water: ${report.totalTreatedWater} m³
Irrigation Output: ${report.irrigationOutput} m³
Inlet Sewage: ${report.inletSewage} m³
Efficiency: ${efficiency}%

Tanker Operations
-----------------
Number of Tankers: ${report.tankers}
Expected Volume: ${report.expectedTankerVolume} m³
Direct Inline Sewage: ${report.directInlineSewage} m³

Process Parameters
------------------
Raw Sewage Flow: ${report.rawSewageFlow}
Aeration DO: ${report.aerationDO} ppm
Raw Sewage pH: ${report.rawSeagepH}
MBR Product pH: ${report.mbrProductpH}
MBR Chlorine: ${report.mbrChlorine} ppm
MLSS Stream I: ${report.mlssStream1} mg/L
MLSS Stream II: ${report.mlssStream2} mg/L

Equipment Status
----------------
LS Pressure: ${report.lsPressure} mbar
LS Flow: ${report.lsFlow} m³/hr
MBR Pressure: ${report.mbrPressure} mbar
MBR Flow: ${report.mbrFlow} m³/hr
Blower Hours: ${report.blowerHours} hrs
Blower Temperature: ${report.blowerTemp}°C

Issues Reported
---------------
Leaks/Spills: ${report.leaksOrSpills ? 'Yes' : 'No'}
Unusual Odors: ${report.unusualOdors ? 'Yes' : 'No'}
Safety Hazards: ${report.safetyHazards ? 'Yes' : 'No'}

Maintenance Actions
-------------------
1. ${report.maintenanceAction1 || 'None'}
2. ${report.maintenanceAction2 || 'None'}
3. ${report.maintenanceAction3 || 'None'}`

    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stp-report-${report.date.replace(/\//g, '-')}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center px-4">
          <Link href="/stp-plant" className="flex items-center gap-2 text-[#4E4456] hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Reports</span>
          </Link>
          <h1 className="ml-8 text-xl font-bold text-[#4E4456]">STP Report Details</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Report Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#4E4456] mb-2">
                Daily Operation Report
              </h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {report.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {report.preparedBy}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Report #{report.id}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={hasIssues ? 'bg-orange-600' : 'bg-green-600'}>
                {hasIssues ? 'Issues Reported' : 'No Issues'}
              </Badge>
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treated Water</CardTitle>
              <Droplets className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.totalTreatedWater} m³</div>
              <p className="text-xs text-muted-foreground">Total production</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Irrigation Output</CardTitle>
              <Droplets className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.irrigationOutput} m³</div>
              <p className="text-xs text-muted-foreground">TSE to irrigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{efficiency}%</div>
              <p className="text-xs text-muted-foreground">Output/Input ratio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tankers</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.tankers}</div>
              <p className="text-xs text-muted-foreground">{report.expectedTankerVolume} m³ total</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="parameters" className="space-y-4">
          <TabsList>
            <TabsTrigger value="parameters">Process Parameters</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Status</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="issues">Issues & Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Parameters</CardTitle>
                <CardDescription>Process control parameters and measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Flow Measurements</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Raw Sewage Flow</dt>
                        <dd className="text-sm font-medium">{report.rawSewageFlow}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">LS Discharge Flow</dt>
                        <dd className="text-sm font-medium">{report.lsFlow} m³/hr</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">MBR Flow</dt>
                        <dd className="text-sm font-medium">{report.mbrFlow} m³/hr</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Chemical Parameters</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Aeration DO</dt>
                        <dd className="text-sm font-medium">{report.aerationDO} ppm</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Raw Sewage pH</dt>
                        <dd className="text-sm font-medium">{report.rawSeagepH}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">MBR Product pH</dt>
                        <dd className="text-sm font-medium">{report.mbrProductpH}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">MBR Chlorine</dt>
                        <dd className="text-sm font-medium">{report.mbrChlorine} ppm</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-3">MLSS Concentrations</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Stream I</dt>
                      <dd className="text-sm font-medium">{report.mlssStream1} mg/L</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Stream II</dt>
                      <dd className="text-sm font-medium">{report.mlssStream2} mg/L</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Operating Status</CardTitle>
                <CardDescription>Current status of all major equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Lift Station</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Discharge Pressure</dt>
                        <dd className="text-sm font-medium">{report.lsPressure} mbar</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Discharge Flow</dt>
                        <dd className="text-sm font-medium">{report.lsFlow} m³/hr</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">MBR System</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Permeate Pressure</dt>
                        <dd className="text-sm font-medium">{report.mbrPressure} mbar</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Permeate Flow</dt>
                        <dd className="text-sm font-medium">{report.mbrFlow} m³/hr</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-3">Air Blowers</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Operating Hours</dt>
                      <dd className="text-sm font-medium">{report.blowerHours} hours</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Room Temperature</dt>
                      <dd className="text-sm font-medium">{report.blowerTemp}°C</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Activities</CardTitle>
                <CardDescription>Maintenance actions performed during this shift</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {report.maintenanceAction1 && (
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">1</Badge>
                      <span>{report.maintenanceAction1}</span>
                    </li>
                  )}
                  {report.maintenanceAction2 && (
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">2</Badge>
                      <span>{report.maintenanceAction2}</span>
                    </li>
                  )}
                  {report.maintenanceAction3 && (
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">3</Badge>
                      <span>{report.maintenanceAction3}</span>
                    </li>
                  )}
                  {!report.maintenanceAction1 && !report.maintenanceAction2 && !report.maintenanceAction3 && (
                    <li className="text-muted-foreground">No maintenance actions reported</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Issues & Safety Report</CardTitle>
                <CardDescription>Reported issues and safety concerns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Leaks or Spills</span>
                  </div>
                  <Badge variant={report.leaksOrSpills ? 'destructive' : 'secondary'}>
                    {report.leaksOrSpills ? 'Reported' : 'None'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Unusual Odors</span>
                  </div>
                  <Badge variant={report.unusualOdors ? 'destructive' : 'secondary'}>
                    {report.unusualOdors ? 'Detected' : 'None'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Safety Hazards</span>
                  </div>
                  <Badge variant={report.safetyHazards ? 'destructive' : 'secondary'}>
                    {report.safetyHazards ? 'Identified' : 'None'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
