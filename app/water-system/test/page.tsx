'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function WaterSystemTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toISOString()}: ${result}`]);
  };

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Basic rendering
      addResult('✅ Basic page rendering successful');
      
      // Test 2: Dynamic import test
      addResult('Testing dynamic imports...');
      const { ResponsiveContainer } = await import('recharts');
      if (ResponsiveContainer) {
        addResult('✅ Recharts dynamic import successful');
      } else {
        addResult('❌ Recharts dynamic import failed');
      }
      
      // Test 3: CSV loader test
      addResult('Testing CSV loader...');
      const { CSVLoader } = await import('@/lib/csv-loader');
      if (CSVLoader) {
        addResult('✅ CSV loader import successful');
      } else {
        addResult('❌ CSV loader import failed');
      }
      
      // Test 4: Data processing test
      addResult('Testing data processing...');
      const { processWaterData } = await import('@/lib/water-data-utils');
      const testData = [
        {
          'Meter Label': 'Test',
          'Acct #': '123',
          Zone: 'Test',
          Type: 'Test',
          'Parent Meter': 'Test',
          Label: 'L1',
          'Jan-24': 100,
          'Feb-24': 200
        }
      ];
      const result = processWaterData(testData);
      if (result.monthlyData.length > 0) {
        addResult('✅ Data processing successful');
      } else {
        addResult('❌ Data processing failed');
      }
      
      // Test 5: Component rendering test
      addResult('Testing component imports...');
      const { ChartWrapper } = await import('@/components/water-system/chart-wrapper');
      if (ChartWrapper) {
        addResult('✅ Component imports successful');
      } else {
        addResult('❌ Component imports failed');
      }
      
      addResult('✅ All tests completed!');
      
    } catch (error) {
      addResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Water System Test Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>System Diagnostics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This page tests various components of the Water System to help diagnose issues.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Node Environment:</strong> {process.env.NODE_ENV}
              </div>
              <div>
                <strong>Browser:</strong> {typeof window !== 'undefined' ? 'Client' : 'Server'}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={runTests} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Running Tests...' : 'Run Diagnostic Tests'}
          </Button>
          
          {testResults.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Test Results:</h3>
              <div className="space-y-1 font-mono text-sm">
                {testResults.map((result, index) => (
                  <div key={index} className="break-all">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Clear your browser cache and cookies</li>
              <li>Run <code className="bg-gray-200 px-1 rounded">rm -rf .next node_modules</code></li>
              <li>Run <code className="bg-gray-200 px-1 rounded">npm install</code></li>
              <li>Run <code className="bg-gray-200 px-1 rounded">npm run dev</code></li>
              <li>If error persists, check browser console for details</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}