"""
Configuration settings for the job scraper application.
Centralizes all configuration values following the DRY principle.
"""

import os
from typing import Dict, List


class Config:
    """Base configuration class"""
    
    # Server Configuration
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5001))
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # Request Configuration
    REQUEST_TIMEOUT = int(os.getenv('REQUEST_TIMEOUT', 10))
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 1024 * 1024))  # 1MB
    MAX_LINKS_PER_REQUEST = int(os.getenv('MAX_LINKS_PER_REQUEST', 10))
    MAX_TEXT_LENGTH = int(os.getenv('MAX_TEXT_LENGTH', 5000))
    
    # User Agent for web scraping
    USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    
    # Scoring weights
    RESUME_WEIGHT = 0.6
    KEYWORD_WEIGHT = 0.4
    TECH_BONUS_MAX = 20
    TECH_BONUS_PER_MATCH = 5
    
    # Technical skills for bonus scoring
    TECH_SKILLS = {
        'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'kotlin',
        'react', 'vue', 'angular', 'node.js', 'nodejs', 'express', 'django', 'flask', 'spring',
        'html', 'css', 'sass', 'bootstrap', 'tailwind', 'jquery',
        'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab',
        'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'machine learning', 'ai',
        'scrum', 'agile', 'devops', 'ci/cd', 'microservices', 'rest api', 'graphql',
        'typescript', 'webpack', 'babel', 'npm', 'yarn', 'redux', 'mobx'
    }
    
    # Stop words for text processing
    STOP_WORDS = {
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
        'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall'
    }
    
    # Job title selectors for scraping
    TITLE_SELECTORS = [
        'h1',
        '.job-title',
        '[data-test="job-title"]',
        '.posting-headline',
        'title'
    ]
    
    # Elements to remove from scraped content
    REMOVE_ELEMENTS = ["script", "style", "nav", "header", "footer", "aside", "advertisement"]


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    REQUEST_TIMEOUT = 15
    MAX_LINKS_PER_REQUEST = 20


class LambdaConfig(Config):
    """AWS Lambda configuration"""
    DEBUG = False
    REQUEST_TIMEOUT = 8  # Lambda has timeout constraints
    MAX_LINKS_PER_REQUEST = 5  # Conservative for Lambda


def get_config() -> Config:
    """Get configuration based on environment"""
    env = os.getenv('ENVIRONMENT', 'development').lower()
    
    config_map = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
        'lambda': LambdaConfig
    }
    
    return config_map.get(env, DevelopmentConfig)()
