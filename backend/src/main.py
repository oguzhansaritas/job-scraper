"""
Main application entry point for the job scraper API.
Implements dependency injection and follows SOLID principles.
"""

import logging
import sys
import os

# Add the backend/src directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from flask import Flask
from flask_cors import CORS

from config.settings import get_config
from services.scraper_service import JobScraperService
from services.match_service import MatchCalculatorService
from services.analyzer_service import JobAnalyzerService
from api.routes import JobAPI


class ApplicationFactory:
    """Factory class for creating the Flask application with dependency injection"""
    
    @staticmethod
    def create_app() -> Flask:
        """Create and configure the Flask application"""
        # Get configuration
        config = get_config()
        
        # Setup logging
        ApplicationFactory._setup_logging(config)
        
        # Create Flask app
        app = Flask(__name__)
        CORS(app)
        
        # Create services (Dependency Injection)
        scraper_service = JobScraperService(config)
        match_service = MatchCalculatorService(config)
        analyzer_service = JobAnalyzerService(scraper_service, match_service, config)
        
        # Create API with injected dependencies
        job_api = JobAPI(analyzer_service)
        
        # Register blueprints
        app.register_blueprint(job_api.get_blueprint())
        
        # Add error handlers
        ApplicationFactory._setup_error_handlers(app)
        
        return app
    
    @staticmethod
    def _setup_logging(config):
        """Setup application logging"""
        logging.basicConfig(
            level=logging.INFO if not config.DEBUG else logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('job_scraper.log') if not config.DEBUG else logging.NullHandler()
            ]
        )
        
        logger = logging.getLogger(__name__)
        logger.info("🚀 Job Scraper API - Logging initialized")
    
    @staticmethod
    def _setup_error_handlers(app: Flask):
        """Setup global error handlers"""
        
        @app.errorhandler(404)
        def not_found(error):
            return {"error": "Endpoint not found"}, 404
        
        @app.errorhandler(405)
        def method_not_allowed(error):
            return {"error": "Method not allowed"}, 405
        
        @app.errorhandler(500)
        def internal_error(error):
            return {"error": "Internal server error"}, 500


def main():
    """Main function to run the application"""
    app = ApplicationFactory.create_app()
    config = get_config()
    
    logger = logging.getLogger(__name__)
    logger.info("🚀 Starting optimized Job Scraper API...")
    logger.info(f"📡 API Endpoint: http://{config.HOST}:{config.PORT}/analyze")
    logger.info(f"🔧 Set NEXT_PUBLIC_API_ENDPOINT=http://{config.HOST}:{config.PORT}/analyze in frontend")
    logger.info(f"🌍 Environment: {os.getenv('ENVIRONMENT', 'development')}")
    
    app.run(
        host=config.HOST,
        port=config.PORT,
        debug=config.DEBUG
    )


if __name__ == '__main__':
    main()
