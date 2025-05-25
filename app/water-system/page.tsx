'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WaterOverview } from '@/components/water-system/water-overview'
import { WaterGroupDetails } from '@/components/water-system/water-group-details'
import { loadWaterData } from '@/data/water-data-loader'
import { WaterMeterData } from '@/lib/water-data-utils'
import { Droplets, BarChart3, Building2 } from 'lucide-react'

export default function WaterSystemPage() {
  const [waterData, setWaterData] = useState<WaterMeterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadWaterData();
        setWaterData(data);
      } catch (error) {
        console.error('Error loading water data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Droplets className="h-12 w-12 animate-pulse text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading water system data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Droplets className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Water System Management</h1>
      </div>

      {/* Sub-navigation using Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="group-details" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Group Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <WaterOverview waterData={waterData} />
        </TabsContent>

        <TabsContent value="group-details" className="mt-6">
          <WaterGroupDetails waterData={waterData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}