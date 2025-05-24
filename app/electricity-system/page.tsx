"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Zap, TrendingUp, Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ElectricityCharts } from "./electricity-charts"

// Electricity consumption data
const electricityData = [
  // Pumping Stations
  {
    id: 1,
    category: "Pumping Stations",
    name: "Pumping Station 01",
    meterAccount: "R52330",
    nov24: 1629,
    dec24: 1640,
    jan25: 1903,
    feb25: 2095,
    mar25: 3032,
    apr25: 3940,
  },
  {
    id: 2,
    category: "Pumping Stations",
    name: "Pumping Station 03",
    meterAccount: "R52329",
    nov24: 0,
    dec24: 179,
    jan25: 32.5,
    feb25: 137.2,
    mar25: 130.7,
    apr25: 276.6,
  },
  {
    id: 3,
    category: "Pumping Stations",
    name: "Pumping Station 04",
    meterAccount: "R52327",
    nov24: 919,
    dec24: 921,
    jan25: 245.1,
    feb25: 869.5,
    mar25: 646.1,
    apr25: 984.9,
  },
  {
    id: 4,
    category: "Pumping Stations",
    name: "Pumping Station 05",
    meterAccount: "R52325",
    nov24: 2599,
    dec24: 1952,
    jan25: 2069,
    feb25: 2521,
    mar25: 2601,
    apr25: 3317,
  },

  // Lifting Stations
  {
    id: 5,
    category: "Lifting Stations",
    name: "Lifting Station 02",
    meterAccount: "R52328",
    nov24: 0,
    dec24: 0,
    jan25: 0,
    feb25: 0,
    mar25: 0,
    apr25: 0,
  },
  {
    id: 6,
    category: "Lifting Stations",
    name: "Lifting Station 03",
    meterAccount: "R52333",
    nov24: 91,
    dec24: 185,
    jan25: 28,
    feb25: 40,
    mar25: 58,
    apr25: 83,
  },
  {
    id: 7,
    category: "Lifting Stations",
    name: "Lifting Station 04",
    meterAccount: "R52324",
    nov24: 686,
    dec24: 631,
    jan25: 701,
    feb25: 638,
    mar25: 572,
    apr25: 750.22,
  },
  {
    id: 8,
    category: "Lifting Stations",
    name: "Lifting Station 05",
    meterAccount: "R52332",
    nov24: 2413,
    dec24: 2643,
    jan25: 2873,
    feb25: 3665,
    mar25: 3069,
    apr25: 4201.4,
  },

  // Irrigation Tanks
  {
    id: 9,
    category: "Irrigation Tanks",
    name: "Irrigation Tank 01",
    meterAccount: "R52324 (R52326)",
    nov24: 1432,
    dec24: 1268,
    jan25: 1689,
    feb25: 2214,
    mar25: 1718,
    apr25: 1663,
  },
  {
    id: 10,
    category: "Irrigation Tanks",
    name: "Irrigation Tank 02",
    meterAccount: "R52331",
    nov24: 974,
    dec24: 1026,
    jan25: 983,
    feb25: 1124,
    mar25: 1110,
    apr25: 1830,
  },
  {
    id: 11,
    category: "Irrigation Tanks",
    name: "Irrigation Tank 03",
    meterAccount: "R52323",
    nov24: 269,
    dec24: 417,
    jan25: 840,
    feb25: 1009,
    mar25: 845,
    apr25: 1205,
  },
  {
    id: 12,
    category: "Irrigation Tanks",
    name: "Irrigation Tank 04",
    meterAccount: "R53195",
    nov24: 212,
    dec24: 213,
    jan25: 39.7,
    feb25: 233.2,
    mar25: 234.9,
    apr25: 447.2,
  },

  // Street Lights
  {
    id: 19,
    category: "Street Lights",
    name: "Street Light FP 01 (Z8)",
    meterAccount: "R53197",
    nov24: 3593,
    dec24: 3147,
    jan25: 787,
    feb25: 3228,
    mar25: 2663,
    apr25: 3230,
  },
  {
    id: 20,
    category: "Street Lights",
    name: "Street Light FP 02",
    meterAccount: "R51906",
    nov24: 2361,
    dec24: 2258,
    jan25: 633,
    feb25: 2298,
    mar25: 1812,
    apr25: 2153,
  },
  {
    id: 21,
    category: "Street Lights",
    name: "Street Light FP 03",
    meterAccount: "R51905",
    nov24: 2060,
    dec24: 1966,
    jan25: 1868,
    feb25: 1974,
    mar25: 1562,
    apr25: 1847,
  },
  {
    id: 22,
    category: "Street Lights",
    name: "Street Light FP 04",
    meterAccount: "R51908",
    nov24: 2299,
    dec24: 1389,
    jan25: 325,
    feb25: 1406,
    mar25: 1401,
    apr25: 2412.9,
  },
  {
    id: 23,
    category: "Street Lights",
    name: "Street Light FP 05",
    meterAccount: "R51902",
    nov24: 1477,
    dec24: 1121,
    jan25: 449,
    feb25: 2069.9,
    mar25: 1870.1,
    apr25: 3233,
  },

  // Beach Well
  {
    id: 24,
    category: "Beach Well",
    name: "Beach Well",
    meterAccount: "R51903",
    nov24: 24383,
    dec24: 37236,
    jan25: 38168,
    feb25: 18422,
    mar25: 40,
    apr25: 27749,
  },

  // Actuator DBs
  {
    id: 13,
    category: "Actuator DBs",
    name: "Actuator DB 01 (Z8)",
    meterAccount: "R53196",
    nov24: 34,
    dec24: 29,
    jan25: 7.3,
    feb25: 27.7,
    mar25: 24.4,
    apr25: 27.1,
  },
  {
    id: 14,
    category: "Actuator DBs",
    name: "Actuator DB 02",
    meterAccount: "R51900",
    nov24: 232,
    dec24: 161,
    jan25: 33,
    feb25: 134,
    mar25: 138.5,
    apr25: 211,
  },
  {
    id: 15,
    category: "Actuator DBs",
    name: "Actuator DB 03",
    meterAccount: "R51904",
    nov24: 220,
    dec24: 199,
    jan25: 55.7,
    feb25: 203.3,
    mar25: 196,
    apr25: 211.6,
  },
  {
    id: 16,
    category: "Actuator DBs",
    name: "Actuator DB 04",
    meterAccount: "R51901",
    nov24: 172,
    dec24: 173,
    jan25: 186,
    feb25: 161,
    mar25: 227,
    apr25: 253,
  },
  {
    id: 17,
    category: "Actuator DBs",
    name: "Actuator DB 05",
    meterAccount: "R51907",
    nov24: 18,
    dec24: 16,
    jan25: 4.2,
    feb25: 17.8,
    mar25: 14,
    apr25: 17.7,
  },
  {
    id: 18,
    category: "Actuator DBs",
    name: "Actuator DB 06",
    meterAccount: "R51909",
    nov24: 49,
    dec24: 44,
    jan25: 47,
    feb25: 45,
    mar25: 38,
    apr25: 46.9,
  },
]

