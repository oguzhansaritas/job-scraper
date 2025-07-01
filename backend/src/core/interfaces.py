"""
Core interfaces and abstract classes for the job scraper application.
Following the Dependency Inversion Principle (DIP) and Interface Segregation Principle (ISP).
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from models.job_models import JobData, MatchScore, JobResult, AnalysisRequest, AnalysisResponse


class IJobScraper(ABC):
    """Interface for job scraping functionality"""
    
    @abstractmethod
    def extract_job_data(self, url: str) -> JobData:
        """Extract job data from a given URL"""
        pass


class IMatchCalculator(ABC):
    """Interface for job matching functionality"""
    
    @abstractmethod
    def calculate_match_score(self, resume_text: str, job_text: str, keywords: List[str]) -> MatchScore:
        """Calculate match score between resume/keywords and job description"""
        pass


class IJobAnalyzer(ABC):
    """Interface for complete job analysis workflow"""
    
    @abstractmethod
    def analyze_jobs(self, request: AnalysisRequest) -> AnalysisResponse:
        """Analyze multiple job postings against resume and keywords"""
        pass


class BaseService(ABC):
    """Base service class providing common functionality"""
    
    def __init__(self):
        self._setup_logging()
    
    @abstractmethod
    def _setup_logging(self):
        """Setup logging for the service"""
        pass
    
    def validate_input(self, data: any) -> Optional[str]:
        """Validate input data - to be overridden by subclasses"""
        return None


class IHTMLParser(ABC):
    """Interface for HTML parsing functionality"""
    
    @abstractmethod
    def extract_title(self, html_content: str) -> str:
        """Extract title from HTML content"""
        pass
    
    @abstractmethod
    def extract_clean_text(self, html_content: str) -> str:
        """Extract and clean text content from HTML"""
        pass


class ITextAnalyzer(ABC):
    """Interface for text analysis functionality"""
    
    @abstractmethod
    def extract_keywords(self, text: str) -> List[str]:
        """Extract keywords from text"""
        pass
    
    @abstractmethod
    def calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate similarity between two texts"""
        pass
