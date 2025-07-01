import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FilterIcon } from '@/components/ui/icons';
import { FILTER_OPTIONS } from '@/lib/constants';

interface JobFiltersProps {
  filterScore: number;
  sortBy: 'score' | 'title';
  showOnlyMatched: boolean;
  filteredCount: number;
  totalCount: number;
  onFilterScoreChange: (score: number) => void;
  onSortByChange: (sortBy: 'score' | 'title') => void;
  onShowOnlyMatchedChange: (show: boolean) => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filterScore,
  sortBy,
  showOnlyMatched,
  filteredCount,
  totalCount,
  onFilterScoreChange,
  onSortByChange,
  onShowOnlyMatchedChange,
}) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
            <FilterIcon />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Filter and Sort</h3>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Min. Match:</Label>
            <select 
              value={filterScore} 
              onChange={(e) => onFilterScoreChange(Number(e.target.value))}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500/20"
            >
              {FILTER_OPTIONS.MIN_SCORES.map(score => (
                <option key={score} value={score}>
                  {score === 0 ? 'All' : `${score}%+`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Sort by:</Label>
            <select 
              value={sortBy} 
              onChange={(e) => onSortByChange(e.target.value as 'score' | 'title')}
              className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500/20"
            >
              <option value="score">Match Score</option>
              <option value="title">Job Title</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="showMatched" 
              checked={showOnlyMatched}
              onChange={(e) => onShowOnlyMatchedChange(e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <Label htmlFor="showMatched" className="text-sm font-medium cursor-pointer">
              Only Matched
            </Label>
          </div>
          <div className="ml-auto text-sm text-gray-600">
            {filteredCount} / {totalCount} Jobs
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
