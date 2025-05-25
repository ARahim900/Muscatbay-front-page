'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WaterOverview } from '@/components/water-system/water-overview'
import { WaterGroupDetails } from '@/components/water-system/water-group-details'
import { WaterDataUpload } from '@/components/water-system/water-data-upload'
import { loadWaterData } from '@/data/water-data-loader'
import { CSVLoader } from '@/lib/csv-loader'
import { WaterMeterData } from '@/lib/water-data-utils'
import { Droplets, BarChart3, Building2, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function WaterSystemPage() {
  const [waterData, setWaterData] = useState<WaterMeterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dataSource, setDataSource] = useState<'sample' | 'uploaded'>('sample');
  const [isDataDialogOpen, setIsDataDialogOpen] = useState(false);

  useEffect(() => {
    async function loadDefaultData() {
      try {
        // Try to load from public directory first
        try {
          const data = await CSVLoader.loadFromURL('/data/water/Master WA DB TableMaster WA 24  25 Apr.csv');
          if (data.length > 0) {
            setWaterData(data);
            setDataSource('uploaded');
          } else {
            throw new Error('No data in CSV');
          }
        } catch (csvError) {
          // If CSV loading fails, fall back to sample data
          console.log('CSV not found in public directory, loading sample data');
          const sampleData = await loadWaterData();
          setWaterData(sampleData);
          setDataSource('sample');
        }
      } catch (error) {
        console.error('Error loading water data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDefaultData();
  }, []);

  const handleDataUpload = (data: WaterMeterData[]) => {
    setWaterData(data);
    setDataSource('uploaded');
    setIsDataDialogOpen(false);
  };

  const loadSampleData = async () => {
    setLoading(true);
    try {
      const data = await loadWaterData();
      setWaterData(data);
      setDataSource('sample');
      setIsDataDialogOpen(false);
    } catch (error) {
      console.error('Error loading sample data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Droplets className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Water System Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Currently using: {dataSource === 'sample' ? 'Sample Data' : 'Uploaded CSV Data'} 
              ({waterData.length} meters)
            </p>
          </div>
        </div>
        
        {/* Data Source Button */}
        <Dialog open={isDataDialogOpen} onOpenChange={setIsDataDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Data Source
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Water System Data Source</DialogTitle>
              <DialogDescription>
                Choose your data source or upload a new CSV file
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <WaterDataUpload onDataLoaded={handleDataUpload} />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              
              <Button onClick={loadSampleData} variant="secondary" className="w-full">
                Load Sample Data
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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