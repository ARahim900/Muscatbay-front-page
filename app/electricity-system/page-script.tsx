"use client"

import { useEffect } from "react"
import Chart from "chart.js/auto"

export function ElectricitySystemCharts() {
  useEffect(() => {
    // Load Chart.js and initialize charts
    const initCharts = async () => {
      // Category Distribution Chart
      const categoryCtx = document.getElementById("categoryDistribution") as HTMLCanvasElement
      if (categoryCtx) {
        new Chart(categoryCtx, {
          type: "pie",
          data: {
            labels: [
              "Pumping Stations",
              "Lifting Stations",
              "Irrigation Tanks",
              "Street Lights",
              "Beach Well",
              "Actuator DBs",
            ],
            datasets: [
              {
                data: [8518.5, 5034.62, 5145.2, 12875.9, 27749, 767.3],
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
                    const total = context.dataset.data.reduce((a, b) => a + b, 0)
                    const percentage = Math.round((value / total) * 100)
                    return `${label}: ${value.toLocaleString()} kWh (${percentage}%)`
                  },
                },
              },
            },
          },
        })
      }

      // Monthly Trend Chart
      const trendCtx = document.getElementById("monthlyTrend") as HTMLCanvasElement
      if (trendCtx) {
        new Chart(trendCtx, {
          type: "line",
          data: {
            labels: ["Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025"],
            datasets: [
              {
                label: "All Categories",
                data: [46147, 59613, 53982, 42977, 21941, 60090.52],
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
          },
        })
      }

      // Top Consumers Chart
      const topConsumersCtx = document.getElementById("topConsumers") as HTMLCanvasElement
      if (topConsumersCtx) {
        new Chart(topConsumersCtx, {
          type: "bar",
          data: {
            labels: [
              "Beach Well",
              "Lifting Station 05",
              "Pumping Station 01",
              "Street Light FP 05",
              "Street Light FP 01",
            ],
            datasets: [
              {
                label: "April 2025",
                data: [27749, 4201.4, 3940, 3233, 3230],
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
          },
        })
      }
    }

    // Initialize charts
    initCharts()

    // Cleanup function
    return () => {
      // Destroy charts when component unmounts
      Chart.getChart("categoryDistribution")?.destroy()
      Chart.getChart("monthlyTrend")?.destroy()
      Chart.getChart("topConsumers")?.destroy()
    }
  }, [])

  return null
}
