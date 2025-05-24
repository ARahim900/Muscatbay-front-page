"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { PieChart, BarChart3, LineChart } from "lucide-react"

interface ElectricityChartsProps {
  categoryData: {
    labels: string[]
    values: number[]
  }
  trendData: {
    labels: string[]
    values: number[]
    category: string
  }
  topConsumersData: {
    labels: string[]
    values: number[]
    month: string
  }
}

export function ElectricityCharts({ categoryData, trendData, topConsumersData }: ElectricityChartsProps) {
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)
  const barChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Dynamically import Chart.js only on the client side
    const initCharts = async () => {
      const {
        Chart,
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        LineController,
        BarController,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend,
      } = await import("chart.js")

      // Register Chart.js components
      Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        LineController,
        BarController,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend,
      )

      // Create pie chart
      if (pieChartRef.current) {
        const ctx = pieChartRef.current.getContext("2d")
        if (ctx) {
          new Chart(ctx, {
            type: "pie",
            data: {
              labels: categoryData.labels,
              datasets: [
                {
                  data: categoryData.values,
                  backgroundColor: ["#4E4456", "#6A8EAE", "#60A5FA", "#34D399", "#F59E0B", "#8B5CF6"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    boxWidth: 15,
                    font: {
                      size: 11,
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || ""
                      const value = context.raw || 0
                      const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0)
                      const percentage = Math.round((value / total) * 100)
                      return `${label}: ${value.toLocaleString()} kWh (${percentage}%)`
                    },
                  },
                },
              },
            },
          })
        }
      }

      // Create line chart
      if (lineChartRef.current) {
        const ctx = lineChartRef.current.getContext("2d")
        if (ctx) {
          new Chart(ctx, {
            type: "line",
            data: {
              labels: trendData.labels,
              datasets: [
                {
                  label: trendData.category,
                  data: trendData.values,
                  borderColor: "#4E4456",
                  backgroundColor: "rgba(78, 68, 86, 0.2)",
                  tension: 0.3,
                  fill: true,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Consumption (kWh)",
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || ""
                      const value = context.raw || 0
                      return `${label}: ${value.toLocaleString()} kWh`
                    },
                  },
                },
              },
            },
          })
        }
      }

      // Create bar chart
      if (barChartRef.current) {
        const ctx = barChartRef.current.getContext("2d")
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: topConsumersData.labels,
              datasets: [
                {
                  label: topConsumersData.month,
                  data: topConsumersData.values,
                  backgroundColor: "#4E4456",
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y",
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Consumption (kWh)",
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || ""
                      const value = context.raw || 0
                      return `${label}: ${value.toLocaleString()} kWh`
                    },
                  },
                },
              },
            },
          })
        }
      }
    }

    initCharts()

    // Cleanup function
    return () => {
      // Chart cleanup will happen automatically with the component unmount
    }
  }, [categoryData, trendData, topConsumersData])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Category Distribution
          </CardTitle>
          <CardDescription>Power consumption by category</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] relative">
          <canvas ref={pieChartRef} height="300"></canvas>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Shows the proportion of electricity used by each category
        </CardFooter>
      </Card>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Monthly Consumption Trend
          </CardTitle>
          <CardDescription>{trendData.category} consumption over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] relative">
          <canvas ref={lineChartRef} height="300"></canvas>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Shows how consumption has changed over the past 6 months
        </CardFooter>
      </Card>

      {/* Top Consumers Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Top Consumers
          </CardTitle>
          <CardDescription>Highest electricity consumers for {topConsumersData.month}</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] relative">
          <canvas ref={barChartRef} height="300"></canvas>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">Identifies the systems using the most electricity</CardFooter>
      </Card>
    </div>
  )
}
