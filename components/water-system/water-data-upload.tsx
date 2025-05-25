'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { CSVLoader } from '@/lib/csv-loader'
import { WaterMeterData } from '@/lib/water-data-utils'

interface WaterDataUploadProps {
  onDataLoaded: (data: WaterMeterData[]) => void;
}

export function WaterDataUpload({ onDataLoaded }: WaterDataUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; rows: number } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Check if it's a CSV file
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file');
      }

      // Load and parse the CSV
      const data = await CSVLoader.loadFromFile(file);
      
      if (data.length === 0) {
        throw new Error('No valid data found in the CSV file');
      }

      // Update file info
      setFileInfo({
        name: file.name,
        rows: data.length
      });

      // Pass the data to parent component
      onDataLoaded(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load CSV file');
    } finally {
      setLoading(false);
    }
  };

  const loadFromPublicDirectory = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Try to load from public directory
      const data = await CSVLoader.loadFromURL('/data/water/Master WA DB TableMaster WA 24  25 Apr.csv');
      
      if (data.length === 0) {
        throw new Error('No data found in the CSV file');
      }

      setFileInfo({
        name: 'Master WA DB TableMaster WA 24  25 Apr.csv',
        rows: data.length
      });

      onDataLoaded(data);
      setSuccess(true);
    } catch (err) {
      setError('Failed to load CSV from public directory. Please ensure the file is placed in /public/data/water/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Data Source</CardTitle>
        <CardDescription>
          Upload your water meter CSV file or load from the server
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Option */}
        <div className="space-y-2">
          <label htmlFor="csv-upload" className="text-sm font-medium">
            Upload CSV File
          </label>
          <div className="flex items-center gap-4">
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={loading}
              className="cursor-pointer"
            />
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Server Load Option */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          onClick={loadFromPublicDirectory}
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          <FileText className="mr-2 h-4 w-4" />
          Load from Server Directory
        </Button>

        {/* Status Messages */}
        {loading && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Loading CSV data...</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && fileInfo && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Successfully loaded {fileInfo.rows} rows from {fileInfo.name}
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <div className="mt-4 p-4 bg-muted rounded-lg text-sm space-y-2">
          <p className="font-medium">CSV File Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Must contain columns: Meter Label, Acct #, Zone, Type, Parent Meter, Label</li>
            <li>Month columns should be in format: Jan-24, Feb-24, etc.</li>
            <li>Label column should contain: L1, L2, L3, or DC</li>
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            For server loading, place your CSV file in: <code className="bg-background px-1 py-0.5 rounded">/public/data/water/</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}