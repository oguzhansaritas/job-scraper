import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLinkIcon } from '@/components/ui/icons';
import { 
  JobResult, 
  getJobScore, 
  getJobResumeScore, 
  getJobKeywordScore, 
  getScoreColor, 
  getScoreBadgeColor, 
  getMatchLevel, 
  createJobShareText 
} from '@/lib/jobUtils';

interface JobCardProps {
  job: JobResult;
  index: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const score = getJobScore(job);
  const resumeScore = getJobResumeScore(job);
  const keywordScore = getJobKeywordScore(job);
  const matchedSkillsCount = job.matched_skills?.length || 0;
  const matchedKeywordsCount = job.match_keywords?.length || 0;
  const matchLevel = getMatchLevel(score);

  const handleCopyJob = () => {
    const text = createJobShareText(job);
    navigator.clipboard.writeText(text);
  };

  const ScoreBreakdown = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
            📄
          </div>
          <div>
            <div className="text-lg font-bold text-blue-700">{resumeScore}%</div>
            <div className="text-xs text-blue-600">Resume Match</div>
          </div>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${resumeScore}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">
            🔑
          </div>
          <div>
            <div className="text-lg font-bold text-purple-700">{keywordScore}%</div>
            <div className="text-xs text-purple-600">Keyword Match</div>
          </div>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${keywordScore}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">
            ✨
          </div>
          <div>
            <div className="text-lg font-bold text-green-700">{matchedSkillsCount + matchedKeywordsCount}</div>
            <div className="text-xs text-green-600">Total Matches</div>
          </div>
        </div>
        <div className="text-xs text-green-600">
          {matchedSkillsCount} skills + {matchedKeywordsCount} keywords
        </div>
      </div>
    </div>
  );

  const SkillsSection = ({ skills, title, bgColor, borderColor, textColor, icon }: {
    skills: string[];
    title: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    icon: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 ${bgColor} rounded-lg flex items-center justify-center text-white text-xs`}>
          {icon}
        </div>
        <span className="text-base font-semibold text-gray-800">
          {title} ({skills.length})
        </span>
      </div>
      <div className={`${bgColor.replace(/bg-(\w+)-500/, 'bg-$1-50')} p-4 rounded-xl border ${borderColor}`}>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span key={i} className={`px-3 py-2 ${bgColor} text-white text-sm font-medium rounded-lg shadow-sm hover:${bgColor.replace('500', '600')} transition-colors`}>
              {skill}
            </span>
          ))}
        </div>
        <div className={`mt-3 text-sm ${textColor} font-medium`}>
          🎯 These {title.toLowerCase()} are found in your profile and required in the job posting
        </div>
      </div>
    </div>
  );

  const RecommendationSection = () => {
    if (score >= 80) {
      return (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎉</span>
            <span className="font-semibold text-emerald-800">Excellent Match!</span>
          </div>
          <p className="text-sm text-emerald-700">
            This position looks very suitable for you. We recommend applying immediately!
          </p>
        </div>
      );
    }
    
    if (score >= 60) {
      return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💪</span>
            <span className="font-semibold text-blue-800">Good Match</span>
          </div>
          <p className="text-sm text-blue-700">
            You seem suitable for this position. You can apply by highlighting your missing skills.
          </p>
        </div>
      );
    }
    
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📈</span>
          <span className="font-semibold text-yellow-800">Growth Opportunity</span>
        </div>
        <p className="text-sm text-yellow-700">
          You may need to develop more skills for this position. Focus on identifying missing areas.
        </p>
      </div>
    );
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className={`bg-gradient-to-r from-${matchLevel.color}-50 to-${matchLevel.color}-100 p-6 border-l-4 border-${matchLevel.color}-500`}>
          <div className="flex items-start gap-4">
            {/* Ranking Badge */}
            <div className={`flex items-center justify-center w-12 h-12 ${getScoreBadgeColor(score)} text-white rounded-xl font-bold text-lg shrink-0 shadow-lg`}>
              #{index + 1}
            </div>
            
            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{matchLevel.icon}</span>
                <span className={`px-3 py-1 bg-${matchLevel.color}-500 text-white text-sm font-semibold rounded-full`}>
                  {matchLevel.level} Match
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-2"
                >
                  {job.title || "Job Posting"}
                  <ExternalLinkIcon />
                </a>
              </h3>
              
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors block truncate"
                title={job.url}
              >
                {job.url}
              </a>
            </div>
            
            {/* Main Score Display */}
            <div className="text-center shrink-0">
              <div className={`text-4xl font-black bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
                {score}%
              </div>
              <div className="text-sm font-medium text-gray-600">Total Match</div>
            </div>
          </div>
        </div>
        
        {/* Detailed Metrics Section */}
        <div className="p-6 space-y-6">
          <ScoreBreakdown />
          
          {/* Skills Section */}
          {(job.matched_skills && job.matched_skills.length > 0) && (
            <SkillsSection 
              skills={job.matched_skills}
              title="Matched Skills"
              bgColor="bg-green-500"
              borderColor="border-green-200"
              textColor="text-green-700"
              icon="💪"
            />
          )}
          
          {/* Keywords Section */}
          {(job.match_keywords && job.match_keywords.length > 0) && (
            <SkillsSection 
              skills={job.match_keywords}
              title="Matched Keywords"
              bgColor="bg-blue-500"
              borderColor="border-blue-200"
              textColor="text-blue-700"
              icon="🔍"
            />
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <Button 
              onClick={() => window.open(job.url, '_blank')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ExternalLinkIcon />
              <span className="ml-2">View Job</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleCopyJob}
              className="border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg"
            >
              📋 Copy
            </Button>
            
            {score >= 70 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg border border-green-300">
                <span className="text-sm">🌟</span>
                <span className="text-sm font-medium">Apply Now</span>
              </div>
            )}
            
            {score < 50 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-800 rounded-lg border border-orange-300">
                <span className="text-sm">📚</span>
                <span className="text-sm font-medium">Improve Skills</span>
              </div>
            )}
          </div>
          
          <RecommendationSection />
        </div>
      </CardContent>
    </Card>
  );
};
