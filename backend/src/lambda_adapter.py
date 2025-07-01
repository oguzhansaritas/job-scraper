"""
AWS Lambda adapter for the job scraper application.
Adapts the SOLID-based architecture to Lambda's execution model.
"""

import json
import logging
import sys
import os

# Add the backend/src directory to Python path for Lambda
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'src'))

from config.settings import LambdaConfig
from services.scraper_service import JobScraperService
from services.match_service import MatchCalculatorService
from services.analyzer_service import JobAnalyzerService
from models.job_models import AnalysisRequest


class LambdaHandler:
    """Lambda handler implementing the same business logic as the Flask API"""
    
    def __init__(self):
        # Setup logging for Lambda
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Create services with Lambda configuration
        config = LambdaConfig()
        self.scraper_service = JobScraperService(config)
        self.match_service = MatchCalculatorService(config)
        self.analyzer_service = JobAnalyzerService(
            self.scraper_service, 
            self.match_service, 
            config
        )
    
    def handle_request(self, event, context):
        """Handle Lambda request"""
        try:
            # Parse the event body
            if 'body' not in event:
                return self._create_error_response(400, "No request body provided")
            
            try:
                payload = json.loads(event["body"])
            except json.JSONDecodeError:
                return self._create_error_response(400, "Invalid JSON in request body")
            
            # Create analysis request
            analysis_request = AnalysisRequest(
                links=payload.get("links", []),
                keywords=payload.get("keywords", []),
                resume=payload.get("resume", "")
            )
            
            # Validate request
            validation_error = analysis_request.validate()
            if validation_error:
                return self._create_error_response(400, validation_error)
            
            # Perform analysis
            response = self.analyzer_service.analyze_jobs(analysis_request)
            
            # Return success response
            return self._create_success_response(response.to_dict())
            
        except Exception as e:
            self.logger.error(f"Lambda handler error: {str(e)}")
            return self._create_error_response(500, f"Internal server error: {str(e)}")
    
    def _create_success_response(self, data):
        """Create successful Lambda response"""
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": json.dumps(data)
        }
    
    def _create_error_response(self, status_code, message):
        """Create error Lambda response"""
        return {
            "statusCode": status_code,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": message})
        }


# Global handler instance (Lambda optimization)
_handler_instance = None


def lambda_handler(event, context):
    """Lambda entry point"""
    global _handler_instance
    
    # Create handler instance if not exists (cold start optimization)
    if _handler_instance is None:
        _handler_instance = LambdaHandler()
    
    return _handler_instance.handle_request(event, context)
