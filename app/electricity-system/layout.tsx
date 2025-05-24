import type React from "react"
import { ElectricitySystemCharts } from "./page-script"

export default function ElectricitySystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ElectricitySystemCharts />
    </>
  )
}
