"use client";

import dynamic from 'next/dynamic';

// JobBotUI'ı client-side only olarak yükle
const JobBotUI = dynamic(() => import('@/components/JobBotUI'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Resume Matcher yükleniyor...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JobBotUI />
    </main>
  );
}
