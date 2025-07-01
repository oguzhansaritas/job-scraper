"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type ResumeData } from "@/lib/pdfUtils";
import { 
  LoadingSpinner, 
  SearchIcon, 
  DocumentIcon, 
  LinkIcon, 
  KeyIcon, 
  CheckCircleIcon,
  TrophyIcon 
} from "@/components/ui/icons";
import { useJobAnalysis } from "@/hooks/useJobAnalysis";
import { useResumeProcessing } from "@/hooks/useResumeProcessing";
import { StatsOverview } from "@/components/StatsOverview";
import { JobFilters } from "@/components/JobFilters";
import { JobCard } from "@/components/JobCard";
import { 
  validateJobAnalysisInput, 
  calculateJobStats, 
  filterAndSortJobs 
} from "@/lib/jobUtils";
import { PLACEHOLDERS, UI_MESSAGES } from "@/lib/constants";

export default function JobBotUI() {
  const [links, setLinks] = useState("");
  const [keywords, setKeywords] = useState("");
  const [filterScore, setFilterScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'score' | 'title'>('score');
  const [showOnlyMatched, setShowOnlyMatched] = useState(false);

  const { results, loading, error, analyzeJobs, setError } = useJobAnalysis();
  const { 
    resume, 
    resumeData, 
    processingPDF, 
    error: resumeError,
    setResume,
    setError: setResumeError,
    handlePDFUpload,
    analyzeResume,
    generateKeywords,
    clearResumeData,
  } = useResumeProcessing();

  const handlePDFChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handlePDFUpload(file);
    }
  };

  const handleResumeAnalysis = async () => {
    const autoKeywords = await analyzeResume();
    if (autoKeywords) {
      setKeywords(autoKeywords.join(', '));
    }
  };

  const handleGenerateKeywords = () => {
    const generatedKeywords = generateKeywords();
    if (generatedKeywords.length > 0) {
      setKeywords(generatedKeywords.join(', '));
    }
  };

  const handleAnalyze = async () => {
    const validationError = validateJobAnalysisInput(links, keywords, resume, !!resumeData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const linkArray = links.split("\n").map(link => link.trim()).filter(link => link);
    const keywordArray = keywords.split(",").map(kw => kw.trim()).filter(kw => kw);

    const requestBody = { 
      links: linkArray, 
      keywords: keywordArray,
      resume: resumeData?.rawText || resume.trim() || null
    };

    await analyzeJobs(requestBody);
  };

  // Calculate filtered and sorted results
  const filteredResults = filterAndSortJobs(results, filterScore, showOnlyMatched, sortBy);
  const stats = calculateJobStats(results);

  // Combined error handling
  const currentError = error || resumeError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 text-white">
            <SearchIcon />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Job Posting Compatibility Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your resume/CV to calculate compatibility percentages with job postings and take the right steps in your career
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            
            {/* Job Links Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <LinkIcon />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-gray-900">Job Posting Links</Label>
                  <p className="text-sm text-gray-500">Enter the links of job postings you want to analyze</p>
                </div>
              </div>
              <Textarea 
                rows={4} 
                placeholder={PLACEHOLDERS.JOB_LINKS}
                value={links} 
                onChange={(e) => setLinks(e.target.value)} 
                className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            {/* PDF Resume Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                  <DocumentIcon />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-gray-900">PDF Resume/CV Upload</Label>
                  <p className="text-sm text-gray-500">Upload your resume in PDF format (automatic analysis will be performed)</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Input 
                  type="file" 
                  accept=".pdf"
                  onChange={handlePDFChange}
                  disabled={processingPDF}
                  className="flex-1 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                />
                <Button 
                  onClick={handleResumeAnalysis}
                  disabled={processingPDF || !resume.trim()}
                  variant="outline"
                  className="shrink-0 border-green-200 hover:bg-green-50 hover:border-green-300"
                >
                  {processingPDF ? <LoadingSpinner /> : <SearchIcon />}
                  <span className="ml-2">Analyze</span>
                </Button>
              </div>
              {processingPDF && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <LoadingSpinner />
                  <span className="text-sm">Analyzing PDF...</span>
                </div>
              )}
            </div>

            {/* Resume Data Display */}
            {resumeData && (
              <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">
                    <CheckCircleIcon />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">{UI_MESSAGES.SUCCESS.RESUME_ANALYZED}</h3>
                  <Button 
                    variant="outline" 
                    onClick={clearResumeData}
                    className="ml-auto border-green-300 hover:bg-green-100"
                    size="sm"
                  >
                    🗑️ Clear
                  </Button>
                </div>
                
                {resumeData.skills.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-green-700">Detected Skills:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {resumeData.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200 hover:bg-blue-200 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {resumeData.experience.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-green-700">Experience Information:</Label>
                    <div className="mt-2 space-y-1">
                      {resumeData.experience.slice(0, 3).map((exp, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-green-500 text-sm mt-1">•</span>
                          <span className="text-sm text-gray-700">{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {resumeData.education.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-green-700">Education Information:</Label>
                    <div className="mt-2 space-y-1">
                      {resumeData.education.slice(0, 2).map((edu, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-green-500 text-sm mt-1">•</span>
                          <span className="text-sm text-gray-700">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Manual Resume Input Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                  <DocumentIcon />
                </div>
                <div className="flex-1">
                  <Label className="text-lg font-semibold text-gray-900">Resume/CV Text</Label>
                  <p className="text-sm text-gray-500">Copy and paste your resume information here or write manually</p>
                </div>
                {resume.trim() && !resumeData && (
                  <Button 
                    onClick={handleGenerateKeywords}
                    variant="outline"
                    size="sm"
                    className="border-purple-300 hover:bg-purple-50 hover:border-purple-400 text-purple-700"
                  >
                    <KeyIcon />
                    <span className="ml-2">Generate Keywords</span>
                  </Button>
                )}
              </div>
              <Textarea 
                rows={8} 
                placeholder={PLACEHOLDERS.RESUME_TEXT}
                value={resume} 
                onChange={(e) => setResume(e.target.value)} 
                className="min-h-[200px] resize-none border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
              />
              {resume.trim().length > 50 && !resumeData && (
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-purple-600">💡</div>
                  <span className="text-sm text-purple-700">
                    {UI_MESSAGES.TIPS.PDF_ANALYSIS}
                  </span>
                </div>
              )}
            </div>
            
            {/* Keywords Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg">
                  <KeyIcon />
                </div>
                <div className="flex-1">
                  <Label className="text-lg font-semibold text-gray-900">Keywords</Label>
                  <p className="text-sm text-gray-500">
                    {resumeData ? 'Auto-generated from PDF. You can optionally add more.' : 'Technologies and skills you want to search for (separate with commas)'}
                  </p>
                </div>
                {!resumeData && resume.trim() && (
                  <Button 
                    onClick={handleGenerateKeywords}
                    variant="outline"
                    size="sm"
                    className="border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-yellow-700"
                  >
                    <KeyIcon />
                    <span className="ml-2">Generate</span>
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder={PLACEHOLDERS.KEYWORDS}
                  value={keywords} 
                  onChange={(e) => setKeywords(e.target.value)} 
                  className="flex-1 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20"
                />
              </div>
              {!resumeData && !resume.trim() && (
                <p className="text-xs text-gray-400 italic">
                  💡 {UI_MESSAGES.TIPS.RESUME_KEYWORDS}
                </p>
              )}
            </div>
            
            {/* Analyze Button */}
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || processingPDF}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <LoadingSpinner />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <SearchIcon />
                  <span>Start Compatibility Analysis</span>
                </div>
              )}
            </Button>
            
            {/* Error Display */}
            {currentError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">❌ {currentError}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <StatsOverview totalJobs={results.length} stats={stats} />

            {/* Filters and Controls */}
            <JobFilters 
              filterScore={filterScore}
              sortBy={sortBy}
              showOnlyMatched={showOnlyMatched}
              filteredCount={filteredResults.length}
              totalCount={results.length}
              onFilterScoreChange={setFilterScore}
              onSortByChange={setSortBy}
              onShowOnlyMatchedChange={setShowOnlyMatched}
            />

            {/* Results Grid */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
                    <TrophyIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
                  {filteredResults.length !== results.length && (
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Filtered
                    </div>
                  )}
                </div>
                
                <div className="grid gap-6">
                  {filteredResults.map((job, index) => (
                    <JobCard key={index} job={job} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
