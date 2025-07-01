import React from 'react';

// Base icon props interface
interface IconProps {
  className?: string;
  size?: number;
}

// Unified icon component factory
const createIcon = (path: string | React.ReactNode, viewBox = "0 0 24 24") => {
  return ({ className = "w-5 h-5", size }: IconProps) => (
    <svg 
      className={className} 
      width={size} 
      height={size}
      fill="none" 
      stroke="currentColor" 
      viewBox={viewBox}
    >
      {typeof path === 'string' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
      ) : (
        path
      )}
    </svg>
  );
};

// Icon definitions
export const LoadingSpinner = ({ className = "w-5 h-5" }: IconProps) => (
  <div className={`animate-spin rounded-full border-b-2 border-current ${className}`} />
);

export const SearchIcon = createIcon("M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z");

export const DocumentIcon = createIcon("M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z");

export const LinkIcon = createIcon("M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1");

export const KeyIcon = createIcon("M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z");

export const CheckCircleIcon = createIcon("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z");

export const ExternalLinkIcon = createIcon("M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14");

export const TrophyIcon = createIcon("M8 21l4-7 4 7M3 11l1-2 2-1v8a2 2 0 002 2h8a2 2 0 002-2v-8l2 1 1 2");

export const BarChartIcon = createIcon("M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z");

export const FilterIcon = createIcon("M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z");
