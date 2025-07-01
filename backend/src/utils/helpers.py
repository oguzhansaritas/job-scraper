"""
Utility functions for text processing and validation.
Following the DRY and KISS principles.
"""

import re
import urllib.parse
from typing import List, Set
from config.settings import Config


class TextProcessor:
    """Text processing utilities following the Single Responsibility Principle"""
    
    @staticmethod
    def normalize_text(text: str) -> List[str]:
        """
        Normalize text for better matching.
        Converts to lowercase, removes special characters, and filters words.
        """
        if not text:
            return []
        
        # Convert to lowercase and remove special characters
        text = re.sub(r'[^\w\s]', ' ', text.lower())
        words = text.split()
        
        # Filter out common words and short words
        return [
            word for word in words 
            if len(word) > 2 and word not in Config.STOP_WORDS
        ]
    
    @staticmethod
    def clean_html_text(text: str, max_length: int = None) -> str:
        """
        Clean and normalize HTML text.
        Removes extra whitespace and limits text length.
        """
        if not text:
            return ""
        
        # Clean and normalize text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        clean_text = ' '.join(chunk for chunk in chunks if chunk)
        
        # Apply length limit
        if max_length:
            clean_text = clean_text[:max_length]
        
        return clean_text
    
    @staticmethod
    def extract_tech_skills(text: str) -> Set[str]:
        """Extract technical skills from text"""
        text_lower = text.lower()
        found_skills = set()
        
        for skill in Config.TECH_SKILLS:
            if skill in text_lower:
                found_skills.add(skill)
        
        return found_skills


class URLValidator:
    """URL validation utilities"""
    
    @staticmethod
    def is_valid_url(url: str) -> bool:
        """Validate URL format"""
        if not url or not isinstance(url, str):
            return False
        
        try:
            result = urllib.parse.urlparse(url)
            return all([result.scheme, result.netloc])
        except Exception:
            return False
    
    @staticmethod
    def normalize_url(url: str) -> str:
        """Normalize URL by removing unnecessary parameters"""
        try:
            parsed = urllib.parse.urlparse(url)
            # Remove common tracking parameters
            return urllib.parse.urlunparse((
                parsed.scheme,
                parsed.netloc,
                parsed.path,
                parsed.params,
                '',  # Remove query parameters for now
                ''   # Remove fragment
            ))
        except Exception:
            return url


class ScoreCalculator:
    """Score calculation utilities following business logic separation"""
    
    @staticmethod
    def calculate_resume_score(matches: Set[str], total_resume_words: Set[str]) -> float:
        """Calculate resume match score with improved logic"""
        if not total_resume_words:
            return 0.0
        
        # Basic ratio
        base_score = (len(matches) / len(total_resume_words)) * 100
        
        # Bonus for technical skill matches
        tech_matches = len([
            word for word in matches 
            if any(tech in word for tech in Config.TECH_SKILLS)
        ])
        tech_bonus = min(tech_matches * Config.TECH_BONUS_PER_MATCH, Config.TECH_BONUS_MAX)
        
        return min(base_score + tech_bonus, 100.0)
    
    @staticmethod
    def calculate_keyword_score(matches: Set[str], total_keywords: Set[str]) -> float:
        """Calculate keyword match score"""
        if not total_keywords:
            return 0.0
        
        return (len(matches) / len(total_keywords)) * 100.0
    
    @staticmethod
    def calculate_total_score(resume_score: float, keyword_score: float) -> float:
        """Calculate weighted total score"""
        return (resume_score * Config.RESUME_WEIGHT) + (keyword_score * Config.KEYWORD_WEIGHT)


class LoggerHelper:
    """Logging utilities"""
    
    @staticmethod
    def format_job_log(job_index: int, total_jobs: int, url: str) -> str:
        """Format job processing log message"""
        return f"Processing job {job_index + 1}/{total_jobs}: {url}"
    
    @staticmethod
    def format_completion_log(total_results: int) -> str:
        """Format analysis completion log message"""
        return f"Analysis completed. Processed {total_results} jobs"
