"""
Job scraping service implementing the IJobScraper interface.
Following the Single Responsibility Principle (SRP).
"""

import requests
import logging
from bs4 import BeautifulSoup
from typing import Dict

from core.interfaces import IJobScraper, BaseService
from models.job_models import JobData, JobStatus
from config.settings import Config
from utils.helpers import TextProcessor, URLValidator


class JobScraperService(BaseService, IJobScraper):
    """Service responsible for scraping job data from URLs"""
    
    def __init__(self, config: Config = None):
        super().__init__()
        self.config = config or Config()
        self.text_processor = TextProcessor()
        self.url_validator = URLValidator()
    
    def _setup_logging(self):
        """Setup logging for the scraper service"""
        self.logger = logging.getLogger(__name__)
    
    def extract_job_data(self, url: str) -> JobData:
        """
        Extract job data from URL with comprehensive error handling.
        Returns JobData object with extracted information or error details.
        """
        # Validate URL first
        if not self.url_validator.is_valid_url(url):
            return JobData.from_error(url, "Invalid URL format", JobStatus.INVALID_URL)
        
        try:
            # Make HTTP request with configured settings
            response = self._make_request(url)
            
            # Check content size
            if len(response.content) > self.config.MAX_CONTENT_LENGTH:
                self.logger.warning(f"Content too large for URL: {url}")
                return JobData.from_error(url, "Content too large")
            
            # Parse HTML content
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Extract title and body
            title = self._extract_title(soup)
            body = self._extract_clean_text(soup)
            word_count = len(body.split()) if body else 0
            
            return JobData(
                url=url,
                title=title,
                body=body,
                word_count=word_count,
                status=JobStatus.SUCCESS
            )
            
        except requests.exceptions.Timeout:
            return JobData.from_error(url, "Request timeout", JobStatus.TIMEOUT)
        except requests.exceptions.RequestException as e:
            return JobData.from_error(url, f"Request failed: {str(e)}")
        except Exception as e:
            self.logger.error(f"Unexpected error scraping {url}: {str(e)}")
            return JobData.from_error(url, f"Parsing failed: {str(e)}")
    
    def _make_request(self, url: str) -> requests.Response:
        """Make HTTP request with proper headers and timeout"""
        headers = {'User-Agent': self.config.USER_AGENT}
        
        response = requests.get(
            url, 
            timeout=self.config.REQUEST_TIMEOUT, 
            headers=headers
        )
        response.raise_for_status()
        
        return response
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Extract job title with multiple fallback strategies"""
        for selector in self.config.TITLE_SELECTORS:
            element = soup.select_one(selector)
            if element and element.get_text(strip=True):
                return element.get_text(strip=True)
        
        return "Job Posting"
    
    def _extract_clean_text(self, soup: BeautifulSoup) -> str:
        """Extract and clean body text from HTML"""
        # Remove unwanted elements
        for element_name in self.config.REMOVE_ELEMENTS:
            for element in soup(element_name):
                element.decompose()
        
        # Get text and clean it
        text = soup.get_text()
        return self.text_processor.clean_html_text(text, self.config.MAX_TEXT_LENGTH)
