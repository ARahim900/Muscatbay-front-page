'use client'

import { useEffect, useState } from 'react'

interface ChartWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ChartWrapper({ children, fallback }: ChartWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback || (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full" />
      </div>
    );
  }

  return <>{children}</>;
}