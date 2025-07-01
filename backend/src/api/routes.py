"""
Flask API routes for the job scraper application.
Following the Single Responsibility Principle and proper error handling.
"""

import logging
from flask import Blueprint, request, jsonify

from models.job_models import AnalysisRequest
from core.interfaces import IJobAnalyzer


class JobAPI:
    """Job analysis API endpoints"""
    
    def __init__(self, analyzer: IJobAnalyzer):
        self.analyzer = analyzer
        self.logger = logging.getLogger(__name__)
        self.blueprint = self._create_blueprint()
    
    def _create_blueprint(self) -> Blueprint:
        """Create Flask blueprint with routes"""
        bp = Blueprint('job_api', __name__)
        
        bp.route('/analyze', methods=['POST'])(self.analyze_jobs)
        bp.route('/health', methods=['GET'])(self.health_check)
        
        return bp
    
    def analyze_jobs(self):
        """Main endpoint for job analysis"""
        try:
            # Parse and validate request
            data = request.get_json()
            if not data:
                return jsonify({"error": "No JSON data provided"}), 400
            
            # Create request object
            analysis_request = AnalysisRequest(
                links=data.get('links', []),
                keywords=data.get('keywords', []),
                resume=data.get('resume', '')
            )
            
            # Validate request
            validation_error = analysis_request.validate()
            if validation_error:
                return jsonify({"error": validation_error}), 400
            
            # Perform analysis
            response = self.analyzer.analyze_jobs(analysis_request)
            
            # Return results
            return jsonify(response.to_dict())
            
        except ValueError as e:
            self.logger.warning(f"Validation error: {str(e)}")
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            self.logger.error(f"Unexpected error in analyze_jobs: {str(e)}")
            return jsonify({"error": f"Internal server error: {str(e)}"}), 500
    
    def health_check(self):
        """Health check endpoint"""
        return jsonify({
            "status": "healthy", 
            "service": "job-scraper-api",
            "version": "2.0.0"
        })
    
    def get_blueprint(self) -> Blueprint:
        """Get the Flask blueprint"""
        return self.blueprint
