import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChartIcon } from '@/components/ui/icons';
import { JobStats } from '@/lib/jobUtils';

interface StatsOverviewProps {
  totalJobs: number;
  stats: JobStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalJobs, stats }) => {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <BarChartIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Analysis Summary</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{totalJobs}</div>
            <div className="text-sm text-gray-600">Total Jobs</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.highScore}</div>
            <div className="text-sm text-gray-600">High Match (80%+)</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.mediumScore}</div>
            <div className="text-sm text-gray-600">Medium Match (60-79%)</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.avgScore}%</div>
            <div className="text-sm text-gray-600">Average Match</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
