"""
Data models for the job scraper application.
Following the Single Responsibility Principle (SRP).
"""

from dataclasses import dataclass
from typing import Dict, List, Optional
from enum import Enum


class JobStatus(Enum):
    """Job processing status enumeration"""
    SUCCESS = "success"
    ERROR = "error"
    TIMEOUT = "timeout"
    INVALID_URL = "invalid_url"


@dataclass
class JobData:
    """Job data model representing scraped job information"""
    url: str
    title: str
    body: str
    word_count: int
    status: JobStatus = JobStatus.SUCCESS
    error_message: Optional[str] = None
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        result = {
            "url": self.url,
            "title": self.title,
            "body": self.body,
            "word_count": self.word_count,
            "status": self.status.value
        }
        
        if self.error_message:
            result["error"] = self.error_message
            
        return result
    
    @classmethod
    def from_error(cls, url: str, error_message: str, status: JobStatus = JobStatus.ERROR) -> 'JobData':
        """Create JobData instance for error cases"""
        return cls(
            url=url,
            title="Analysis Failed",
            body="",
            word_count=0,
            status=status,
            error_message=error_message
        )


@dataclass
class MatchScore:
    """Match score model representing job matching results"""
    total_score: float
    resume_score: float
    keyword_score: float
    matched_skills: List[str]
    resume_matches: int
    keyword_matches: int
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        return {
            "total_score": round(self.total_score, 2),
            "resume_score": round(self.resume_score, 2),
            "keyword_score": round(self.keyword_score, 2),
            "matched_skills": self.matched_skills,
            "match_keywords": self.matched_skills,  # Backward compatibility
            "resume_matches": self.resume_matches,
            "keyword_matches": self.keyword_matches
        }


@dataclass
class JobResult:
    """Complete job analysis result combining job data and match score"""
    job_data: JobData
    match_score: Optional[MatchScore] = None
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        result = {
            "url": self.job_data.url,
            "title": self.job_data.title,
            "total_score": 0,
            "resume_score": 0,
            "keyword_score": 0,
            "matched_skills": [],
            "match_keywords": [],  # Backward compatibility
            "resume_matches": 0,
            "keyword_matches": 0
        }
        
        if self.job_data.error_message:
            result["error"] = self.job_data.error_message
        
        if self.match_score:
            result.update(self.match_score.to_dict())
            
        return result


@dataclass
class AnalysisRequest:
    """Request model for job analysis"""
    links: List[str]
    keywords: List[str]
    resume: str = ""
    
    def validate(self) -> Optional[str]:
        """Validate the request data"""
        if not self.links:
            return "No job links provided"
        
        if len(self.links) > 10:  # This should come from config
            return "Too many links. Maximum 10 allowed."
        
        return None


@dataclass
class AnalysisResponse:
    """Response model for job analysis"""
    results: List[JobResult]
    summary: Dict
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        return {
            "results": [result.to_dict() for result in self.results],
            "summary": self.summary
        }
    
    @classmethod
    def create_summary(cls, results: List[JobResult]) -> Dict:
        """Create summary statistics for analysis results"""
        total_jobs = len(results)
        successful = len([r for r in results if not r.job_data.error_message])
        failed = total_jobs - successful
        
        return {
            "total_jobs": total_jobs,
            "successful": successful,
            "failed": failed
        }
