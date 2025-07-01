"""
Job matching service implementing the IMatchCalculator interface.
Following the Single Responsibility Principle (SRP).
"""

import logging
from typing import List, Set

from core.interfaces import IMatchCalculator, BaseService
from models.job_models import MatchScore
from config.settings import Config
from utils.helpers import TextProcessor, ScoreCalculator


class MatchCalculatorService(BaseService, IMatchCalculator):
    """Service responsible for calculating job match scores"""
    
    def __init__(self, config: Config = None):
        super().__init__()
        self.config = config or Config()
        self.text_processor = TextProcessor()
        self.score_calculator = ScoreCalculator()
    
    def _setup_logging(self):
        """Setup logging for the match calculator service"""
        self.logger = logging.getLogger(__name__)
    
    def calculate_match_score(self, resume_text: str, job_text: str, keywords: List[str]) -> MatchScore:
        """
        Calculate comprehensive match score between resume/keywords and job description.
        Returns MatchScore object with detailed scoring information.
        """
        # Normalize all text inputs
        resume_words = set(self.text_processor.normalize_text(resume_text))
        job_words = set(self.text_processor.normalize_text(job_text))
        keyword_words = set(kw.lower().strip() for kw in keywords if kw.strip())
        
        # Find matches
        resume_matches = resume_words.intersection(job_words)
        keyword_matches = keyword_words.intersection(job_words)
        
        # Calculate individual scores
        resume_score = self.score_calculator.calculate_resume_score(resume_matches, resume_words)
        keyword_score = self.score_calculator.calculate_keyword_score(keyword_matches, keyword_words)
        
        # Calculate weighted total score
        total_score = self.score_calculator.calculate_total_score(resume_score, keyword_score)
        
        return MatchScore(
            total_score=total_score,
            resume_score=resume_score,
            keyword_score=keyword_score,
            matched_skills=list(keyword_matches),
            resume_matches=len(resume_matches),
            keyword_matches=len(keyword_matches)
        )
