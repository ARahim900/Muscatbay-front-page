'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Package,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Filter,
  Download,
  Plus,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Truck,
  Tool
} from 'lucide-react'
import { PieChart as RePieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import Image from 'next/image'

import {
  mockAssets,
  mockMaintenanceSchedule,
  calculateAssetMetrics,
  Asset,
  AssetStatus,
  AssetCondition,
  AssetCategory,
  AssetType,
  MaintenanceType,
  Priority,
  ScheduleStatus
} from '@/data/alm-data'

export default function ALMDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const metrics = useMemo(() => calculateAssetMetrics(mockAssets), [])

  const filteredAssets = useMemo(() => {
    return mockAssets.filter(asset => {
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const statusDistribution = useMemo(() => {
    const distribution = mockAssets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(distribution).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: (count / mockAssets.length) * 100
    }))
  }, [])

  const categoryDistribution = useMemo(() => {
    const distribution = mockAssets.reduce((acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(distribution).map(([category, count]) => ({
      name: category,
      value: count
    }))
  }, [])

  const maintenanceTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      month,
      preventive: Math.floor(Math.random() * 20) + 10,
      corrective: Math.floor(Math.random() * 10) + 5,
      cost: Math.floor(Math.random() * 5000) + 2000
    }))
  }, [])

  const getStatusColor = (status: AssetStatus) => {
    switch (status) {
      case AssetStatus.OPERATIONAL: return 'bg-green-500'
      case AssetStatus.MAINTENANCE: return 'bg-yellow-500'
      case AssetStatus.REPAIR: return 'bg-orange-500'
      case AssetStatus.STANDBY: return 'bg-blue-500'
      case AssetStatus.DECOMMISSIONED: return 'bg-gray-500'
      case AssetStatus.DISPOSED: return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getConditionColor = (condition: AssetCondition) => {
    switch (condition) {
      case AssetCondition.EXCELLENT: return 'text-green-600'
      case AssetCondition.GOOD: return 'text-blue-600'
      case AssetCondition.FAIR: return 'text-yellow-600'
      case AssetCondition.POOR: return 'text-orange-600'
      case AssetCondition.CRITICAL: return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.LOW: return 'bg-blue-100 text-blue-700'
      case Priority.MEDIUM: return 'bg-yellow-100 text-yellow-700'
      case Priority.HIGH: return 'bg-orange-100 text-orange-700'
      case Priority.CRITICAL: return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScheduleStatusColor = (status: ScheduleStatus) => {
    switch (status) {
      case ScheduleStatus.SCHEDULED: return 'bg-blue-100 text-blue-700'
      case ScheduleStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-700'
      case ScheduleStatus.COMPLETED: return 'bg-green-100 text-green-700'
      case ScheduleStatus.OVERDUE: return 'bg-red-100 text-red-700'
      case ScheduleStatus.CANCELLED: return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-[#4E4456] text-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/images/muscat-bay-logo-mark.png"
                alt="Muscat Bay Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-semibold">MUSCAT BAY - ALM</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Reports
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assets Lifecycle Management</h1>
            <p className="text-gray-500 mt-1">Monitor and manage all facility assets throughout their lifecycle</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-[#4E4456] hover:bg-[#4E4456]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalAssets}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.operationalAssets} operational
              </p>
              <Progress value={(metrics.operationalAssets / metrics.totalAssets) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Current: ${metrics.depreciatedValue.toLocaleString()}
              </p>
              <Progress value={(metrics.depreciatedValue / metrics.totalValue) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.upcomingMaintenances}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.overdueMaintenances} overdue
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {metrics.maintenanceBacklog} in progress
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Assets</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.criticalAssets}</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
              <div className="flex gap-1 mt-2">
                <div className="h-2 w-full bg-red-500 rounded-full" style={{ width: `${(metrics.criticalAssets / metrics.totalAssets) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Asset Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RePieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Assets by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={categoryDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4E4456" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Upcoming Maintenance */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Maintenance</CardTitle>
                  <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockMaintenanceSchedule.slice(0, 4).map((schedule) => (
                      <div key={schedule.assetId} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{schedule.assetName}</p>
                          <p className="text-xs text-gray-500">{schedule.maintenanceType}</p>
                        </div>
                        <Badge className={getScheduleStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maintenance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Activity Trend</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={maintenanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="preventive" stroke="#3b82f6" name="Preventive" />
                    <Line yAxisId="left" type="monotone" dataKey="corrective" stroke="#ef4444" name="Corrective" />
                    <Bar yAxisId="right" dataKey="cost" fill="#10b981" name="Cost ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Inventory</CardTitle>
                <CardDescription>Manage and track all facility assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search assets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.values(AssetCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Assets Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Next Maintenance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.id}</TableCell>
                          <TableCell>{asset.name}</TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(asset.status)} text-white`}>
                              {asset.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={getConditionColor(asset.condition)}>
                              {asset.condition}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(asset.nextMaintenanceDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedAsset(asset)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{asset.name}</DialogTitle>
                                  <DialogDescription>
                                    Asset ID: {asset.id} | Serial: {asset.serialNumber}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {/* Asset Details */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">General Information</h4>
                                      <dl className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Type:</dt>
                                          <dd>{asset.type}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Category:</dt>
                                          <dd>{asset.category}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Manufacturer:</dt>
                                          <dd>{asset.manufacturer}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Model:</dt>
                                          <dd>{asset.model}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Location:</dt>
                                          <dd>{asset.location}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Zone:</dt>
                                          <dd>{asset.zone}</dd>
                                        </div>
                                      </dl>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Financial Information</h4>
                                      <dl className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Purchase Date:</dt>
                                          <dd>{new Date(asset.purchaseDate).toLocaleDateString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Purchase Value:</dt>
                                          <dd>${asset.purchaseValue.toLocaleString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Current Value:</dt>
                                          <dd>${asset.currentValue.toLocaleString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Depreciation Rate:</dt>
                                          <dd>{asset.depreciationRate}% per year</dd>
                                        </div>
                                        <div className="flex justify-between">
                                          <dt className="text-gray-500">Warranty Expiry:</dt>
                                          <dd>{new Date(asset.warrantyExpiry).toLocaleDateString()}</dd>
                                        </div>
                                      </dl>
                                    </div>
                                  </div>

                                  {/* Performance Metrics */}
                                  <div>
                                    <h4 className="font-semibold mb-2">Performance Metrics</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-bold">{asset.utilizationRate}%</p>
                                        <p className="text-sm text-gray-500">Utilization Rate</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-2xl font-bold">{asset.operatingHours.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">Operating Hours</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-2xl font-bold">{asset.lifecycleStage}</p>
                                        <p className="text-sm text-gray-500">Lifecycle Stage</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Maintenance History */}
                                  <div>
                                    <h4 className="font-semibold mb-2">Recent Maintenance History</h4>
                                    <div className="space-y-2">
                                      {asset.maintenanceHistory.slice(0, 3).map((record) => (
                                        <div key={record.id} className="border rounded-lg p-3">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <p className="font-medium">{record.type}</p>
                                              <p className="text-sm text-gray-500">{record.description}</p>
                                              <p className="text-xs text-gray-400 mt-1">
                                                {new Date(record.date).toLocaleDateString()} - {record.technician}
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-medium">${record.cost}</p>
                                              <p className="text-xs text-gray-500">{record.duration} hours</p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2">
                                    <Button className="flex-1">
                                      <Wrench className="mr-2 h-4 w-4" />
                                      Schedule Maintenance
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <FileText className="mr-2 h-4 w-4" />
                                      View Documents
                                    </Button>
                                    <Button variant="outline">
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Upcoming and ongoing maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMaintenanceSchedule.map((schedule) => (
                    <div key={`${schedule.assetId}-${schedule.scheduledDate}`} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{schedule.assetName}</h4>
                          <p className="text-sm text-gray-500">
                            {schedule.maintenanceType} • Scheduled: {new Date(schedule.scheduledDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Team: {schedule.assignedTeam} • Duration: {schedule.estimatedDuration} hours
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(schedule.priority)}>
                            {schedule.priority}
                          </Badge>
                          <Badge className={getScheduleStatusColor(schedule.status)}>
                            {schedule.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Utilization by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4E4456" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Cost Analysis</CardTitle>
                  <CardDescription>Monthly maintenance expenditure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">${metrics.monthlyMaintenanceCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Average Monthly Cost</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Preventive Maintenance</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-sm">Corrective Maintenance</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-sm">Emergency Repairs</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