const PRICE_PER_KWH = 0.025 // 0.025 MR per kWh
const MONTHS = ["nov24", "dec24", "jan25", "feb25", "mar25", "apr25"]
const MONTH_LABELS = ["Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025"]

export default function ElectricitySystem() {
  const [selectedMonth, setSelectedMonth] = useState("apr25")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories
  const categories = Array.from(new Set(electricityData.map((item) => item.category)))

  // Filter data by category
  const getFilteredData = () => {
    if (selectedCategory === "all") {
      return electricityData
    }
    return electricityData.filter((item) => item.category === selectedCategory)
  }

  // Calculate category totals for the selected month
  const getCategoryTotals = () => {
    const totals: Record<string, number> = {}

    categories.forEach((category) => {
      const categoryItems = electricityData.filter((item) => item.category === category)
      const total = categoryItems.reduce(
        (sum, item) => sum + ((item[selectedMonth as keyof typeof item] as number) || 0),
        0,
      )
      totals[category] = total
    })

    return totals
  }

  // Calculate monthly trends for a category
  const getCategoryTrends = (category: string) => {
    const items = category === "all" ? electricityData : electricityData.filter((item) => item.category === category)

    return MONTHS.map((month) => {
      return items.reduce((sum, item) => sum + ((item[month as keyof typeof item] as number) || 0), 0)
    })
  }

  // Get top consumers for the selected month
  const getTopConsumers = () => {
    return [...electricityData]
      .sort((a, b) => (b[selectedMonth as keyof typeof b] as number) - (a[selectedMonth as keyof typeof a] as number))
      .slice(0, 5)
  }

  // Prepare chart data
  const categoryTotals = getCategoryTotals()
  const categoryData = {
    labels: Object.keys(categoryTotals),
    values: Object.values(categoryTotals),
  }

  const trendData = {
    labels: MONTH_LABELS,
    values: getCategoryTrends(selectedCategory),
    category: selectedCategory === "all" ? "All Categories" : selectedCategory,
  }

  const topConsumers = getTopConsumers()
  const topConsumersData = {
    labels: topConsumers.map((item) => item.name),
    values: topConsumers.map((item) => item[selectedMonth as keyof typeof item] as number),
    month: MONTH_LABELS[MONTHS.indexOf(selectedMonth)],
  }

  // Calculate total consumption for the selected month
  const getTotalConsumption = () => {
    return electricityData.reduce((sum, item) => sum + ((item[selectedMonth as keyof typeof item] as number) || 0), 0)
  }

  // Calculate total cost for the selected month
  const getTotalCost = () => {
    return getTotalConsumption() * PRICE_PER_KWH
  }

  return (
    <div className="flex min-h-screen flex-col">
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
            <span className="text-lg font-semibold">MUSCAT BAY</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="flex items-center text-sm font-medium hover:underline sm:text-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4E4456] text-white">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#4E4456]">Electricity System</h1>
                <p className="text-gray-500">Monitor and analyze infrastructure power consumption</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Month</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((month, index) => (
                          <SelectItem key={month} value={month}>
                            {MONTH_LABELS[index]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Consumption</p>
                    <p className="text-2xl font-bold">{getTotalConsumption().toLocaleString()} kWh</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="text-2xl font-bold">{getTotalCost().toFixed(3)} MR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualizations */}
          <div className="mb-8">
            <ElectricityCharts categoryData={categoryData} trendData={trendData} topConsumersData={topConsumersData} />
          </div>

          {/* Tabbed Data View */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pumping">Pumping Stations</TabsTrigger>
              <TabsTrigger value="lifting">Lifting Stations</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation Tanks</TabsTrigger>
              <TabsTrigger value="streetlights">Street Lights</TabsTrigger>
              <TabsTrigger value="beachwell">Beach Well</TabsTrigger>
            </TabsList>

            {/* All Categories Tab */}
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Infrastructure Systems</CardTitle>
                  <CardDescription>Complete overview of all electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Category</th>
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 text-xs font-medium bg-gray-50">{item.category}</td>
                            <td className="p-2 font-medium">{item.name}</td>
                            <td className="p-2 text-gray-600">{item.meterAccount}</td>
                            <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                            <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                            <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                            <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                            <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                            <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                            <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Pumping Stations Tab */}
            <TabsContent value="pumping">
              <Card>
                <CardHeader>
                  <CardTitle>Pumping Stations</CardTitle>
                  <CardDescription>Water pumping stations electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData
                          .filter((item) => item.category === "Pumping Stations")
                          .map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="p-2 text-gray-600">{item.meterAccount}</td>
                              <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                              <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lifting Stations Tab */}
            <TabsContent value="lifting">
              <Card>
                <CardHeader>
                  <CardTitle>Lifting Stations</CardTitle>
                  <CardDescription>Water lifting stations electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData
                          .filter((item) => item.category === "Lifting Stations")
                          .map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="p-2 text-gray-600">{item.meterAccount}</td>
                              <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                              <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Irrigation Tanks Tab */}
            <TabsContent value="irrigation">
              <Card>
                <CardHeader>
                  <CardTitle>Irrigation Tanks</CardTitle>
                  <CardDescription>Irrigation system electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData
                          .filter((item) => item.category === "Irrigation Tanks")
                          .map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="p-2 text-gray-600">{item.meterAccount}</td>
                              <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                              <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Street Lights Tab */}
            <TabsContent value="streetlights">
              <Card>
                <CardHeader>
                  <CardTitle>Street Lights</CardTitle>
                  <CardDescription>Street lighting electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData
                          .filter((item) => item.category === "Street Lights")
                          .map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="p-2 text-gray-600">{item.meterAccount}</td>
                              <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                              <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Beach Well Tab */}
            <TabsContent value="beachwell">
              <Card>
                <CardHeader>
                  <CardTitle>Beach Well</CardTitle>
                  <CardDescription>Beach well electricity consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">System</th>
                          <th className="text-left p-2">Meter Account</th>
                          <th className="text-right p-2">Nov 2024</th>
                          <th className="text-right p-2">Dec 2024</th>
                          <th className="text-right p-2">Jan 2025</th>
                          <th className="text-right p-2">Feb 2025</th>
                          <th className="text-right p-2">Mar 2025</th>
                          <th className="text-right p-2">Apr 2025</th>
                          <th className="text-right p-2">Cost (MR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {electricityData
                          .filter((item) => item.category === "Beach Well")
                          .map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="p-2 text-gray-600">{item.meterAccount}</td>
                              <td className="p-2 text-right">{item.nov24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.dec24.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.jan25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.feb25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.mar25.toLocaleString()}</td>
                              <td className="p-2 text-right">{item.apr25.toLocaleString()}</td>
                              <td className="p-2 text-right font-medium">{(item.apr25 * PRICE_PER_KWH).toFixed(3)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
