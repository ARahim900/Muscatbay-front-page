"use client"

import { useEffect } from "react"
import { ChartComponent } from "./chart-component"

interface ChartsProps {
  categoryData: any
  trendData: any
  topConsumersData: any
}

export function Charts({ categoryData, trendData, topConsumersData }: ChartsProps) {
  useEffect(() => {
    // Initialize charts when data is available
  }, [categoryData, trendData, topConsumersData])

  if (!categoryData || !trendData || !topConsumersData) {
    return <div className="text-center py-8">Loading charts...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-[300px]">
        <ChartComponent
          id="categoryDistribution"
          type="pie"
          data={categoryData}
          options={{
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
                  label: (context: any) => {
                    const label = context.label || ""
                    const value = context.raw || 0
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
                    const percentage = Math.round((value / total) * 100)
                    return `${label}: ${value.toLocaleString()} kWh (${percentage}%)`
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="h-[300px]">
        <ChartComponent
          id="monthlyTrend"
          type="line"
          data={trendData}
          options={{
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
                  label: (context: any) => {
                    const label = context.dataset.label || ""
                    const value = context.raw || 0
                    return `${label}: ${value.toLocaleString()} kWh`
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="h-[300px] lg:col-span-2">
        <ChartComponent
          id="topConsumers"
          type="bar"
          data={topConsumersData}
          options={{
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
                  label: (context: any) => {
                    const label = context.dataset.label || ""
                    const value = context.raw || 0
                    return `${label}: ${value.toLocaleString()} kWh`
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}
