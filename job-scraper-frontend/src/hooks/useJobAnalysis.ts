import { useState } from 'react';
import { type JobResult, ApiRequest } from '@/lib/jobUtils';
import { API_CONFIG, UI_MESSAGES } from '@/lib/constants';

export const useJobAnalysis = () => {
  const [results, setResults] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJobs = async (requestBody: ApiRequest) => {
    setLoading(true);
    setError(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || API_CONFIG.DEFAULT_ENDPOINT;
      
      console.log("🔍 API Endpoint:", apiEndpoint);
      console.log("📤 Request Body:", requestBody);
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        mode: "cors",
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error details:", errorText);
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      const sortedResults = (data.results || []).sort((a: JobResult, b: JobResult) => {
        const scoreA = a.total_score || a.score || a.resume_match_percentage || 0;
        const scoreB = b.total_score || b.score || b.resume_match_percentage || 0;
        return scoreB - scoreA;
      });

      setResults(sortedResults);
    } catch (error) {
      console.error("API error:", error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError(UI_MESSAGES.ERRORS.NETWORK);
      } else if (error instanceof Error && error.message.includes('CORS')) {
        setError(UI_MESSAGES.ERRORS.CORS);
      } else if (error instanceof Error) {
        setError(`❌ API Error: ${error.message}`);
      } else {
        setError(UI_MESSAGES.ERRORS.UNKNOWN);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    analyzeJobs,
    clearResults,
    setError,
  };
};
