"""
Job analysis service orchestrating the complete analysis workflow.
Following the Single Responsibility Principle and Dependency Injection.
"""

import logging
from typing import List

from core.interfaces import IJobAnalyzer, IJobScraper, IMatchCalculator, BaseService
from models.job_models import AnalysisRequest, AnalysisResponse, JobResult
from config.settings import Config
from utils.helpers import LoggerHelper


class JobAnalyzerService(BaseService, IJobAnalyzer):
    """
    Service responsible for orchestrating the complete job analysis workflow.
    Coordinates between scraping and matching services.
    """
    
    def __init__(self, 
                 scraper: IJobScraper, 
                 matcher: IMatchCalculator, 
                 config: Config = None):
        super().__init__()
        self.scraper = scraper
        self.matcher = matcher
        self.config = config or Config()
        self.logger_helper = LoggerHelper()
    
    def _setup_logging(self):
        """Setup logging for the analyzer service"""
        self.logger = logging.getLogger(__name__)
    
    def analyze_jobs(self, request: AnalysisRequest) -> AnalysisResponse:
        """
        Analyze multiple job postings against resume and keywords.
        Returns comprehensive analysis results with scoring and statistics.
        """
        # Validate request
        validation_error = request.validate()
        if validation_error:
            raise ValueError(validation_error)
        
        self.logger.info(
            f"Processing {len(request.links)} job links with {len(request.keywords)} keywords"
        )
        
        # Process each job
        results = []
        for i, link in enumerate(request.links):
            self.logger.info(self.logger_helper.format_job_log(i, len(request.links), link))
            
            # Scrape job data
            job_data = self.scraper.extract_job_data(link)
            
            # Calculate match score if scraping was successful
            match_score = None
            if job_data.status.value == "success" and not job_data.error_message:
                match_score = self.matcher.calculate_match_score(
                    request.resume, 
                    job_data.body, 
                    request.keywords
                )
            
            # Create job result
            job_result = JobResult(job_data=job_data, match_score=match_score)
            results.append(job_result)
        
        # Sort by total score (highest first)
        results.sort(
            key=lambda x: x.match_score.total_score if x.match_score else 0, 
            reverse=True
        )
        
        # Create summary
        summary = AnalysisResponse.create_summary(results)
        
        self.logger.info(self.logger_helper.format_completion_log(len(results)))
        
        return AnalysisResponse(results=results, summary=summary)
